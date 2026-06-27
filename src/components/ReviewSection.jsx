import { useState, useEffect } from 'react'
import { loadReviews, saveReview } from '../data/community'
import './ReviewSection.css'

const STAR_LABELS = ['', 'Poor', 'Fair', 'Good', 'Great', 'Outstanding']

export default function ReviewSection({ drinkId, drinkName }) {
  const [reviews, setReviews] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [draft, setDraft] = useState({ author: '', rating: 0, text: '' })
  const [hover, setHover] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    setReviews(loadReviews(drinkId))
  }, [drinkId])

  const avgRating = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : null

  const ratingCounts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
  }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!draft.author.trim() || !draft.rating || !draft.text.trim()) return

    const review = {
      id: `ur_${Date.now()}`,
      author: draft.author.trim(),
      avatar: '👤',
      rating: draft.rating,
      text: draft.text.trim(),
      date: new Date().toISOString().slice(0, 10),
    }

    saveReview(drinkId, review)
    setReviews((prev) => [...prev, review])
    setDraft({ author: '', rating: 0, text: '' })
    setShowForm(false)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <section className="review-section">
      <div className="review-header">
        <h2>Reviews</h2>
        {!showForm && (
          <button className="write-review-btn" onClick={() => setShowForm(true)}>
            + Write a review
          </button>
        )}
      </div>

      {submitted && (
        <div className="review-success">
          ✓ Your review has been posted — thank you!
        </div>
      )}

      {/* Summary */}
      {reviews.length > 0 && (
        <div className="review-summary">
          <div className="review-avg">
            <span className="avg-number">{avgRating}</span>
            <div className="avg-stars">
              {[1, 2, 3, 4, 5].map((s) => (
                <span key={s} className={s <= Math.round(Number(avgRating)) ? 'star-filled' : 'star-empty'}>★</span>
              ))}
            </div>
            <span className="avg-count">{reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}</span>
          </div>
          <div className="rating-bars">
            {ratingCounts.map(({ star, count }) => (
              <div key={star} className="rating-bar-row">
                <span className="bar-label">{star}★</span>
                <div className="bar-track">
                  <div
                    className="bar-fill"
                    style={{ width: reviews.length ? `${(count / reviews.length) * 100}%` : '0%' }}
                  />
                </div>
                <span className="bar-count">{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Write review form */}
      {showForm && (
        <form className="review-form" onSubmit={handleSubmit}>
          <h3>Your review for {drinkName}</h3>

          <div className="form-group">
            <label>Your name</label>
            <input
              type="text"
              placeholder="e.g. Sarah M."
              value={draft.author}
              onChange={(e) => setDraft({ ...draft, author: e.target.value })}
              maxLength={40}
              required
            />
          </div>

          <div className="form-group">
            <label>Rating</label>
            <div className="star-picker">
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  key={s}
                  type="button"
                  className={`star-btn ${s <= (hover || draft.rating) ? 'active' : ''}`}
                  onMouseEnter={() => setHover(s)}
                  onMouseLeave={() => setHover(0)}
                  onClick={() => setDraft({ ...draft, rating: s })}
                  aria-label={`${s} stars`}
                >
                  ★
                </button>
              ))}
              {(hover || draft.rating) > 0 && (
                <span className="star-label">{STAR_LABELS[hover || draft.rating]}</span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label>Review <span className="char-count">{draft.text.length}/500</span></label>
            <textarea
              placeholder={`What did you think of the ${drinkName}? Did you make any variations?`}
              value={draft.text}
              onChange={(e) => setDraft({ ...draft, text: e.target.value.slice(0, 500) })}
              rows={4}
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-review-btn" disabled={!draft.author || !draft.rating || !draft.text}>
              Post Review
            </button>
            <button type="button" className="cancel-btn" onClick={() => setShowForm(false)}>
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Reviews list */}
      {reviews.length === 0 && !showForm ? (
        <div className="no-reviews">
          <span>🌟</span>
          <p>Be the first to review this drink!</p>
          <button onClick={() => setShowForm(true)} className="write-review-btn">
            Write a review
          </button>
        </div>
      ) : (
        <div className="reviews-list">
          {[...reviews].reverse().map((review) => (
            <div key={review.id} className="review-card">
              <div className="review-card-header">
                <div className="reviewer-info">
                  <span className="reviewer-avatar">{review.avatar}</span>
                  <div>
                    <strong>{review.author}</strong>
                    <span className="review-date">{review.date}</span>
                  </div>
                </div>
                <div className="review-stars">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span key={s} className={s <= review.rating ? 'star-filled' : 'star-empty'}>★</span>
                  ))}
                </div>
              </div>
              <p className="review-text">{review.text}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
