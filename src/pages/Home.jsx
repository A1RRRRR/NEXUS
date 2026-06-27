import { Link } from 'react-router-dom'
import { drinks } from '../data/drinks'
import DrinkCard from '../components/DrinkCard'
import './Home.css'

const FEATURED = [1, 3, 6, 13].map((id) => drinks.find((d) => d.id === id))

const features = [
  {
    emoji: '🍸',
    title: 'Bar-Level Quality',
    desc: 'Every recipe is crafted using the exact techniques and ratios used by professional bartenders at top restaurants.',
  },
  {
    emoji: '📋',
    title: 'Step-by-Step Guidance',
    desc: 'Detailed instructions with pro tips, bar secrets, and common mistakes to avoid — no experience required.',
  },
  {
    emoji: '🍹',
    title: '200+ Recipes',
    desc: 'Cocktails, mocktails, shots, tropical, classics, and wine-based drinks. Something for every occasion.',
  },
  {
    emoji: '🌿',
    title: 'Alcoholic & Non-Alcoholic',
    desc: 'World-class mocktails sit alongside premium cocktail recipes. Everyone at the table is covered.',
  },
]

const stats = [
  { value: '200+', label: 'Drink Recipes' },
  { value: '50k+', label: 'Home Bartenders' },
  { value: '4.9', label: 'Average Rating' },
  { value: '98%', label: 'Would Recommend' },
]

export default function Home() {
  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-glow hero-glow-1" />
          <div className="hero-glow hero-glow-2" />
        </div>
        <div className="hero-content">
          <div className="hero-eyebrow">The Home Bartender's Companion</div>
          <h1 className="hero-title">
            Craft <em>restaurant-level</em><br />drinks at home
          </h1>
          <p className="hero-subtitle">
            From a classic Mojito to a perfectly stirred Manhattan — Bev gives you the exact recipes, techniques, and bar secrets that professional bartenders use. No experience needed.
          </p>
          <div className="hero-actions">
            <Link to="/subscribe" className="btn-primary">Start Free Trial</Link>
            <Link to="/recipes" className="btn-ghost">Browse Recipes</Link>
          </div>
          <p className="hero-note">14-day free trial · Cancel anytime · No equipment needed</p>
        </div>
        <div className="hero-drinks-preview">
          <div className="preview-card preview-card-1">
            <span>🍸</span>
            <span>Negroni</span>
          </div>
          <div className="preview-card preview-card-2">
            <span>🌿</span>
            <span>Mojito</span>
          </div>
          <div className="preview-card preview-card-3">
            <span>🥃</span>
            <span>Old Fashioned</span>
          </div>
          <div className="preview-card preview-card-4">
            <span>🍋</span>
            <span>Margarita</span>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-section">
        <div className="stats-inner">
          {stats.map((s) => (
            <div key={s.label} className="stat-item">
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="features-section">
        <div className="section-container">
          <div className="section-header">
            <h2>Everything you need to drink well</h2>
            <p>Bev turns your kitchen into a world-class bar, one drink at a time.</p>
          </div>
          <div className="features-grid">
            {features.map((f) => (
              <div key={f.title} className="feature-card">
                <div className="feature-emoji">{f.emoji}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured drinks */}
      <section className="featured-section">
        <div className="section-container">
          <div className="section-header">
            <h2>Fan favourites</h2>
            <p>The drinks our community can't stop making.</p>
          </div>
          <div className="featured-grid">
            {FEATURED.map((drink) => (
              <DrinkCard key={drink.id} drink={drink} />
            ))}
          </div>
          <div className="section-cta">
            <Link to="/recipes" className="btn-outline">View all recipes →</Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="how-section">
        <div className="section-container">
          <div className="section-header">
            <h2>How Bev works</h2>
            <p>Three steps from sign-up to your first perfect drink.</p>
          </div>
          <div className="steps">
            <div className="step">
              <div className="step-number">01</div>
              <h3>Choose your drink</h3>
              <p>Browse 200+ recipes filtered by category, difficulty, and whether it's alcoholic or not. Find something for every occasion.</p>
            </div>
            <div className="step-connector" />
            <div className="step">
              <div className="step-number">02</div>
              <h3>Follow the steps</h3>
              <p>Each recipe breaks down into clear, ordered steps with exact measurements, timing, and the reasoning behind every technique.</p>
            </div>
            <div className="step-connector" />
            <div className="step">
              <div className="step-number">03</div>
              <h3>Drink like a pro</h3>
              <p>Bar secrets, pro tips, and garnish guides elevate your home bar to restaurant quality. Impress anyone.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner">
        <div className="cta-banner-inner">
          <div className="cta-banner-glow" />
          <h2>Ready to become a home bartender?</h2>
          <p>Join 50,000+ people who make bar-level drinks at home every week.</p>
          <Link to="/subscribe" className="btn-primary btn-large">View Plans & Pricing</Link>
        </div>
      </section>
    </div>
  )
}
