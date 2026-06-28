import type {
  Candle, FVG, SwingPoint, LiquidityZone,
  LiquiditySweep, SRLevel, PriceExtreme, Fakeout, Timeframe,
} from './types'

// ── 4H Resampler ────────────────────────────────────────────────────────────

export function resample4H(candles: Candle[]): Candle[] {
  const result: Candle[] = []
  for (let i = 0; i + 3 < candles.length; i += 4) {
    const g = candles.slice(i, i + 4)
    result.push({
      time:   g[0].time,
      open:   g[0].open,
      high:   Math.max(...g.map(c => c.high)),
      low:    Math.min(...g.map(c => c.low)),
      close:  g[g.length - 1].close,
      volume: g.reduce((s, c) => s + c.volume, 0),
    })
  }
  return result
}

// ── Fair Value Gaps ──────────────────────────────────────────────────────────

export function detectFVG(candles: Candle[]): FVG[] {
  const fvgs: FVG[] = []

  for (let i = 2; i < candles.length; i++) {
    const a = candles[i - 2]
    const c = candles[i]

    if (a.high < c.low) {
      fvgs.push({
        id:        `fvg-bull-${i}`,
        type:      'bullish',
        top:       c.low,
        bottom:    a.high,
        startTime: a.time,
        endTime:   c.time,
        filled:    false,
      })
    } else if (a.low > c.high) {
      fvgs.push({
        id:        `fvg-bear-${i}`,
        type:      'bearish',
        top:       a.low,
        bottom:    c.high,
        startTime: a.time,
        endTime:   c.time,
        filled:    false,
      })
    }
  }

  for (const fvg of fvgs) {
    for (const candle of candles) {
      if (candle.time <= fvg.endTime) continue
      if (fvg.type === 'bullish' && candle.low <= fvg.bottom) { fvg.filled = true; break }
      if (fvg.type === 'bearish' && candle.high >= fvg.top)   { fvg.filled = true; break }
    }
  }

  return fvgs.filter(f => !f.filled).slice(-30)
}

// ── Swing Points ─────────────────────────────────────────────────────────────

export function getSwingLookback(tf: Timeframe): number {
  return tf === '1H' ? 3 : tf === '4H' ? 5 : tf === '1D' ? 6 : 8
}

export function detectSwingPoints(candles: Candle[], lookback = 5): SwingPoint[] {
  const swings: SwingPoint[] = []

  for (let i = lookback; i < candles.length - lookback; i++) {
    let isHigh = true
    let isLow  = true

    for (let j = i - lookback; j <= i + lookback; j++) {
      if (j === i) continue
      if (candles[j].high >= candles[i].high) isHigh = false
      if (candles[j].low  <= candles[i].low)  isLow  = false
    }

    if (isHigh) swings.push({ type: 'high', price: candles[i].high, time: candles[i].time, index: i })
    if (isLow)  swings.push({ type: 'low',  price: candles[i].low,  time: candles[i].time, index: i })
  }

  return swings
}

// ── Liquidity Zones ──────────────────────────────────────────────────────────

export function detectLiquidityZones(swings: SwingPoint[], threshold = 0.003): LiquidityZone[] {
  const clusters: Array<{ price: number; type: 'buy-side' | 'sell-side'; strength: number; time: number }> = []

  for (const swing of swings) {
    const zoneType = swing.type === 'high' ? 'buy-side' : 'sell-side'
    const existing = clusters.find(
      c => c.type === zoneType && Math.abs(c.price - swing.price) / c.price < threshold
    )
    if (existing) {
      existing.price    = (existing.price * existing.strength + swing.price) / (existing.strength + 1)
      existing.strength++
    } else {
      clusters.push({ price: swing.price, type: zoneType, strength: 1, time: swing.time })
    }
  }

  return clusters
    .filter(c => c.strength >= 2)
    .map((c, i) => ({ ...c, id: `liq-${i}` }))
}

// ── Liquidity Sweeps ─────────────────────────────────────────────────────────

export function detectLiquiditySweeps(candles: Candle[], swings: SwingPoint[]): LiquiditySweep[] {
  const sweeps: LiquiditySweep[] = []
  const recentSwings = swings.slice(-40)
  const swept = new Set<number>()

  for (let i = 1; i < candles.length; i++) {
    const candle    = candles[i]
    const prevClose = candles[i - 1].close

    for (const swing of recentSwings) {
      if (swept.has(swing.index)) continue

      if (swing.type === 'high' && candle.high > swing.price && candle.close < swing.price) {
        swept.add(swing.index)
        sweeps.push({
          id:                `sweep-bear-${i}`,
          time:              candle.time,
          price:             candle.high,
          type:              'bearish',
          reversalConfirmed: candle.close < prevClose,
          sweepCandleIndex:  i,
        })
      }

      if (swing.type === 'low' && candle.low < swing.price && candle.close > swing.price) {
        swept.add(swing.index)
        sweeps.push({
          id:                `sweep-bull-${i}`,
          time:              candle.time,
          price:             candle.low,
          type:              'bullish',
          reversalConfirmed: candle.close > prevClose,
          sweepCandleIndex:  i,
        })
      }
    }
  }

  return sweeps.slice(-20)
}

// ── Support & Resistance ─────────────────────────────────────────────────────

export function detectSupportResistance(candles: Candle[], swings: SwingPoint[]): SRLevel[] {
  const currentPrice = candles[candles.length - 1].close
  const levels: Array<{ price: number; strength: number; lastTouched: number }> = []

  for (const swing of swings) {
    const existing = levels.find(l => Math.abs(l.price - swing.price) / l.price < 0.005)
    if (existing) {
      existing.strength++
      existing.price       = (existing.price * (existing.strength - 1) + swing.price) / existing.strength
      existing.lastTouched = Math.max(existing.lastTouched, swing.time)
    } else {
      levels.push({ price: swing.price, strength: 1, lastTouched: swing.time })
    }
  }

  return levels
    .filter(l => l.strength >= 2)
    .sort((a, b) => Math.abs(a.price - currentPrice) - Math.abs(b.price - currentPrice))
    .slice(0, 12)
    .map((l, i) => ({
      id:          `sr-${i}`,
      price:       Math.round(l.price * 100) / 100,
      type:        (l.price > currentPrice ? 'resistance' : 'support') as 'support' | 'resistance',
      strength:    l.strength,
      lastTouched: l.lastTouched,
    }))
}

// ── ATH / ATL ────────────────────────────────────────────────────────────────

export function detectExtremes(candles: Candle[]): PriceExtreme[] {
  let ath = { price: 0, time: 0 }
  let atl = { price: Infinity, time: 0 }

  for (const c of candles) {
    if (c.high > ath.price) ath = { price: c.high, time: c.time }
    if (c.low  < atl.price) atl = { price: c.low,  time: c.time }
  }

  return [
    { type: 'ath', price: Math.round(ath.price * 100) / 100, time: ath.time },
    { type: 'atl', price: Math.round(atl.price * 100) / 100, time: atl.time },
  ]
}

// ── Fakeout Detection ────────────────────────────────────────────────────────

export function detectFakeouts(candles: Candle[], swings: SwingPoint[]): Fakeout[] {
  const fakeouts: Fakeout[] = []

  for (let i = 1; i < candles.length; i++) {
    const c     = candles[i]
    const body  = Math.abs(c.close - c.open)
    const range = c.high - c.low

    if (range < 0.01) continue

    const upperWick = c.high - Math.max(c.open, c.close)
    const lowerWick = Math.min(c.open, c.close) - c.low
    const wickRatio = Math.max(upperWick, lowerWick) / range

    if (wickRatio > 0.60 && body < range * 0.30) {
      const touchedLevel = swings.find(
        s =>
          Math.abs(s.price - c.high) / c.high < 0.002 ||
          Math.abs(s.price - c.low)  / c.low  < 0.002
      )

      if (touchedLevel) {
        const direction = upperWick > lowerWick ? 'up' : 'down'
        fakeouts.push({
          id:        `fakeout-${i}`,
          time:      c.time,
          price:     direction === 'up' ? c.high : c.low,
          direction,
          wickRatio: Math.round(wickRatio * 100) / 100,
        })
      }
    }
  }

  return fakeouts.slice(-15)
}
