import { Link } from 'react-router-dom'
import { useState } from 'react'
import { toggleLike, loadLikes } from '../data/community'
import './CommunityCard.css'

export default function CommunityCard({ drink }) {
  const liked = loadLikes()[drink.id] || false
  const [isLiked, setIsLiked] = useState(liked)
  const [likeCount, setLikeCount] = useState(drink.likes || 0)

  const handleLike = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const nowLiked = toggleLike(drink.id)
    setIsLiked(nowLiked)
    setLikeCount((prev) => nowLiked ? prev + 1 : prev - 1)
  }

  return (
    <Link to={`/community/${drink.id}`} className="community-card">
      <div className="cc-visual" style={{ background: drink.gradient }}>
        <span className="cc-emoji">{drink.emoji}</span>
        <div className="cc-badges">
          <span className={`badge ${drink.alcoholic ? 'badge-alcoholic' : 'badge-nonalcoholic'}`}>
            {drink.alcoholic ? 'Alcoholic' : 'Non-Alcoholic'}
          </span>
        </div>
      </div>
      <div className="cc-body">
        <div className="cc-creator">
          <span className="cc-avatar">{drink.creator.avatar}</span>
          <span className="cc-creator-name">{drink.creator.name}</span>
          <span className="cc-dot">·</span>
          <span className="cc-date">{drink.createdAt}</span>
        </div>
        <h3 className="cc-name">{drink.name}</h3>
        <p className="cc-desc">{drink.description.slice(0, 88)}…</p>
        <div className="cc-footer">
          <div className="cc-meta">
            <span className="cc-meta-item">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              {drink.rating} ({drink.reviews?.length || 0})
            </span>
            <span className="cc-meta-item">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              {drink.time}
            </span>
          </div>
          <button
            className={`cc-like-btn ${isLiked ? 'liked' : ''}`}
            onClick={handleLike}
            aria-label={isLiked ? 'Unlike' : 'Like'}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            {likeCount}
          </button>
        </div>
      </div>
    </Link>
  )
}
