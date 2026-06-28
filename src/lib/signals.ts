import type { Candle, FVG, LiquiditySweep, SRLevel, SwingPoint, TradeSignal } from './types'

export function generateSignals(
  candles:  Candle[],
  fvgs:     FVG[],
  sweeps:   LiquiditySweep[],
  srLevels: SRLevel[],
  swings:   SwingPoint[],
): TradeSignal[] {
  if (candles.length < 10) return []

  const currentPrice    = candles[candles.length - 1].close
  const confirmedSweeps = sweeps.filter(s => s.reversalConfirmed).slice(-8)
  const signals: TradeSignal[] = []

  for (const sweep of confirmedSweeps) {
    const direction         = sweep.type === 'bullish' ? 'LONG' : 'SHORT'
    const confluenceFactors: string[] = ['Liquidity Sweep']
    let confidence = 1

    const relevantFVG = fvgs.find(f => {
      if (f.filled) return false
      const mid = (f.top + f.bottom) / 2
      const pct = Math.abs(mid - sweep.price) / sweep.price
      return pct < 0.008 &&
        (direction === 'LONG' ? f.type === 'bullish' : f.type === 'bearish')
    })
    if (relevantFVG) { confluenceFactors.push('Fair Value Gap'); confidence++ }

    const relevantSR = srLevels.find(
      l => Math.abs(l.price - sweep.price) / sweep.price < 0.004 && l.strength >= 3
    )
    if (relevantSR) {
      confluenceFactors.push(`${relevantSR.type === 'support' ? 'Support' : 'Resistance'} (×${relevantSR.strength})`)
      confidence++
    }

    const alignedSweeps = confirmedSweeps.filter(
      s => s.type === sweep.type && s.id !== sweep.id && Math.abs(s.price - sweep.price) / sweep.price < 0.006
    )
    if (alignedSweeps.length > 0) { confluenceFactors.push('Multi-Sweep Zone'); confidence++ }

    if (confidence < 2) continue

    const entryPrice = relevantFVG
      ? (relevantFVG.top + relevantFVG.bottom) / 2
      : currentPrice

    let stopLoss: number
    if (direction === 'LONG') {
      const recentLows = swings.filter(s => s.type === 'low' && s.time <= sweep.time).slice(-4)
      const lowestLow  = recentLows.reduce((min, s) => s.price < min ? s.price : min, entryPrice)
      stopLoss = Math.round(lowestLow * 0.9985 * 100) / 100
    } else {
      const recentHighs = swings.filter(s => s.type === 'high' && s.time <= sweep.time).slice(-4)
      const highestHigh = recentHighs.reduce((max, s) => s.price > max ? s.price : max, entryPrice)
      stopLoss = Math.round(highestHigh * 1.0015 * 100) / 100
    }

    const riskPips = Math.abs(entryPrice - stopLoss)
    if (riskPips < 0.5) continue

    const targetLevels = srLevels
      .filter(l => direction === 'LONG' ? l.price > entryPrice : l.price < entryPrice)
      .sort((a, b) => direction === 'LONG' ? a.price - b.price : b.price - a.price)

    const tpPrices: number[] = []
    for (let i = 1; tpPrices.length < 3; i++) {
      if (targetLevels[tpPrices.length]) {
        tpPrices.push(Math.round(targetLevels[tpPrices.length].price * 100) / 100)
      } else {
        const mult = i + tpPrices.length
        const tp   = direction === 'LONG'
          ? entryPrice + riskPips * (mult)
          : entryPrice - riskPips * (mult)
        tpPrices.push(Math.round(tp * 100) / 100)
        if (tpPrices.length >= 3) break
      }
    }

    while (tpPrices.length < 3) {
      const mult = tpPrices.length + 1
      const tp   = direction === 'LONG'
        ? entryPrice + riskPips * mult
        : entryPrice - riskPips * mult
      tpPrices.push(Math.round(tp * 100) / 100)
    }

    const rrRatios = tpPrices.map(
      tp => Math.round((Math.abs(tp - entryPrice) / riskPips) * 100) / 100
    ) as [number, number, number]

    signals.push({
      id:               `sig-${sweep.id}`,
      direction,
      entryPrice:       Math.round(entryPrice * 100) / 100,
      stopLoss,
      takeProfits:      tpPrices as [number, number, number],
      riskRewardRatios: rrRatios,
      confidence:       Math.min(confidence, 5),
      confluenceFactors,
      time:             sweep.time,
      isFakeout:        false,
      status:           'active',
    })
  }

  const seen = new Map<string, TradeSignal>()
  for (const sig of signals) {
    const existing = seen.get(sig.direction)
    if (!existing || sig.confidence > existing.confidence) seen.set(sig.direction, sig)
  }

  return Array.from(seen.values()).slice(0, 3)
}
