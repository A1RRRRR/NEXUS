import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Subscription.css'

const plans = [
  {
    id: 'basic',
    name: 'Basic',
    price: 49.9,
    badge: null,
    tagline: 'Everything you need to get started',
    features: [
      '100+ cocktail & mocktail recipes',
      'Step-by-step method guides',
      'Ingredient scaling (1–8 servings)',
      'Alcoholic & non-alcoholic recipes',
      'Category & difficulty filtering',
      'New recipes added monthly',
      'Email support',
    ],
    notIncluded: [
      'Advanced & pro-level recipes',
      'Batch cocktail guides',
      'Exclusive bar secrets',
      'Video walkthroughs',
    ],
    cta: 'Start Basic — $49.90/mo',
    color: 'var(--accent-amber)',
  },
  {
    id: 'advanced',
    name: 'Advanced',
    price: 79.9,
    badge: 'Most Popular',
    tagline: 'The complete bartender experience',
    features: [
      'Everything in Basic',
      '200+ recipes including advanced & pro-level',
      'Exclusive bar secrets on every drink',
      'Batch cocktail guides (10–50 servings)',
      'Video walkthroughs for every recipe',
      'Flavour pairing guides',
      'Seasonal & event-specific collections',
      'Priority support',
      'Early access to new recipes',
    ],
    notIncluded: [],
    cta: 'Start Advanced — $79.90/mo',
    color: 'var(--accent-gold)',
  },
]

const faqs = [
  {
    q: 'Can I cancel anytime?',
    a: 'Yes. Cancel from your account settings at any time. Your subscription remains active until the end of the billing period with no further charges.',
  },
  {
    q: 'Is there a free trial?',
    a: 'Yes — both plans include a 14-day free trial. No charge until the trial ends, and you can cancel before then with no cost.',
  },
  {
    q: 'What\'s the difference between Basic and Advanced?',
    a: 'Basic covers 100+ everyday cocktails and mocktails with step-by-step instructions. Advanced unlocks the full library of 200+ recipes including professional-level techniques, batch guides for parties, bar secrets, and video walkthroughs.',
  },
  {
    q: 'Do I need any special equipment?',
    a: 'Not to start. Most recipes work with a mason jar or even a cup, a spoon, and a fine strainer. Advanced recipes may recommend a cocktail shaker and mixing glass, but we always suggest substitutes.',
  },
  {
    q: 'Are the mocktails as good as the cocktails?',
    a: 'Absolutely — our mocktails are designed to stand on their own as serious, sophisticated drinks, not just juice with ice. We treat non-alcoholic recipes with the same care as cocktails.',
  },
  {
    q: 'Can I switch plans?',
    a: 'Yes. Upgrade or downgrade at any time from your account settings. Upgrades are prorated to the day.',
  },
]

export default function Subscription() {
  const [openFaq, setOpenFaq] = useState(null)
  const [annual, setAnnual] = useState(false)

  const getPrice = (price) => {
    if (!annual) return price.toFixed(2)
    return (price * 0.8).toFixed(2)
  }

  return (
    <div className="sub-page">
      <div className="sub-hero">
        <div className="sub-hero-glow" />
        <div className="sub-eyebrow">Simple Pricing</div>
        <h1>Choose your plan</h1>
        <p>Start free for 14 days. No credit card required until you choose to continue.</p>

        <div className="billing-toggle">
          <span className={!annual ? 'active' : ''}>Monthly</span>
          <button
            className={`toggle-switch ${annual ? 'on' : ''}`}
            onClick={() => setAnnual(!annual)}
            aria-label="Toggle annual billing"
          >
            <span className="toggle-knob" />
          </button>
          <span className={annual ? 'active' : ''}>
            Annual
            <span className="save-badge">Save 20%</span>
          </span>
        </div>
      </div>

      {/* Plans */}
      <div className="plans-container">
        <div className="plans-grid">
          {plans.map((plan) => (
            <div key={plan.id} className={`plan-card ${plan.badge ? 'plan-card-featured' : ''}`}>
              {plan.badge && <div className="plan-badge">{plan.badge}</div>}
              <div className="plan-header">
                <h2 className="plan-name">{plan.name}</h2>
                <p className="plan-tagline">{plan.tagline}</p>
                <div className="plan-price">
                  <span className="price-currency">$</span>
                  <span className="price-amount">{getPrice(plan.price)}</span>
                  <span className="price-period">/ month</span>
                </div>
                {annual && (
                  <p className="price-annual-note">Billed as ${(plan.price * 0.8 * 12).toFixed(2)}/year</p>
                )}
              </div>

              <Link to="#" className={`plan-cta ${plan.badge ? 'plan-cta-primary' : 'plan-cta-secondary'}`}>
                {plan.cta}
              </Link>
              <p className="plan-trial-note">14-day free trial · Cancel anytime</p>

              <div className="plan-features">
                <ul>
                  {plan.features.map((f) => (
                    <li key={f} className="feature-yes">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      {f}
                    </li>
                  ))}
                  {plan.notIncluded.map((f) => (
                    <li key={f} className="feature-no">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Compare table */}
      <div className="compare-section">
        <div className="compare-inner">
          <h2>Full comparison</h2>
          <div className="compare-table">
            <div className="compare-row compare-header">
              <div className="compare-feature">Feature</div>
              <div className="compare-plan">Basic</div>
              <div className="compare-plan featured-col">Advanced</div>
            </div>
            {[
              ['Recipes', '100+', '200+'],
              ['Alcoholic drinks', '✓', '✓'],
              ['Non-alcoholic drinks', '✓', '✓'],
              ['Step-by-step instructions', '✓', '✓'],
              ['Ingredient scaling', '✓', '✓'],
              ['Monthly new recipes', '✓', '✓'],
              ['Pro-level recipes', '—', '✓'],
              ['Exclusive bar secrets', '—', '✓'],
              ['Batch cocktail guides', '—', '✓'],
              ['Video walkthroughs', '—', '✓'],
              ['Flavour pairing guides', '—', '✓'],
              ['Priority support', '—', '✓'],
              ['Early access', '—', '✓'],
            ].map(([feature, basic, advanced]) => (
              <div className="compare-row" key={feature}>
                <div className="compare-feature">{feature}</div>
                <div className="compare-plan">{basic === '✓'
                  ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6fcf97" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  : basic === '—'
                  ? <span className="no-feature">—</span>
                  : <span>{basic}</span>}
                </div>
                <div className="compare-plan featured-col">{advanced === '✓'
                  ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d4a017" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  : <span className="advanced-value">{advanced}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="testimonials-section">
        <div className="testimonials-inner">
          <h2>What home bartenders say</h2>
          <div className="testimonials-grid">
            {[
              {
                quote: "I made a Negroni that my bartender friend said was better than most bars serve. I\'m never going back to mediocre home drinks.",
                name: 'Marcus T.',
                role: 'Advanced subscriber · 8 months',
              },
              {
                quote: "The mocktail recipes are stunning. I host dinner parties weekly and everyone always asks who made the drinks. The answer is always Bev.",
                name: 'Sofia L.',
                role: 'Basic subscriber · 1 year',
              },
              {
                quote: "The ingredient scaling feature alone is worth the subscription. I scaled a Margarita recipe to 30 servings for my sister\'s wedding. Perfect.",
                name: 'Derek P.',
                role: 'Advanced subscriber · 6 months',
              },
            ].map((t) => (
              <div key={t.name} className="testimonial-card">
                <div className="testimonial-stars">{'★'.repeat(5)}</div>
                <p className="testimonial-quote">"{t.quote}"</p>
                <div className="testimonial-author">
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className="faq-section">
        <div className="faq-inner">
          <h2>Frequently asked questions</h2>
          <div className="faq-list">
            {faqs.map((faq, i) => (
              <div key={i} className={`faq-item ${openFaq === i ? 'open' : ''}`}>
                <button
                  className="faq-question"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  {faq.q}
                  <svg
                    className="faq-chevron"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>
                <div className="faq-answer">
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="sub-final-cta">
        <div className="sub-final-cta-inner">
          <h2>Start drinking well today</h2>
          <p>Join 50,000+ home bartenders. Cancel anytime. 14-day free trial on all plans.</p>
          <div className="final-cta-actions">
            <Link to="#" className="btn-primary btn-large">Start Free Trial</Link>
            <Link to="/recipes" className="btn-ghost">Browse recipes first →</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
