'use client'

import { useEffect, useState, useCallback } from 'react'
import { TrendingUp, TrendingDown, Clock, Activity } from 'lucide-react'

interface Session { name: string; active: boolean; color: string }

function getSessions(): Session[] {
  const h = new Date().getUTCHours()
  return [
    { name: 'Asia',   color: 'text-blue-400',   active: h >= 23 || h < 8  },
    { name: 'London', color: 'text-yellow-400',  active: h >= 7  && h < 16 },
    { name: 'NY',     color: 'text-green-400',   active: h >= 12 && h < 21 },
  ]
}

interface Props { initialPrice: number; previousClose: number }

export default function MarketContext({ initialPrice, previousClose }: Props) {
  const [price, setPrice]       = useState(initialPrice)
  const [dayHigh, setDayHigh]   = useState(initialPrice)
  const [dayLow,  setDayLow]    = useState(initialPrice)
  const [sessions, setSessions] = useState<Session[]>(getSessions())
  const [lastUpdate, setLastUpdate] = useState(new Date())
  const [isMock, setIsMock]     = useState(false)

  const fetchPrice = useCallback(async () => {
    try {
      const res  = await fetch('/api/gold?interval=1m&range=1d')
      const data = await res.json()
      if (data?.meta?.regularMarketPrice) {
        setPrice(data.meta.regularMarketPrice)
        setIsMock(!!data.mock)
      }
      if (data?.candles?.length) {
        const highs = data.candles.map((c: { high: number }) => c.high)
        const lows  = data.candles.map((c: { low: number })  => c.low)
        setDayHigh(Math.max(...highs))
        setDayLow(Math.min(...lows))
      }
      setLastUpdate(new Date())
    } catch { /* keep current */ }
  }, [])

  useEffect(() => {
    fetchPrice()
    const iv = setInterval(() => {
      fetchPrice()
      setSessions(getSessions())
    }, 30_000)
    return () => clearInterval(iv)
  }, [fetchPrice])

  const change    = price - previousClose
  const changePct = (change / previousClose) * 100
  const isUp      = change >= 0

  return (
    <div className="flex items-center gap-6 px-4 py-2 bg-terminal-surface border-b border-terminal-border">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-gold live-dot" />
        <span className="text-gold font-mono font-bold text-sm tracking-widest">NEXUS</span>
      </div>

      <div className="h-4 w-px bg-terminal-border" />

      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-400 font-mono">XAUUSD</span>
        <span className="text-xs text-gray-500">·</span>
        <span className="text-xs text-gray-400 font-mono">Gold Futures</span>
      </div>

      <div className="h-4 w-px bg-terminal-border" />

      <div className="flex items-center gap-2">
        <span className={`text-xl font-mono font-bold tabular-nums ${isUp ? 'text-bullish' : 'text-bearish'}`}>
          ${price.toFixed(2)}
        </span>
        <div className={`flex items-center gap-1 text-xs font-mono ${isUp ? 'text-bullish' : 'text-bearish'}`}>
          {isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          <span>{isUp ? '+' : ''}{change.toFixed(2)}</span>
          <span>({isUp ? '+' : ''}{changePct.toFixed(2)}%)</span>
        </div>
        {isMock && <span className="text-[10px] text-yellow-600 font-mono">[DEMO]</span>}
      </div>

      <div className="h-4 w-px bg-terminal-border" />

      <div className="flex items-center gap-3 text-xs font-mono">
        <div className="flex items-center gap-1">
          <span className="text-gray-500">H</span>
          <span className="text-bullish">{dayHigh.toFixed(2)}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-gray-500">L</span>
          <span className="text-bearish">{dayLow.toFixed(2)}</span>
        </div>
      </div>

      <div className="h-4 w-px bg-terminal-border" />

      <div className="flex items-center gap-1">
        <Clock size={11} className="text-gray-500" />
        <div className="flex gap-2">
          {sessions.map(s => (
            <span
              key={s.name}
              className={`text-[11px] font-mono px-1.5 py-0.5 rounded ${
                s.active
                  ? `${s.color} bg-terminal-muted font-semibold`
                  : 'text-gray-600'
              }`}
            >
              {s.name}
            </span>
          ))}
        </div>
      </div>

      <div className="ml-auto flex items-center gap-1.5 text-[10px] text-gray-600 font-mono">
        <Activity size={10} />
        <span>Updated {lastUpdate.toLocaleTimeString()}</span>
      </div>
    </div>
  )
}
