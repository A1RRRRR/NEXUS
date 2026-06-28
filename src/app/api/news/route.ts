import { NextResponse } from 'next/server'
import { XMLParser } from 'fast-xml-parser'
import type { NewsCategory, NewsItem } from '@/lib/types'

export const dynamic = 'force-dynamic'

const FEEDS: Array<{ url: string; category: NewsCategory }> = [
  { category: 'gold',        url: 'https://news.google.com/rss/search?q=gold+price+XAUUSD&hl=en-US&gl=US&ceid=US:en' },
  { category: 'fed',         url: 'https://news.google.com/rss/search?q=Federal+Reserve+FOMC+interest+rates&hl=en-US&gl=US&ceid=US:en' },
  { category: 'geopolitics', url: 'https://news.google.com/rss/search?q=geopolitical+risk+tensions+sanctions&hl=en-US&gl=US&ceid=US:en' },
  { category: 'war',         url: 'https://news.google.com/rss/search?q=war+conflict+military+strike&hl=en-US&gl=US&ceid=US:en' },
  { category: 'usd',         url: 'https://news.google.com/rss/search?q=US+dollar+DXY+dollar+index&hl=en-US&gl=US&ceid=US:en' },
  { category: 'oil',         url: 'https://news.google.com/rss/search?q=oil+crude+OPEC+energy+prices&hl=en-US&gl=US&ceid=US:en' },
]

const BULLISH_GOLD = [
  'rate cut','dovish','risk off','safe haven','geopolitical tension','conflict','war',
  'sanctions','inflation rises','inflation surge','dollar falls','dollar weakens',
  'fed pause','crisis','attack','military','escalat','uncertainty','recession fears',
  'banking crisis','debt ceiling','default risk',
]
const BEARISH_GOLD = [
  'rate hike','hawkish','risk on','dollar rises','dollar strengthens','strong dollar',
  'fed raises','economic growth','risk appetite','sell-off gold','gold falls',
  'gold drops','gold declines','rate increase','tightening',
]

function classifySentiment(title: string, category: NewsCategory): 'bullish' | 'bearish' | 'neutral' {
  const t = title.toLowerCase()
  if (category === 'usd') {
    if (BEARISH_GOLD.some(k => t.includes(k))) return 'bearish'
    if (BULLISH_GOLD.some(k => t.includes(k))) return 'bullish'
  }
  if (BULLISH_GOLD.some(k => t.includes(k))) return 'bullish'
  if (BEARISH_GOLD.some(k => t.includes(k))) return 'bearish'
  return 'neutral'
}

interface RssItem {
  title:    string | { '#text': string }
  link?:    string
  pubDate?: string
  source?:  { '#text': string } | string
  guid?:    string
}

async function fetchFeed(feed: { url: string; category: NewsCategory }): Promise<NewsItem[]> {
  const res = await fetch(feed.url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; NexusBot/1.0)',
      'Accept':     'application/rss+xml, application/xml, text/xml',
    },
    next: { revalidate: 60 },
  })

  const text = await res.text()
  if (text.trimStart().startsWith('<!DOCTYPE') || text.trimStart().startsWith('<html')) return []

  const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '@_' })
  const parsed = parser.parse(text)
  const items: RssItem[] = parsed?.rss?.channel?.item ?? []
  const arr = Array.isArray(items) ? items : [items]

  return arr.slice(0, 6).map((item, idx): NewsItem => {
    const title = typeof item.title === 'object' ? item.title['#text'] : item.title ?? ''
    const source =
      typeof item.source === 'object' ? item.source['#text'] :
      typeof item.source === 'string' ? item.source : 'Unknown'

    return {
      id:          `${feed.category}-${idx}-${Date.now()}`,
      title:       title.replace(/\s*-\s*[^-]+$/, '').trim(),
      source,
      publishedAt: item.pubDate ?? new Date().toISOString(),
      url:         item.link ?? '#',
      category:    feed.category,
      sentiment:   classifySentiment(title, feed.category),
    }
  })
}

export async function GET() {
  try {
    const results = await Promise.allSettled(FEEDS.map(fetchFeed))
    const all: NewsItem[] = results.flatMap(r => r.status === 'fulfilled' ? r.value : [])

    const seen   = new Set<string>()
    const deduped = all.filter(item => {
      const key = item.title.slice(0, 60).toLowerCase().replace(/\s+/g, ' ')
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })

    deduped.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())

    return NextResponse.json({ items: deduped.slice(0, 40) })
  } catch {
    return NextResponse.json({ items: getMockNews() })
  }
}

function getMockNews(): NewsItem[] {
  const now = new Date().toISOString()
  return [
    { id: 'mock-1', title: 'Gold holds near record highs amid safe-haven demand', source: 'Reuters', publishedAt: now, url: '#', category: 'gold', sentiment: 'bullish' },
    { id: 'mock-2', title: 'Fed signals patience on rate cuts as inflation persists', source: 'Bloomberg', publishedAt: now, url: '#', category: 'fed', sentiment: 'bearish' },
    { id: 'mock-3', title: 'Middle East tensions escalate, driving flight to safety', source: 'AP', publishedAt: now, url: '#', category: 'geopolitics', sentiment: 'bullish' },
    { id: 'mock-4', title: 'Dollar index retreats as risk sentiment improves', source: 'FT', publishedAt: now, url: '#', category: 'usd', sentiment: 'bullish' },
    { id: 'mock-5', title: 'Oil prices surge on OPEC+ supply cut extension', source: 'CNBC', publishedAt: now, url: '#', category: 'oil', sentiment: 'neutral' },
    { id: 'mock-6', title: 'Conflict in Eastern Europe weighs on markets', source: 'BBC', publishedAt: now, url: '#', category: 'war', sentiment: 'bullish' },
  ]
}
