import { Link } from 'react-router-dom'
import './DrinkCard.css'

export default function DrinkCard({ drink }) {
  return (
    <Link to={`/recipes/${drink.id}`} className="drink-card">
      <div className="drink-card-visual" style={{ background: drink.gradient }}>
        <span className="drink-card-emoji">{drink.emoji}</span>
        <div className="drink-card-badges">
          <span className={`badge ${drink.alcoholic ? 'badge-alcoholic' : 'badge-nonalcoholic'}`}>
            {drink.alcoholic ? 'Alcoholic' : 'Non-Alcoholic'}
          </span>
          {drink.tier === 'advanced' && (
            <span className="badge badge-pro">PRO</span>
          )}
        </div>
      </div>
      <div className="drink-card-body">
        <h3 className="drink-card-name">{drink.name}</h3>
        <p className="drink-card-desc">{drink.description.slice(0, 90)}…</p>
        <div className="drink-card-meta">
          <span className="meta-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            {drink.time}
          </span>
          <span className="meta-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            {drink.rating} ({drink.reviews.toLocaleString()})
          </span>
          <span className={`difficulty difficulty-${drink.difficulty.toLowerCase()}`}>
            {drink.difficulty}
          </span>
        </div>
      </div>
    </Link>
  )
}
