import { useParams, useNavigate, Link, useSearchParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { loadCommunityDrinks, toggleLike, loadLikes } from '../data/community'
import ReviewSection from '../components/ReviewSection'
import './DrinkDetail.css'
import './CommunityDetail.css'

export default function CommunityDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const isNew = searchParams.get('new') === '1'

  const [drink, setDrink] = useState(null)
  const [activeStep, setActiveStep] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)

  useEffect(() => {
    const all = loadCommunityDrinks()
    const found = all.find((d) => d.id === id)
    setDrink(found || null)
    if (found) {
      setLikeCount(found.likes || 0)
      setIsLiked(loadLikes()[found.id] || false)
    }
  }, [id])

  if (!drink) {
    return (
      <div className="detail-not-found">
        <h2>Recipe not found</h2>
        <Link to="/community">← Back to Community</Link>
      </div>
    )
  }

  const handleLike = () => {
    const nowLiked = toggleLike(drink.id)
    setIsLiked(nowLiked)
    setLikeCount((prev) => nowLiked ? prev + 1 : prev - 1)
  }

  return (
    <div className="detail-page">
      {/* New recipe banner */}
      {isNew && (
        <div className="new-recipe-banner">
          🎉 Your recipe has been published! The Bev community can now find and review it.
        </div>
      )}

      {/* Hero */}
      <div className="detail-hero" style={{ background: drink.gradient }}>
        <div className="detail-hero-overlay" />
        <div className="detail-hero-content">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            Community
          </button>

          <div className="community-creator-bar">
            <span className="creator-avatar-lg">{drink.creator.avatar}</span>
            <div>
              <span className="creator-by">Recipe by</span>
              <strong className="creator-name-lg">{drink.creator.name}</strong>
            </div>
            <span className="creator-date">Posted {drink.createdAt}</span>
          </div>

          <div className="detail-hero-emoji">{drink.emoji}</div>

          <div className="detail-badges">
            <span className={`badge ${drink.alcoholic ? 'badge-alcoholic' : 'badge-nonalcoholic'}`}>
              {drink.alcoholic ? 'Alcoholic' : 'Non-Alcoholic'}
            </span>
            <span className={`difficulty difficulty-${drink.difficulty.toLowerCase()}`}>{drink.difficulty}</span>
            <span className="badge badge-community">Community Recipe</span>
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
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <span>{drink.rating > 0 ? drink.rating : '—'}</span>
              <label>{drink.reviews?.length || 0} reviews</label>
            </div>
            <div className="detail-meta-item">
              <button className={`like-meta-btn ${isLiked ? 'liked' : ''}`} onClick={handleLike}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
                <span>{likeCount}</span>
              </button>
              <label>{isLiked ? 'Liked!' : 'Likes'}</label>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="detail-body">
        <div className="detail-main">
          {/* Ingredients */}
          <section className="detail-section">
            <h2>Ingredients</h2>
            <ul className="ingredients-list">
              {drink.ingredients.map((ing, i) => (
                <li key={i} className="ingredient-item">
                  <span className="ing-amount">{ing.amount}</span>
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
          <ReviewSection drinkId={drink.id} drinkName={drink.name} />
        </div>

        <aside className="detail-aside">
          {drink.tips && drink.tips.length > 0 && (
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
          )}

          {drink.barNote && (
            <div className="aside-card bar-secret-card">
              <div className="bar-secret-header">
                <span>🍸</span>
                <h3>Creator's Secret</h3>
              </div>
              <p>{drink.barNote}</p>
            </div>
          )}

          <div className="aside-card creator-card">
            <div className="creator-card-avatar">{drink.creator.avatar}</div>
            <h3>{drink.creator.name}</h3>
            <p>Bev Max Member · {drink.creator.joined}</p>
            <div className="creator-stats">
              <span>♥ {likeCount} likes on this recipe</span>
              <span>💬 {drink.reviews?.length || 0} reviews</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
