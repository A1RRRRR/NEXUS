import { useParams, Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { getDrinkById, getRelatedDrinks } from '../data/drinks'
import DrinkCard from '../components/DrinkCard'
import ReviewSection from '../components/ReviewSection'
import './DrinkDetail.css'

export default function DrinkDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const drink = getDrinkById(id)
  const [activeStep, setActiveStep] = useState(0)
  const [servings, setServings] = useState(null)

  if (!drink) {
    return (
      <div className="detail-not-found">
        <h2>Drink not found</h2>
        <Link to="/recipes">← Back to recipes</Link>
      </div>
    )
  }

  const related = getRelatedDrinks(drink)
  const multiplier = servings ? servings / drink.servings : 1

  const parseFraction = (str) => {
    const fractions = { '¼': 0.25, '½': 0.5, '¾': 0.75, '⅓': 0.333, '⅔': 0.667 }
    if (fractions[str]) return fractions[str]
    if (str.includes('/')) {
      const [n, d] = str.split('/')
      return Number(n) / Number(d)
    }
    return Number(str)
  }

  const scaleAmount = (amount) => {
    if (multiplier === 1) return amount
    const match = amount.match(/^([¼½¾⅓⅔\d./]+)\s*(.*)/)
    if (!match) return amount
    const num = parseFraction(match[1]) * multiplier
    const rounded = Math.round(num * 4) / 4
    const unit = match[2]
    return `${rounded % 1 === 0 ? rounded : rounded.toFixed(2)} ${unit}`.trim()
  }

  return (
    <div className="detail-page">
      {/* Hero */}
      <div className="detail-hero" style={{ background: drink.gradient }}>
        <div className="detail-hero-overlay" />
        <div className="detail-hero-content">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            Back
          </button>
          <div className="detail-hero-emoji">{drink.emoji}</div>
          <div className="detail-badges">
            <span className={`badge ${drink.alcoholic ? 'badge-alcoholic' : 'badge-nonalcoholic'}`}>
              {drink.alcoholic ? 'Alcoholic' : 'Non-Alcoholic'}
            </span>
            <span className={`difficulty difficulty-${drink.difficulty.toLowerCase()}`}>{drink.difficulty}</span>
            {drink.tier === 'advanced' && <span className="badge badge-pro">PRO</span>}
          </div>
          <h1 className="detail-title">{drink.name}</h1>
          <p className="detail-description">{drink.description}</p>
          <div className="detail-meta-row">
            <div className="detail-meta-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              <span>{drink.time}</span>
              <label>Prep Time</label>
            </div>
            <div className="detail-meta-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              <span>{servings || drink.servings}</span>
              <label>Serving{(servings || drink.servings) > 1 ? 's' : ''}</label>
            </div>
            <div className="detail-meta-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <span>{drink.rating}</span>
              <label>{drink.reviews.toLocaleString()} reviews</label>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="detail-body">
        <div className="detail-main">
          {/* Ingredients */}
          <section className="detail-section">
            <div className="section-title-row">
              <h2>Ingredients</h2>
              <div className="servings-control">
                <label>Servings:</label>
                <button
                  onClick={() => setServings(Math.max(1, (servings || drink.servings) - 1))}
                  disabled={(servings || drink.servings) <= 1}
                >−</button>
                <span>{servings || drink.servings}</span>
                <button onClick={() => setServings((servings || drink.servings) + 1)}>+</button>
              </div>
            </div>
            <ul className="ingredients-list">
              {drink.ingredients.map((ing, i) => (
                <li key={i} className="ingredient-item">
                  <span className="ing-amount">{scaleAmount(ing.amount)}</span>
                  <span className="ing-item">{ing.item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Steps */}
          <section className="detail-section">
            <h2>Method</h2>
            <div className="steps-list">
              {drink.steps.map((step, i) => (
                <div
                  key={i}
                  className={`method-step ${activeStep === i ? 'active' : ''}`}
                  onClick={() => setActiveStep(i)}
                >
                  <div className="method-step-number">{i + 1}</div>
                  <div className="method-step-body">
                    <h3>{step.title}</h3>
                    <p>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Reviews */}
          <ReviewSection drinkId={`official_${drink.id}`} drinkName={drink.name} />
        </div>

        <aside className="detail-aside">
          {/* Pro Tips */}
          <div className="aside-card">
            <h3>Pro Tips</h3>
            <ul className="tips-list">
              {drink.tips.map((tip, i) => (
                <li key={i}>
                  <span className="tip-bullet">✓</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          {/* Bar Secret */}
          <div className="aside-card bar-secret-card">
            <div className="bar-secret-header">
              <span>🍸</span>
              <h3>Bar Secret</h3>
            </div>
            <p>{drink.barNote}</p>
          </div>

          {/* Upgrade nudge for advanced */}
          {drink.tier === 'advanced' && (
            <div className="aside-card upgrade-card">
              <span className="upgrade-badge">Advanced Recipe</span>
              <h3>Unlock the full experience</h3>
              <p>This is an Advanced tier recipe. Upgrade to unlock all advanced techniques, batch-cocktail guides, and exclusive bar secrets.</p>
              <Link to="/subscribe" className="upgrade-btn">Upgrade to Advanced →</Link>
            </div>
          )}
        </aside>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="detail-related">
          <div className="detail-related-inner">
            <h2>You might also like</h2>
            <div className="related-grid">
              {related.map((d) => (
                <DrinkCard key={d.id} drink={d} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
