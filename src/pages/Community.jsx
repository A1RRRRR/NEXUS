import { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { loadCommunityDrinks } from '../data/community'
import CommunityCard from '../components/CommunityCard'
import './Community.css'

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'top', label: 'Top Rated' },
  { value: 'liked', label: 'Most Liked' },
]

export default function Community() {
  const [drinks, setDrinks] = useState([])
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [sort, setSort] = useState('latest')

  useEffect(() => {
    setDrinks(loadCommunityDrinks())
  }, [])

  const filtered = useMemo(() => {
    let result = drinks.filter((d) => {
      const matchSearch =
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.creator.name.toLowerCase().includes(search.toLowerCase()) ||
        d.description.toLowerCase().includes(search.toLowerCase())
      const matchFilter =
        filter === 'all' ||
        (filter === 'alcoholic' && d.alcoholic) ||
        (filter === 'nonalcoholic' && !d.alcoholic)
      return matchSearch && matchFilter
    })

    if (sort === 'latest') result = [...result].sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    else if (sort === 'top') result = [...result].sort((a, b) => b.rating - a.rating)
    else if (sort === 'liked') result = [...result].sort((a, b) => b.likes - a.likes)

    return result
  }, [drinks, search, filter, sort])

  const topDrink = drinks.reduce((best, d) => (!best || d.likes > best.likes ? d : best), null)

  return (
    <div className="community-page">
      {/* Header */}
      <div className="community-header">
        <div className="community-header-inner">
          <div className="community-header-text">
            <div className="community-eyebrow">Max Feature · Community</div>
            <h1>Drinks by the Community</h1>
            <p>Recipes created and shared by Bev Max subscribers — rate, review, and get inspired.</p>
          </div>
          <Link to="/create" className="create-drink-btn">
            + Share Your Recipe
          </Link>
        </div>
      </div>

      {/* Featured */}
      {topDrink && (
        <div className="community-featured">
          <div className="featured-inner">
            <div className="featured-label">⭐ Community Favourite</div>
            <div className="featured-content">
              <div className="featured-visual" style={{ background: topDrink.gradient }}>
                <span>{topDrink.emoji}</span>
              </div>
              <div className="featured-info">
                <div className="featured-creator">
                  <span>{topDrink.creator.avatar}</span>
                  <strong>{topDrink.creator.name}</strong>
                </div>
                <h2>{topDrink.name}</h2>
                <p>{topDrink.description}</p>
                <div className="featured-stats">
                  <span>★ {topDrink.rating}</span>
                  <span>♥ {topDrink.likes} likes</span>
                  <span>💬 {topDrink.reviews?.length || 0} reviews</span>
                  <span>⏱ {topDrink.time}</span>
                </div>
                <Link to={`/community/${topDrink.id}`} className="featured-cta">
                  View Recipe →
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="community-container">
        <div className="community-controls">
          <div className="search-wrap">
            <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              className="search-input"
              type="text"
              placeholder="Search recipes or creators…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && <button className="search-clear" onClick={() => setSearch('')}>×</button>}
          </div>

          <div className="controls-row">
            <div className="toggle-group">
              {['all', 'alcoholic', 'nonalcoholic'].map((f) => (
                <button
                  key={f}
                  className={`toggle-btn ${filter === f ? 'active' : ''}`}
                  onClick={() => setFilter(f)}
                >
                  {f === 'all' ? 'All' : f === 'alcoholic' ? 'Alcoholic' : 'Non-Alcoholic'}
                </button>
              ))}
            </div>

            <div className="sort-pills">
              {SORT_OPTIONS.map((o) => (
                <button
                  key={o.value}
                  className={`sort-pill ${sort === o.value ? 'active' : ''}`}
                  onClick={() => setSort(o.value)}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="results-bar">
          {filtered.length} {filtered.length === 1 ? 'recipe' : 'recipes'}
        </div>

        {filtered.length > 0 ? (
          <div className="community-grid">
            {filtered.map((drink) => (
              <CommunityCard key={drink.id} drink={drink} />
            ))}
          </div>
        ) : (
          <div className="no-results">
            <span>🍵</span>
            <h3>No recipes found</h3>
            <p>Try a different search or be the first to post one!</p>
            <Link to="/create" className="create-drink-btn" style={{ marginTop: 8 }}>
              + Share Your Recipe
            </Link>
          </div>
        )}
      </div>

      {/* CTA bottom */}
      <div className="community-cta-bar">
        <div className="community-cta-inner">
          <h2>Have a signature drink?</h2>
          <p>Max subscribers can share recipes with the whole Bev community and build a following.</p>
          <div className="community-cta-actions">
            <Link to="/create" className="btn-primary">Share Your Recipe</Link>
            <Link to="/subscribe" className="btn-ghost">Upgrade to Max</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
