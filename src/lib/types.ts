export interface Candle {
  time: number
  open: number
  high: number
  close: number
  low: number
  volume: number
}

export interface LWCandle {
  time: number
  open: number
  high: number
  close: number
  low: number
}

export interface FVG {
  id: string
  type: 'bullish' | 'bearish'
  top: number
  bottom: number
  startTime: number
  endTime: number
  filled: boolean
}

export interface SwingPoint {
  time: number
  price: number
  type: 'high' | 'low'
  index: number
}

export interface LiquidityZone {
  id: string
  price: number
  type: 'buy-side' | 'sell-side'
  strength: number
  time: number
}

export interface LiquiditySweep {
  id: string
  time: number
  price: number
  type: 'bullish' | 'bearish'
  reversalConfirmed: boolean
  sweepCandleIndex: number
}

export interface SRLevel {
  id: string
  price: number
  type: 'support' | 'resistance'
  strength: number
  lastTouched: number
}

export interface TradeSignal {
  id: string
  direction: 'LONG' | 'SHORT'
  entryPrice: number
  stopLoss: number
  takeProfits: [number, number, number]
  riskRewardRatios: [number, number, number]
  confidence: number
  confluenceFactors: string[]
  time: number
  isFakeout: boolean
  status: 'active' | 'expired' | 'hit-tp' | 'hit-sl'
}

export interface Fakeout {
  id: string
  time: number
  price: number
  direction: 'up' | 'down'
  wickRatio: number
}

export interface PriceExtreme {
  type: 'ath' | 'atl'
  price: number
  time: number
}

export type NewsCategory = 'gold' | 'fed' | 'geopolitics' | 'war' | 'usd' | 'oil'

export interface NewsItem {
  id: string
  title: string
  source: string
  publishedAt: string
  url: string
  category: NewsCategory
  sentiment: 'bullish' | 'bearish' | 'neutral'
}

export type Timeframe = '1H' | '4H' | '1D' | '1W'

export const TIMEFRAME_PARAMS: Record<Timeframe, { interval: string; range: string }> = {
  '1H': { interval: '60m', range: '5d'  },
  '4H': { interval: '60m', range: '20d' },
  '1D': { interval: '1d',  range: '1y'  },
  '1W': { interval: '1wk', range: '5y'  },
}

export interface GoldMeta {
  symbol: string
  regularMarketPrice: number
  chartPreviousClose: number
  currency: string
}

export interface GoldApiResponse {
  candles: Candle[]
  meta: GoldMeta
}

export interface AnalysisResult {
  fvgs: FVG[]
  swings: SwingPoint[]
  liquidityZones: LiquidityZone[]
  sweeps: LiquiditySweep[]
  srLevels: SRLevel[]
  extremes: PriceExtreme[]
  fakeouts: Fakeout[]
  signals: TradeSignal[]
  bePatient: boolean
}
