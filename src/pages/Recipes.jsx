import { useState, useMemo } from 'react'
import { drinks, categories } from '../data/drinks'
import DrinkCard from '../components/DrinkCard'
import './Recipes.css'

export default function Recipes() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all') // 'all' | 'alcoholic' | 'nonalcoholic'
  const [sort, setSort] = useState('rating')

  const filtered = useMemo(() => {
    let result = drinks.filter((d) => {
      const matchCat = activeCategory === 'all' || d.category === activeCategory
      const matchSearch =
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.description.toLowerCase().includes(search.toLowerCase())
      const matchFilter =
        filter === 'all' ||
        (filter === 'alcoholic' && d.alcoholic) ||
        (filter === 'nonalcoholic' && !d.alcoholic)
      return matchCat && matchSearch && matchFilter
    })

    if (sort === 'rating') result = [...result].sort((a, b) => b.rating - a.rating)
    else if (sort === 'reviews') result = [...result].sort((a, b) => b.reviews - a.reviews)
    else if (sort === 'name') result = [...result].sort((a, b) => a.name.localeCompare(b.name))
    else if (sort === 'time') result = [...result].sort((a, b) => parseInt(a.time) - parseInt(b.time))

    return result
  }, [activeCategory, search, filter, sort])

  return (
    <div className="recipes-page">
      <div className="recipes-header">
        <div className="recipes-header-inner">
          <h1>All Recipes</h1>
          <p>{drinks.length} drinks · Alcoholic & non-alcoholic · All skill levels</p>
        </div>
      </div>

      <div className="recipes-container">
        {/* Search & filters */}
        <div className="recipes-controls">
          <div className="search-wrap">
            <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder="Search drinks…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button className="search-clear" onClick={() => setSearch('')}>×</button>
            )}
          </div>

          <div className="filter-row">
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

            <select
              className="sort-select"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="rating">Top Rated</option>
              <option value="reviews">Most Reviewed</option>
              <option value="name">A–Z</option>
              <option value="time">Fastest First</option>
            </select>
          </div>
        </div>

        {/* Category tabs */}
        <div className="category-tabs">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`cat-tab ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              <span>{cat.emoji}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="results-bar">
          <span>{filtered.length} {filtered.length === 1 ? 'drink' : 'drinks'} found</span>
        </div>

        {filtered.length > 0 ? (
          <div className="recipes-grid">
            {filtered.map((drink) => (
              <DrinkCard key={drink.id} drink={drink} />
            ))}
          </div>
        ) : (
          <div className="no-results">
            <span>🍵</span>
            <h3>No drinks found</h3>
            <p>Try adjusting your search or filters.</p>
            <button className="btn-reset" onClick={() => { setSearch(''); setFilter('all'); setActiveCategory('all') }}>
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
