'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { RefreshCw, ExternalLink } from 'lucide-react'
import type { NewsItem, NewsCategory } from '@/lib/types'

const CATEGORY_STYLES: Record<NewsCategory, { bg: string; text: string; label: string }> = {
  gold:        { bg: 'bg-yellow-900/40', text: 'text-yellow-400',  label: 'GOLD'   },
  fed:         { bg: 'bg-blue-900/40',   text: 'text-blue-400',    label: 'FED'    },
  geopolitics: { bg: 'bg-purple-900/40', text: 'text-purple-400',  label: 'GEO'    },
  war:         { bg: 'bg-red-900/40',    text: 'text-red-400',     label: 'WAR'    },
  usd:         { bg: 'bg-green-900/40',  text: 'text-green-400',   label: 'USD'    },
  oil:         { bg: 'bg-orange-900/40', text: 'text-orange-400',  label: 'OIL'    },
}

const SENTIMENT_STYLES = {
  bullish: { bg: 'bg-bullish/20', text: 'text-bullish', label: 'BULL ▲' },
  bearish: { bg: 'bg-bearish/20', text: 'text-bearish', label: 'BEAR ▼' },
  neutral: { bg: 'bg-gray-700/40', text: 'text-gray-400', label: 'NEUT ─' },
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const m = Math.floor(diff / 60000)
  if (m < 1)  return 'just now'
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  return `${Math.floor(h / 24)}d ago`
}

export default function NewsPanel() {
  const [items, setItems]         = useState<NewsItem[]>([])
  const [loading, setLoading]     = useState(true)
  const [lastFetch, setLastFetch] = useState<Date | null>(null)
  const [filter, setFilter]       = useState<NewsCategory | 'all'>('all')
  const scrollRef                 = useRef<HTMLDivElement>(null)

  const fetchNews = useCallback(async () => {
    try {
      const res  = await fetch('/api/news')
      const data = await res.json()
      if (data?.items) setItems(data.items)
      setLastFetch(new Date())
    } catch { /* keep current */ } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchNews()
    const iv = setInterval(fetchNews, 60_000)
    return () => clearInterval(iv)
  }, [fetchNews])

  const categories: Array<{ key: NewsCategory | 'all'; label: string }> = [
    { key: 'all',        label: 'ALL'  },
    { key: 'gold',       label: 'GOLD' },
    { key: 'fed',        label: 'FED'  },
    { key: 'geopolitics',label: 'GEO'  },
    { key: 'war',        label: 'WAR'  },
    { key: 'usd',        label: 'USD'  },
    { key: 'oil',        label: 'OIL'  },
  ]

  const filtered  = filter === 'all' ? items : items.filter(i => i.category === filter)
  const bullCount = filtered.filter(i => i.sentiment === 'bullish').length
  const bearCount = filtered.filter(i => i.sentiment === 'bearish').length
  const bias      = bullCount > bearCount ? 'BULLISH' : bearCount > bullCount ? 'BEARISH' : 'NEUTRAL'
  const biasColor = bias === 'BULLISH' ? 'text-bullish' : bias === 'BEARISH' ? 'text-bearish' : 'text-gray-400'

  return (
    <div className="flex flex-col h-full bg-terminal-surface border-t border-terminal-border">
      <div className="flex items-center gap-3 px-3 py-1.5 border-b border-terminal-border flex-shrink-0">
        <span className="text-[11px] font-mono font-semibold text-gray-300 tracking-widest">GEOPOLITICAL INTEL</span>
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-bullish live-dot" />
          <span className="text-[10px] text-gray-500 font-mono">LIVE</span>
        </div>
        <div className={`text-[10px] font-mono font-bold ${biasColor} ml-1`}>
          GOLD BIAS: {bias} ({bullCount}↑ {bearCount}↓)
        </div>
        <div className="flex gap-1 ml-2">
          {categories.map(c => (
            <button
              key={c.key}
              onClick={() => setFilter(c.key)}
              className={`text-[9px] font-mono px-1.5 py-0.5 rounded transition-colors ${
                filter === c.key
                  ? 'bg-gold/20 text-gold border border-gold/30'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-2">
          {lastFetch && (
            <span className="text-[9px] text-gray-600 font-mono">{lastFetch.toLocaleTimeString()}</span>
          )}
          <button onClick={fetchNews} className="text-gray-600 hover:text-gray-400 transition-colors">
            <RefreshCw size={11} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-2 px-3 py-2 overflow-x-auto flex-1 items-start"
        style={{ scrollbarWidth: 'thin' }}
      >
        {loading && (
          <div className="flex items-center gap-2 text-gray-500 text-xs font-mono">
            <RefreshCw size={12} className="animate-spin" />
            <span>Fetching live news...</span>
          </div>
        )}
        {!loading && filtered.length === 0 && (
          <div className="text-xs text-gray-600 font-mono">No news available</div>
        )}
        {filtered.map(item => {
          const cat  = CATEGORY_STYLES[item.category]
          const sent = SENTIMENT_STYLES[item.sentiment]
          return (
            <div
              key={item.id}
              className="flex-shrink-0 w-64 bg-terminal-bg border border-terminal-border rounded p-2 flex flex-col gap-1.5 hover:border-terminal-muted transition-colors"
            >
              <div className="flex items-center gap-1.5">
                <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${cat.bg} ${cat.text}`}>{cat.label}</span>
                <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${sent.bg} ${sent.text}`}>{sent.label}</span>
                <span className="text-[9px] text-gray-600 font-mono ml-auto">{timeAgo(item.publishedAt)}</span>
              </div>
              <p className="text-[11px] text-gray-200 leading-tight line-clamp-2 flex-1">{item.title}</p>
              <div className="flex items-center justify-between">
                <span className="text-[9px] text-gray-500 font-mono">{item.source}</span>
                {item.url !== '#' && (
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-400 transition-colors">
                    <ExternalLink size={9} />
                  </a>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
