import { NextRequest, NextResponse } from 'next/server'
import { generateMockCandles, getMockGoldMeta } from '@/lib/mockData'
import type { Candle } from '@/lib/types'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const interval = searchParams.get('interval') ?? '60m'
  const range    = searchParams.get('range')    ?? '5d'

  const url =
    `https://query1.finance.yahoo.com/v8/finance/chart/GC%3DF` +
    `?interval=${interval}&range=${range}&includePrePost=false`

  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept':     'application/json',
        'Referer':    'https://finance.yahoo.com',
      },
      next: { revalidate: 0 },
    })

    if (!res.ok) throw new Error(`Yahoo responded ${res.status}`)

    const raw    = await res.json()
    const result = raw?.chart?.result?.[0]
    if (!result) throw new Error('No chart result in Yahoo response')

    const timestamps: number[]   = result.timestamp ?? []
    const quote                  = result.indicators?.quote?.[0] ?? {}

    const candles: Candle[] = timestamps
      .map((t: number, i: number) => ({
        time:   t,
        open:   quote.open?.[i],
        high:   quote.high?.[i],
        low:    quote.low?.[i],
        close:  quote.close?.[i],
        volume: quote.volume?.[i] ?? 0,
      }))
      .filter((c): c is Candle =>
        c.open != null && c.high != null && c.low != null && c.close != null
      )

    if (candles.length < 10) throw new Error('Too few candles returned')

    return NextResponse.json({
      candles,
      meta: {
        symbol:             result.meta?.symbol ?? 'GC=F',
        regularMarketPrice: result.meta?.regularMarketPrice ?? candles[candles.length - 1].close,
        chartPreviousClose: result.meta?.chartPreviousClose ?? candles[0].open,
        currency:           result.meta?.currency ?? 'USD',
      },
    })
  } catch {
    const intervalSec = interval === '1wk' ? 604800 : interval === '1d' ? 86400 : 3600
    const count       = range === '5y' ? 260 : range === '1y' ? 252 : range === '20d' ? 480 : 120
    return NextResponse.json({
      candles: generateMockCandles(count, intervalSec),
      meta:    getMockGoldMeta(),
      mock:    true,
    })
  }
}
