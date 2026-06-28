import type { Candle } from './types'

export function generateMockCandles(count = 200, intervalSeconds = 3600): Candle[] {
  const candles: Candle[] = []
  let price = 2320
  const now = Math.floor(Date.now() / 1000)
  const startTime = now - count * intervalSeconds

  let seed = 42
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) & 0xffffffff
    return (seed >>> 0) / 0xffffffff
  }

  for (let i = 0; i < count; i++) {
    const volatility = 18 * (intervalSeconds / 3600)
    const change = (rand() - 0.47) * volatility
    const open = price
    const close = price + change
    const wickUp = rand() * volatility * 0.6
    const wickDn = rand() * volatility * 0.6
    const high = Math.max(open, close) + wickUp
    const low  = Math.min(open, close) - wickDn

    candles.push({
      time:   startTime + i * intervalSeconds,
      open:   Math.round(open  * 100) / 100,
      high:   Math.round(high  * 100) / 100,
      low:    Math.round(low   * 100) / 100,
      close:  Math.round(close * 100) / 100,
      volume: Math.floor(rand() * 50000 + 10000),
    })
    price = close
  }
  return candles
}

export function getMockGoldMeta() {
  return {
    symbol: 'GC=F',
    regularMarketPrice: 2387.40,
    chartPreviousClose: 2371.20,
    currency: 'USD',
  }
}
