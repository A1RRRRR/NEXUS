'use client'

import dynamic from 'next/dynamic'
import { useState, useCallback } from 'react'
import type { AnalysisResult, GoldMeta, Timeframe } from '@/lib/types'
import MarketContext from '@/components/MarketContext'
import NewsPanel from '@/components/NewsPanel'
import SignalPanel from '@/components/SignalPanel'

const GoldChart = dynamic(() => import('@/components/GoldChart'), { ssr: false })

const DEFAULT_META: GoldMeta = {
  symbol:             'GC=F',
  regularMarketPrice: 2387.40,
  chartPreviousClose: 2371.20,
  currency:           'USD',
}

export default function HomePage() {
  const [analysis,  setAnalysis]  = useState<AnalysisResult | null>(null)
  const [meta,      setMeta]      = useState<GoldMeta>(DEFAULT_META)
  const [timeframe, setTimeframe] = useState<Timeframe>('1H')

  const handleAnalysis = useCallback((result: AnalysisResult) => setAnalysis(result), [])
  const handleMeta     = useCallback((m: GoldMeta) => setMeta(m), [])

  return (
    <div
      className="flex flex-col scanlines"
      style={{ height: '100dvh', overflow: 'hidden', background: '#0a0a0a' }}
    >
      <MarketContext
        initialPrice={meta.regularMarketPrice}
        previousClose={meta.chartPreviousClose}
      />

      <div className="flex flex-1 min-h-0">
        <div className="flex flex-col flex-1 min-w-0 min-h-0">
          <GoldChart
            onAnalysis={handleAnalysis}
            onMeta={handleMeta}
            timeframe={timeframe}
            onTimeframeChange={setTimeframe}
          />
        </div>

        <div className="w-72 flex-shrink-0 overflow-y-auto">
          <SignalPanel
            signals={analysis?.signals     ?? []}
            fakeouts={analysis?.fakeouts   ?? []}
            sweeps={analysis?.sweeps       ?? []}
            currentPrice={meta.regularMarketPrice}
          />
        </div>
      </div>

      <div className="h-52 flex-shrink-0">
        <NewsPanel />
      </div>
    </div>
  )
}
