import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { saveCommunityDrink } from '../data/community'
import './CreateDrink.css'

const CATEGORIES = ['cocktail', 'mocktail', 'classic', 'tropical', 'shot', 'wine']
const DIFFICULTIES = ['Easy', 'Medium', 'Hard']
const EMOJIS = ['🍹', '🍸', '🥃', '🍷', '🍺', '🥂', '🌿', '🍓', '🍋', '🍊', '🍉', '🍍', '🌺', '🫐', '☕', '🍵', '💜', '🌊', '🥭', '🍒', '🌸', '🧉', '🍫', '🫖']
const GRADIENTS = [
  'linear-gradient(135deg, #1a4a2e 0%, #0d2b1a 100%)',
  'linear-gradient(135deg, #4a3800 0%, #2b2000 100%)',
  'linear-gradient(135deg, #3d1a00 0%, #1f0d00 100%)',
  'linear-gradient(135deg, #4a0030 0%, #250015 100%)',
  'linear-gradient(135deg, #1a0a4a 0%, #0d0525 100%)',
  'linear-gradient(135deg, #4a1500 0%, #250800 100%)',
  'linear-gradient(135deg, #001a3a 0%, #000d1f 100%)',
  'linear-gradient(135deg, #2a0a4a 0%, #150525 100%)',
  'linear-gradient(135deg, #0a2a10 0%, #051508 100%)',
  'linear-gradient(135deg, #4a0020 0%, #250010 100%)',
  'linear-gradient(135deg, #3a2500 0%, #1d1200 100%)',
  'linear-gradient(135deg, #1a0030 0%, #0d0018 100%)',
]

const STEPS_TOTAL = 4

const emptyIngredient = () => ({ amount: '', item: '' })
const emptyStep = () => ({ title: '', desc: '' })

export default function CreateDrink() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [errors, setErrors] = useState({})

  const [form, setForm] = useState({
    name: '',
    category: 'cocktail',
    alcoholic: true,
    difficulty: 'Easy',
    time: '',
    servings: 1,
    emoji: '🍹',
    gradient: GRADIENTS[0],
    description: '',
    ingredients: [emptyIngredient(), emptyIngredient(), emptyIngredient()],
    steps: [emptyStep(), emptyStep(), emptyStep()],
    tips: ['', '', ''],
    barNote: '',
    creator: { name: '', avatar: '👤', joined: '2026' },
  })

  const set = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }))
    setErrors((e) => ({ ...e, [field]: undefined }))
  }

  // ── Ingredient helpers ──
  const setIngredient = (i, field, value) => {
    const next = [...form.ingredients]
    next[i] = { ...next[i], [field]: value }
    set('ingredients', next)
  }
  const addIngredient = () => set('ingredients', [...form.ingredients, emptyIngredient()])
  const removeIngredient = (i) => set('ingredients', form.ingredients.filter((_, idx) => idx !== i))

  // ── Step helpers ──
  const setMethodStep = (i, field, value) => {
    const next = [...form.steps]
    next[i] = { ...next[i], [field]: value }
    set('steps', next)
  }
  const addMethodStep = () => set('steps', [...form.steps, emptyStep()])
  const removeMethodStep = (i) => set('steps', form.steps.filter((_, idx) => idx !== i))

  // ── Tip helpers ──
  const setTip = (i, value) => {
    const next = [...form.tips]
    next[i] = value
    set('tips', next)
  }
  const addTip = () => set('tips', [...form.tips, ''])
  const removeTip = (i) => set('tips', form.tips.filter((_, idx) => idx !== i))

  // ── Validation per step ──
  const validate = (s) => {
    const errs = {}
    if (s === 1) {
      if (!form.name.trim()) errs.name = 'Drink name is required'
      if (!form.description.trim()) errs.description = 'Description is required'
      if (!form.time.trim()) errs.time = 'Prep time is required'
      if (!form.creator.name.trim()) errs.creatorName = 'Your name is required'
    }
    if (s === 2) {
      const filled = form.ingredients.filter((i) => i.item.trim())
      if (filled.length < 2) errs.ingredients = 'Add at least 2 ingredients'
    }
    if (s === 3) {
      const filled = form.steps.filter((s) => s.desc.trim())
      if (filled.length < 2) errs.steps = 'Add at least 2 method steps'
    }
    return errs
  }

  const next = () => {
    const errs = validate(step)
    if (Object.keys(errs).length) { setErrors(errs); return }
    setStep((s) => Math.min(s + 1, STEPS_TOTAL))
  }
  const back = () => setStep((s) => Math.max(s - 1, 1))

  const handleSubmit = () => {
    const errs = validate(step)
    if (Object.keys(errs).length) { setErrors(errs); return }

    const drink = {
      ...form,
      id: `user_${Date.now()}`,
      community: true,
      createdAt: new Date().toISOString().slice(0, 10),
      rating: 0,
      likes: 0,
      reviews: [],
      ingredients: form.ingredients.filter((i) => i.item.trim()),
      steps: form.steps.filter((s) => s.desc.trim()),
      tips: form.tips.filter(Boolean),
    }

    saveCommunityDrink(drink)
    navigate(`/community/${drink.id}?new=1`)
  }

  const progress = ((step - 1) / (STEPS_TOTAL - 1)) * 100

  return (
    <div className="create-page">
      <div className="create-header">
        <Link to="/community" className="create-back">← Community</Link>
        <h1>Share Your Recipe</h1>
        <p>Create a drink recipe and share it with the Bev community.</p>
      </div>

      {/* Progress */}
      <div className="create-progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
      <div className="create-steps-indicator">
        {['Basics', 'Ingredients', 'Method', 'Finish'].map((label, i) => (
          <div key={label} className={`step-dot ${step > i + 1 ? 'done' : step === i + 1 ? 'active' : ''}`}>
            <div className="dot-circle">{step > i + 1 ? '✓' : i + 1}</div>
            <span>{label}</span>
          </div>
        ))}
      </div>

      <div className="create-body">
        {/* ── Step 1: Basics ── */}
        {step === 1 && (
          <div className="create-section">
            <h2>Basic Information</h2>

            <div className="form-row">
              <div className="form-group">
                <label>Drink Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Mango Jalapeño Fizz"
                  value={form.name}
                  onChange={(e) => set('name', e.target.value)}
                  maxLength={60}
                />
                {errors.name && <span className="field-error">{errors.name}</span>}
              </div>
              <div className="form-group">
                <label>Your Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Sarah M."
                  value={form.creator.name}
                  onChange={(e) => set('creator', { ...form.creator, name: e.target.value })}
                  maxLength={40}
                />
                {errors.creatorName && <span className="field-error">{errors.creatorName}</span>}
              </div>
            </div>

            <div className="form-group">
              <label>Description * <span className="char-count">{form.description.length}/280</span></label>
              <textarea
                placeholder="Tell people what makes this drink special. What's the story behind it?"
                value={form.description}
                onChange={(e) => set('description', e.target.value.slice(0, 280))}
                rows={3}
              />
              {errors.description && <span className="field-error">{errors.description}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Category</label>
                <select value={form.category} onChange={(e) => set('category', e.target.value)}>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Difficulty</label>
                <select value={form.difficulty} onChange={(e) => set('difficulty', e.target.value)}>
                  {DIFFICULTIES.map((d) => <option key={d}>{d}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Prep Time *</label>
                <input
                  type="text"
                  placeholder="e.g. 5 min"
                  value={form.time}
                  onChange={(e) => set('time', e.target.value)}
                  maxLength={12}
                />
                {errors.time && <span className="field-error">{errors.time}</span>}
              </div>
              <div className="form-group">
                <label>Servings</label>
                <input
                  type="number"
                  min={1}
                  max={50}
                  value={form.servings}
                  onChange={(e) => set('servings', Number(e.target.value))}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Type</label>
              <div className="toggle-group">
                <button
                  type="button"
                  className={`toggle-btn ${form.alcoholic ? 'active' : ''}`}
                  onClick={() => set('alcoholic', true)}
                >
                  Alcoholic
                </button>
                <button
                  type="button"
                  className={`toggle-btn ${!form.alcoholic ? 'active' : ''}`}
                  onClick={() => set('alcoholic', false)}
                >
                  Non-Alcoholic
                </button>
              </div>
            </div>

            <div className="form-group">
              <label>Pick an Emoji</label>
              <div className="emoji-picker">
                {EMOJIS.map((e) => (
                  <button
                    key={e}
                    type="button"
                    className={`emoji-btn ${form.emoji === e ? 'selected' : ''}`}
                    onClick={() => set('emoji', e)}
                  >
                    {e}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Pick a Colour Theme</label>
              <div className="gradient-picker">
                {GRADIENTS.map((g, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`gradient-swatch ${form.gradient === g ? 'selected' : ''}`}
                    style={{ background: g }}
                    onClick={() => set('gradient', g)}
                    aria-label={`Colour theme ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Preview card */}
            <div className="preview-label">Preview</div>
            <div className="create-preview-card">
              <div className="preview-visual" style={{ background: form.gradient }}>
                <span>{form.emoji}</span>
              </div>
              <div className="preview-info">
                <span className="preview-name">{form.name || 'Your drink name'}</span>
                <span className="preview-creator">{form.creator.name || 'Your name'}</span>
              </div>
            </div>
          </div>
        )}

        {/* ── Step 2: Ingredients ── */}
        {step === 2 && (
          <div className="create-section">
            <h2>Ingredients</h2>
            <p className="step-desc">List every ingredient with exact amounts. Be specific — your readers will thank you.</p>

            {errors.ingredients && <div className="step-error">{errors.ingredients}</div>}

            <div className="ingredients-builder">
              {form.ingredients.map((ing, i) => (
                <div key={i} className="ingredient-row">
                  <span className="ing-index">{i + 1}</span>
                  <input
                    type="text"
                    placeholder="Amount (e.g. 2 oz, 1 tsp)"
                    value={ing.amount}
                    onChange={(e) => setIngredient(i, 'amount', e.target.value)}
                    className="ing-amount-input"
                    maxLength={20}
                  />
                  <input
                    type="text"
                    placeholder="Ingredient (e.g. Fresh lime juice)"
                    value={ing.item}
                    onChange={(e) => setIngredient(i, 'item', e.target.value)}
                    className="ing-item-input"
                    maxLength={80}
                  />
                  {form.ingredients.length > 2 && (
                    <button type="button" className="remove-btn" onClick={() => removeIngredient(i)} aria-label="Remove">×</button>
                  )}
                </div>
              ))}
            </div>

            <button type="button" className="add-row-btn" onClick={addIngredient}>
              + Add ingredient
            </button>
          </div>
        )}

        {/* ── Step 3: Method ── */}
        {step === 3 && (
          <div className="create-section">
            <h2>Method</h2>
            <p className="step-desc">Break the process into clear, numbered steps. Give each step a short title and a detailed description.</p>

            {errors.steps && <div className="step-error">{errors.steps}</div>}

            <div className="steps-builder">
              {form.steps.map((s, i) => (
                <div key={i} className="method-step-builder">
                  <div className="method-step-num">{i + 1}</div>
                  <div className="method-step-inputs">
                    <input
                      type="text"
                      placeholder="Step title (e.g. Muddle)"
                      value={s.title}
                      onChange={(e) => setMethodStep(i, 'title', e.target.value)}
                      maxLength={40}
                    />
                    <textarea
                      placeholder="Describe this step in detail…"
                      value={s.desc}
                      onChange={(e) => setMethodStep(i, 'desc', e.target.value)}
                      rows={2}
                      maxLength={300}
                    />
                  </div>
                  {form.steps.length > 2 && (
                    <button type="button" className="remove-btn" onClick={() => removeMethodStep(i)} aria-label="Remove">×</button>
                  )}
                </div>
              ))}
            </div>

            <button type="button" className="add-row-btn" onClick={addMethodStep}>
              + Add step
            </button>
          </div>
        )}

        {/* ── Step 4: Tips & Publish ── */}
        {step === 4 && (
          <div className="create-section">
            <h2>Pro Tips & Publish</h2>

            <div className="form-group">
              <label>Pro Tips <span className="optional-label">(optional but recommended)</span></label>
              <p className="field-hint">Short tricks that make this drink noticeably better.</p>
              {form.tips.map((tip, i) => (
                <div key={i} className="tip-row">
                  <input
                    type="text"
                    placeholder={`Tip ${i + 1}…`}
                    value={tip}
                    onChange={(e) => setTip(i, e.target.value)}
                    maxLength={140}
                  />
                  {form.tips.length > 1 && (
                    <button type="button" className="remove-btn" onClick={() => removeTip(i)} aria-label="Remove">×</button>
                  )}
                </div>
              ))}
              <button type="button" className="add-row-btn" onClick={addTip} style={{ marginTop: 8 }}>+ Add tip</button>
            </div>

            <div className="form-group">
              <label>Bar Secret <span className="optional-label">(optional)</span></label>
              <p className="field-hint">The one technique or trick that sets your version apart. Share it!</p>
              <textarea
                placeholder="e.g. The secret is aging the cocktail in the fridge for 24 hours before serving…"
                value={form.barNote}
                onChange={(e) => set('barNote', e.target.value.slice(0, 200))}
                rows={2}
                maxLength={200}
              />
            </div>

            {/* Final preview */}
            <div className="final-preview">
              <h3>Your Recipe Summary</h3>
              <div className="summary-grid">
                <div className="summary-item"><span>Name</span><strong>{form.name}</strong></div>
                <div className="summary-item"><span>Creator</span><strong>{form.creator.name}</strong></div>
                <div className="summary-item"><span>Category</span><strong>{form.category}</strong></div>
                <div className="summary-item"><span>Type</span><strong>{form.alcoholic ? 'Alcoholic' : 'Non-Alcoholic'}</strong></div>
                <div className="summary-item"><span>Prep Time</span><strong>{form.time}</strong></div>
                <div className="summary-item"><span>Difficulty</span><strong>{form.difficulty}</strong></div>
                <div className="summary-item"><span>Ingredients</span><strong>{form.ingredients.filter((i) => i.item).length}</strong></div>
                <div className="summary-item"><span>Steps</span><strong>{form.steps.filter((s) => s.desc).length}</strong></div>
              </div>
            </div>

            {errors.submit && <div className="step-error">{errors.submit}</div>}
          </div>
        )}

        {/* Navigation */}
        <div className="create-nav">
          {step > 1 && (
            <button type="button" className="nav-back-btn" onClick={back}>← Back</button>
          )}
          <div className="nav-right">
            <span className="step-counter">Step {step} of {STEPS_TOTAL}</span>
            {step < STEPS_TOTAL ? (
              <button type="button" className="nav-next-btn" onClick={next}>
                Continue →
              </button>
            ) : (
              <button type="button" className="nav-submit-btn" onClick={handleSubmit}>
                Publish Recipe 🚀
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
