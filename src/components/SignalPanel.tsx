'use client'

import { Shield, Target, TrendingUp, TrendingDown, AlertTriangle, Star } from 'lucide-react'
import type { TradeSignal, Fakeout, LiquiditySweep } from '@/lib/types'

interface Props {
  signals:      TradeSignal[]
  fakeouts:     Fakeout[]
  sweeps:       LiquiditySweep[]
  currentPrice: number
}

function ConfidenceStars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <Star key={i} size={9} className={i <= n ? 'text-gold fill-gold' : 'text-gray-700'} />
      ))}
    </div>
  )
}

export default function SignalPanel({ signals, fakeouts, sweeps, currentPrice }: Props) {
  const latestSweep    = sweeps[sweeps.length - 1]
  const bePatient      = latestSweep && !latestSweep.reversalConfirmed
  const recentFakeouts = fakeouts.slice(-3)

  return (
    <div className="flex flex-col h-full bg-terminal-surface border-l border-terminal-border overflow-y-auto">
      <div className="px-3 py-2 border-b border-terminal-border flex-shrink-0">
        <div className="flex items-center gap-2">
          <Shield size={13} className="text-gold" />
          <span className="text-[11px] font-mono font-bold text-gray-300 tracking-widest">TRADE SIGNALS</span>
        </div>
      </div>

      {bePatient && (
        <div className="mx-2 mt-2 p-2 bg-orange-900/30 border border-orange-600/50 rounded slide-in flex-shrink-0">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle size={13} className="text-warning" />
            <span className="text-[11px] font-mono font-bold text-warning">⚠ BE PATIENT</span>
          </div>
          <p className="text-[10px] text-orange-300 font-mono leading-tight">
            Liquidity sweep in progress — reversal not yet confirmed. Wait for candle close above/below swept level.
          </p>
        </div>
      )}

      {recentFakeouts.length > 0 && (
        <div className="mx-2 mt-2 flex-shrink-0">
          <p className="text-[9px] font-mono text-gray-600 mb-1 tracking-widest">FAKE-OUTS DETECTED</p>
          {recentFakeouts.map(f => (
            <div key={f.id} className="p-1.5 bg-yellow-900/20 border border-yellow-700/30 rounded mb-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-warning">⚠ FAKE-OUT {f.direction === 'up' ? '▲' : '▼'}</span>
                <span className="text-[9px] text-gray-500 font-mono">${f.price.toFixed(2)}</span>
              </div>
              <span className="text-[9px] text-gray-500 font-mono">Wick ratio: {(f.wickRatio * 100).toFixed(0)}%</span>
            </div>
          ))}
        </div>
      )}

      {signals.length === 0 && !bePatient && (
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center">
            <Target size={24} className="text-gray-700 mx-auto mb-2" />
            <p className="text-[11px] text-gray-600 font-mono">No high-confluence</p>
            <p className="text-[11px] text-gray-600 font-mono">signals detected</p>
            <p className="text-[9px] text-gray-700 font-mono mt-1">Waiting for sweep + FVG + S/R</p>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2 p-2">
        {signals.map(sig => {
          const isLong  = sig.direction === 'LONG'
          const riskAmt = Math.abs(sig.entryPrice - sig.stopLoss)
          const isActive = sig.status === 'active'
          return (
            <div
              key={sig.id}
              className={`rounded border p-2.5 flex-shrink-0 ${
                isLong ? 'border-bullish/30 bg-green-950/30' : 'border-bearish/30 bg-red-950/30'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-mono font-bold ${
                  isLong ? 'bg-bullish/20 text-bullish' : 'bg-bearish/20 text-bearish'
                }`}>
                  {isLong ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                  {sig.direction}
                </div>
                <ConfidenceStars n={sig.confidence} />
              </div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-gray-400 font-mono">Entry</span>
                <span className="text-[11px] text-white font-mono font-bold tabular-nums">${sig.entryPrice.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-bearish font-mono">Stop Loss</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] text-gray-500 font-mono">-${riskAmt.toFixed(2)}</span>
                  <span className="text-[11px] text-bearish font-mono font-bold tabular-nums">${sig.stopLoss.toFixed(2)}</span>
                </div>
              </div>
              <div className="border-t border-terminal-border my-1.5" />
              {sig.takeProfits.map((tp, i) => (
                <div key={i} className="flex items-center justify-between mb-0.5">
                  <span className="text-[10px] text-bullish font-mono">TP{i + 1}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] text-gray-500 font-mono">R:{sig.riskRewardRatios[i]?.toFixed(1)}</span>
                    <span className="text-[11px] text-bullish font-mono tabular-nums">${tp.toFixed(2)}</span>
                  </div>
                </div>
              ))}
              <div className="mt-2 pt-1.5 border-t border-terminal-border">
                <p className="text-[9px] text-gray-600 font-mono mb-1 tracking-widest">CONFLUENCE</p>
                <div className="flex flex-wrap gap-1">
                  {sig.confluenceFactors.map((f, i) => (
                    <span key={i} className="text-[8px] font-mono px-1 py-0.5 bg-terminal-muted/40 text-gray-400 rounded">{f}</span>
                  ))}
                </div>
              </div>
              {isActive && (
                <div className="mt-1.5 text-[9px] font-mono text-gray-600">
                  {Math.abs(currentPrice - sig.entryPrice) < 2
                    ? <span className="text-warning">⚡ AT ENTRY ZONE</span>
                    : <span>{isLong ? '▲' : '▼'} {Math.abs(currentPrice - sig.entryPrice).toFixed(2)} from entry</span>
                  }
                </div>
              )}
            </div>
          )
        })}
      </div>

      {sweeps.length > 0 && (
        <div className="mx-2 mb-2 flex-shrink-0">
          <p className="text-[9px] font-mono text-gray-600 mb-1 tracking-widest">RECENT SWEEPS</p>
          {sweeps.slice(-4).reverse().map(s => (
            <div key={s.id} className="flex items-center justify-between py-0.5">
              <span className={`text-[10px] font-mono ${s.type === 'bullish' ? 'text-bullish' : 'text-bearish'}`}>
                {s.type === 'bullish' ? '▲ Bull Sweep' : '▼ Bear Sweep'}
              </span>
              <div className="flex items-center gap-1.5">
                <span className="text-[9px] text-gray-500 font-mono">${s.price.toFixed(2)}</span>
                <span className={`text-[8px] font-mono px-1 rounded ${
                  s.reversalConfirmed ? 'text-bullish bg-bullish/10' : 'text-warning bg-warning/10'
                }`}>
                  {s.reversalConfirmed ? 'CONF' : 'WAIT'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
