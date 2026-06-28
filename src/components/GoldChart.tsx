'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import {
  createChart,
  CrosshairMode,
  LineStyle,
  type IChartApi,
  type ISeriesApi,
  type SeriesMarker,
  type UTCTimestamp,
} from 'lightweight-charts'
import type { Candle, Timeframe, AnalysisResult, GoldMeta } from '@/lib/types'
import {
  detectFVG,
  detectSwingPoints,
  detectLiquidityZones,
  detectLiquiditySweeps,
  detectSupportResistance,
  detectExtremes,
  detectFakeouts,
  getSwingLookback,
  resample4H,
} from '@/lib/analysis'
import { generateSignals } from '@/lib/signals'
import { TIMEFRAME_PARAMS } from '@/lib/types'
import ChartLegend from './ChartLegend'

interface Props {
  onAnalysis:        (result: AnalysisResult) => void
  onMeta:            (meta: GoldMeta) => void
  timeframe:         Timeframe
  onTimeframeChange: (tf: Timeframe) => void
}

const TF_LABELS: Timeframe[] = ['1H', '4H', '1D', '1W']

const COLORS = {
  athLine:    '#ffffff',
  atlLine:    '#9ca3af',
  support:    '#3b82f6',
  resist:     '#f97316',
  buySide:    '#facc15',
  sellSide:   '#a78bfa',
  fvgBull:    '#22c55e',
  fvgBear:    '#ef4444',
  sweep:      '#c084fc',
  fakeout:    '#fb923c',
  entryLong:  '#22c55e',
  entryShort: '#ef4444',
}

export default function GoldChart({ onAnalysis, onMeta, timeframe, onTimeframeChange }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const chartRef     = useRef<IChartApi | null>(null)
  const seriesRef    = useRef<ISeriesApi<'Candlestick'> | null>(null)
  const linesRef     = useRef<ReturnType<ISeriesApi<'Line'>['createPriceLine']>[]>([])
  const fvgSeriesRef = useRef<ISeriesApi<'Line'>[]>([])

  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
  const [loading, setLoading]   = useState(true)
  const [isMock, setIsMock]     = useState(false)
  const [bePatient, setBePatient] = useState(false)

  useEffect(() => {
    if (!containerRef.current || chartRef.current) return

    const chart = createChart(containerRef.current, {
      layout: {
        background:  { color: '#0a0a0a' },
        textColor:   '#9ca3af',
        fontSize:    11,
        fontFamily:  'monospace',
      },
      grid: {
        vertLines: { color: '#1a1a2e', style: LineStyle.Solid },
        horzLines: { color: '#1a1a2e', style: LineStyle.Solid },
      },
      crosshair: {
        mode:     CrosshairMode.Normal,
        vertLine: { color: '#374151', labelBackgroundColor: '#1f2937' },
        horzLine: { color: '#374151', labelBackgroundColor: '#1f2937' },
      },
      rightPriceScale: {
        borderColor:  '#1f2937',
        scaleMargins: { top: 0.05, bottom: 0.05 },
      },
      timeScale: {
        borderColor:    '#1f2937',
        timeVisible:    true,
        secondsVisible: false,
        barSpacing:     6,
      },
      width:  containerRef.current.clientWidth,
      height: containerRef.current.clientHeight,
    })

    chartRef.current = chart

    const candleSeries = chart.addCandlestickSeries({
      upColor:         COLORS.entryLong,
      downColor:       COLORS.entryShort,
      borderUpColor:   COLORS.entryLong,
      borderDownColor: COLORS.entryShort,
      wickUpColor:     COLORS.entryLong,
      wickDownColor:   COLORS.entryShort,
    })
    seriesRef.current = candleSeries

    const ro = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect
      chart.resize(width, height)
    })
    ro.observe(containerRef.current)

    return () => {
      ro.disconnect()
      chart.remove()
      chartRef.current  = null
      seriesRef.current = null
    }
  }, [])

  const clearOverlays = useCallback(() => {
    const series = seriesRef.current
    if (series) {
      for (const line of linesRef.current) {
        try { series.removePriceLine(line) } catch { /* ignore */ }
      }
      linesRef.current = []
    }
    const chart = chartRef.current
    if (chart) {
      for (const fvgS of fvgSeriesRef.current) {
        try { chart.removeSeries(fvgS) } catch { /* ignore */ }
      }
      fvgSeriesRef.current = []
    }
  }, [])

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const applyOverlays = useCallback((result: AnalysisResult, _candles: Candle[]) => {
    const chart  = chartRef.current
    const series = seriesRef.current
    if (!chart || !series) return

    clearOverlays()

    const lines: ReturnType<ISeriesApi<'Line'>['createPriceLine']>[] = []
    const fvgLines: ISeriesApi<'Line'>[] = []

    for (const ex of result.extremes) {
      lines.push(series.createPriceLine({
        price:            ex.price,
        color:            ex.type === 'ath' ? COLORS.athLine : COLORS.atlLine,
        lineWidth:        2,
        lineStyle:        LineStyle.Solid,
        axisLabelVisible: true,
        title:            ex.type === 'ath' ? '▲ ATH' : '▼ ATL',
      }))
    }

    for (const lvl of result.srLevels) {
      const color = lvl.type === 'support' ? COLORS.support : COLORS.resist
      lines.push(series.createPriceLine({
        price:            lvl.price,
        color,
        lineWidth:        lvl.strength >= 4 ? 2 : 1,
        lineStyle:        LineStyle.Dashed,
        axisLabelVisible: false,
        title:            `${lvl.type === 'support' ? 'S' : 'R'} ×${lvl.strength}`,
      }))
    }

    for (const zone of result.liquidityZones) {
      const color = zone.type === 'buy-side' ? COLORS.buySide : COLORS.sellSide
      lines.push(series.createPriceLine({
        price:            zone.price,
        color,
        lineWidth:        1,
        lineStyle:        LineStyle.SparseDotted,
        axisLabelVisible: false,
        title:            `${zone.type === 'buy-side' ? 'BUY-SIDE LIQ' : 'SELL-SIDE LIQ'} ×${zone.strength}`,
      }))
    }

    for (const fvg of result.fvgs.slice(-12)) {
      const color = fvg.type === 'bullish'
        ? 'rgba(34, 197, 94, 0.5)'
        : 'rgba(239, 68, 68, 0.5)'

      const topSeries = chart.addLineSeries({
        color,
        lineWidth:             1,
        lineStyle:             LineStyle.Dotted,
        lastValueVisible:      false,
        priceLineVisible:      false,
        crosshairMarkerVisible: false,
        title:                 '',
      })
      topSeries.setData([
        { time: fvg.startTime as UTCTimestamp, value: fvg.top },
        { time: fvg.endTime   as UTCTimestamp, value: fvg.top },
      ])

      const botSeries = chart.addLineSeries({
        color,
        lineWidth:             1,
        lineStyle:             LineStyle.Dotted,
        lastValueVisible:      false,
        priceLineVisible:      false,
        crosshairMarkerVisible: false,
        title:                 fvg.type === 'bullish' ? '↑ FVG' : '↓ FVG',
      })
      botSeries.setData([
        { time: fvg.startTime as UTCTimestamp, value: fvg.bottom },
        { time: fvg.endTime   as UTCTimestamp, value: fvg.bottom },
      ])

      const midPrice = (fvg.top + fvg.bottom) / 2
      lines.push(series.createPriceLine({
        price:            midPrice,
        color:            fvg.type === 'bullish' ? 'rgba(34,197,94,0.25)' : 'rgba(239,68,68,0.25)',
        lineWidth:        1,
        lineStyle:        LineStyle.SparseDotted,
        axisLabelVisible: false,
        title:            fvg.type === 'bullish' ? '◆ Bull FVG' : '◆ Bear FVG',
      }))

      fvgLines.push(topSeries, botSeries)
    }

    linesRef.current     = lines
    fvgSeriesRef.current = fvgLines

    const markers: SeriesMarker<UTCTimestamp>[] = []

    for (const sweep of result.sweeps) {
      markers.push({
        time:     sweep.time as UTCTimestamp,
        position: sweep.type === 'bullish' ? 'belowBar' : 'aboveBar',
        color:    COLORS.sweep,
        shape:    'circle',
        text:     sweep.type === 'bullish'
          ? (sweep.reversalConfirmed ? '🔵 Bull Sweep' : '⚠ Bull Sweep?')
          : (sweep.reversalConfirmed ? '🔴 Bear Sweep' : '⚠ Bear Sweep?'),
        size: 1,
      })
    }

    for (const fakeout of result.fakeouts) {
      markers.push({
        time:     fakeout.time as UTCTimestamp,
        position: fakeout.direction === 'up' ? 'aboveBar' : 'belowBar',
        color:    COLORS.fakeout,
        shape:    'circle',
        text:     '⚠ FAKE-OUT',
        size: 1,
      })
    }

    for (const sig of result.signals) {
      markers.push({
        time:     sig.time as UTCTimestamp,
        position: sig.direction === 'LONG' ? 'belowBar' : 'aboveBar',
        color:    sig.direction === 'LONG' ? COLORS.entryLong : COLORS.entryShort,
        shape:    sig.direction === 'LONG' ? 'arrowUp' : 'arrowDown',
        text:     sig.direction === 'LONG'
          ? `▲ LONG  SL:${sig.stopLoss.toFixed(0)}  TP1:${sig.takeProfits[0].toFixed(0)}`
          : `▼ SHORT  SL:${sig.stopLoss.toFixed(0)}  TP1:${sig.takeProfits[0].toFixed(0)}`,
        size: 2,
      })
    }

    markers.sort((a, b) => (a.time as number) - (b.time as number))
    series.setMarkers(markers)
  }, [clearOverlays])

  const fetchAndAnalyze = useCallback(async (tf: Timeframe, signal?: AbortSignal) => {
    setLoading(true)
    try {
      const params = TIMEFRAME_PARAMS[tf]
      const res    = await fetch(
        `/api/gold?interval=${params.interval}&range=${params.range}`,
        { signal }
      )
      const data = await res.json()
      if (signal?.aborted) return

      setIsMock(!!data.mock)
      if (data?.meta) onMeta(data.meta)

      let candles: Candle[] = data.candles ?? []
      if (tf === '4H') candles = resample4H(candles)
      if (candles.length < 5) return

      const series = seriesRef.current
      if (series) {
        series.setData(
          candles.map(c => ({
            time:  c.time as UTCTimestamp,
            open:  c.open,
            high:  c.high,
            low:   c.low,
            close: c.close,
          }))
        )
        chartRef.current?.timeScale().fitContent()
      }

      const lookback       = getSwingLookback(tf)
      const fvgs           = detectFVG(candles)
      const swings         = detectSwingPoints(candles, lookback)
      const liquidityZones = detectLiquidityZones(swings)
      const sweeps         = detectLiquiditySweeps(candles, swings)
      const srLevels       = detectSupportResistance(candles, swings)
      const extremes       = detectExtremes(candles)
      const fakeouts       = detectFakeouts(candles, swings)
      const signals        = generateSignals(candles, fvgs, sweeps, srLevels, swings)

      const latestSweep = sweeps[sweeps.length - 1]
      const bp          = !!(latestSweep && !latestSweep.reversalConfirmed)
      setBePatient(bp)

      const result: AnalysisResult = {
        fvgs, swings, liquidityZones, sweeps, srLevels, extremes, fakeouts, signals, bePatient: bp,
      }

      setAnalysis(result)
      onAnalysis(result)
      applyOverlays(result, candles)
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') return
    } finally {
      setLoading(false)
    }
  }, [applyOverlays, onAnalysis, onMeta])

  useEffect(() => {
    const controller = new AbortController()
    fetchAndAnalyze(timeframe, controller.signal)
    const iv = setInterval(() => fetchAndAnalyze(timeframe), 60_000)
    return () => {
      controller.abort()
      clearInterval(iv)
    }
  }, [timeframe, fetchAndAnalyze])

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 px-3 py-1.5 bg-terminal-surface border-b border-terminal-border flex-shrink-0">
        <span className="text-[10px] font-mono text-gray-500 tracking-widest">XAUUSD</span>
        <div className="flex gap-1">
          {TF_LABELS.map(tf => (
            <button
              key={tf}
              onClick={() => onTimeframeChange(tf)}
              className={`text-[11px] font-mono px-2 py-0.5 rounded transition-colors ${
                timeframe === tf
                  ? 'bg-gold/20 text-gold border border-gold/40'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
        {loading && (
          <div className="flex items-center gap-1.5 ml-2">
            <div className="w-1.5 h-1.5 rounded-full bg-gold live-dot" />
            <span className="text-[10px] text-gray-500 font-mono">Loading...</span>
          </div>
        )}
        {isMock && !loading && (
          <span className="text-[9px] font-mono text-yellow-600 ml-2">[DEMO DATA — Yahoo Finance unavailable]</span>
        )}
        {analysis && !loading && (
          <div className="flex items-center gap-2 ml-2 flex-wrap">
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-green-900/30 text-green-400">
              {analysis.fvgs.filter(f => f.type === 'bullish').length} Bull FVG
            </span>
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-red-900/30 text-red-400">
              {analysis.fvgs.filter(f => f.type === 'bearish').length} Bear FVG
            </span>
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-blue-900/30 text-blue-400">
              {analysis.srLevels.length} S/R
            </span>
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-purple-900/30 text-purple-400">
              {analysis.sweeps.length} Sweeps
            </span>
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-yellow-900/30 text-yellow-400">
              {analysis.liquidityZones.length} Liq Zones
            </span>
          </div>
        )}
      </div>

      <ChartLegend />

      {bePatient && (
        <div className="flex items-center justify-center gap-2 py-1.5 bg-orange-900/40 border-b border-orange-700/50 slide-in flex-shrink-0">
          <span className="text-warning font-mono font-bold text-xs">⚠ BE PATIENT — LIQUIDITY SWEEP IN PROGRESS — WAIT FOR CANDLE CLOSE TO CONFIRM</span>
        </div>
      )}

      <div ref={containerRef} className="flex-1 relative" />
    </div>
  )
}
