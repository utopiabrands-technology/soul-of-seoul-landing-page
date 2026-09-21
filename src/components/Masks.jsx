import ProductVariations from './ProductVariations.jsx'
import { useMemo, useState } from 'react'

const INGREDIENT_IMAGES = {
  'Hyaluronic Acid': '/assets/site/hyaluronic.jpg',
  'Vitamin B5': '/assets/site/vitamin-b5.png',
  'Saffron Crocus Extract': '/assets/site/saffron.jpg',
  Collagen: '/assets/site/collagen.jpg',
  'Vitamin E': '/assets/site/vitamin-e.jpg',
  Niacinamide: '/assets/site/niacinamide.png',
  Adenosine: '/assets/site/adenosine.png',
  'Vitamin C Complex': '/assets/site/vitamin-c.jpg',
  'Sodium DNA (PDRN)': '/assets/site/sodium-pdrn.png',
  'Licorice Calm Complex': '/assets/site/licorice.jpg',
}

const MASKS = [
  {
    tab: 'HYDRATION',
    name: 'Hyaluronic Hydration Mask',
    description: 'Replenishes moisture and helps dry, sensitive-feeling skin feel soothed and plump.',
    ingredients: ['Hyaluronic Acid', 'Vitamin B5', 'Saffron Crocus Extract', 'Collagen'],
    bestFor: 'Dryness · Dehydration · Sensitivity',
    use: '20-30 Minutes',
    cta: 'SHOP HYDRATION',
    model: '/assets/site/mask-close.png',
  },
  {
    tab: 'FIRMNESS',
    name: 'Collagen Mask',
    description: 'Supports firmness and elasticity for a smoother, bouncier and plumper-looking finish.',
    ingredients: ['Collagen', 'Hyaluronic Acid', 'Vitamin E'],
    bestFor: 'Loss of Firmness · Early Signs of Aging · Reduced Bounce',
    use: '20-30 Minutes',
    cta: 'SHOP FIRMNESS',
    model: '/assets/site/mask-model.png',
  },
  {
    tab: 'BRIGHTENING',
    name: 'Niacinamide Mask',
    description: 'Helps brighten uneven-looking tone and reduce the appearance of visible pores.',
    ingredients: ['Niacinamide', 'Adenosine', 'Vitamin C Complex', 'Hyaluronic Acid'],
    bestFor: 'Dullness · Uneven Tone · Visible Pores',
    use: '20-30 Minutes',
    cta: 'SHOP BRIGHTENING',
    model: '/assets/site/mask-hands.jpg',
  },
  {
    tab: 'CALM + BARRIER CARE',
    name: 'PDRN Mask',
    description: 'Helps calm stressed-looking skin and support a more comfortable, replenished appearance.',
    ingredients: ['Sodium DNA (PDRN)', 'Licorice Calm Complex', 'Collagen', 'Vitamin E'],
    bestFor: 'Barrier Stress · Visible Irritation · Tired-Looking Skin',
    use: '20-30 Minutes',
    cta: 'SHOP PDRN',
    model: '/assets/site/mask-calm.png',
  },
]

function applyTilt(event) {
  if (event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const rect = event.currentTarget.getBoundingClientRect()
  const x = (event.clientX - rect.left) / rect.width - 0.5
  const y = (event.clientY - rect.top) / rect.height - 0.5
  event.currentTarget.style.setProperty('--card-rx', `${y * -8}deg`)
  event.currentTarget.style.setProperty('--card-ry', `${x * 10}deg`)
  event.currentTarget.style.setProperty('--card-mx', `${(x + 0.5) * 100}%`)
  event.currentTarget.style.setProperty('--card-my', `${(y + 0.5) * 100}%`)
}

function resetTilt(event) {
  event.currentTarget.style.setProperty('--card-rx', '0deg')
  event.currentTarget.style.setProperty('--card-ry', '0deg')
  event.currentTarget.style.setProperty('--card-mx', '50%')
  event.currentTarget.style.setProperty('--card-my', '50%')
}

export default function Masks() {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = MASKS[activeIndex]
  const [ingredient, setIngredient] = useState(active.ingredients[0])

  const ingredientImage = useMemo(() => INGREDIENT_IMAGES[ingredient] || '/assets/site/hyaluronic.jpg', [ingredient])

  const chooseMask = (index) => {
    setActiveIndex(index)
    setIngredient(MASKS[index].ingredients[0])
  }

  return (
    <section id="masks" className="product-detail-section masks-section section-shell">
      <div className="product-section-top">
        <div>
          <p className="section-kicker">HYDROGEL MASKS</p>
          <h2>Choose Your Mask</h2>
        </div>
        <p>Four targeted formulas. Choose the one made for what your skin needs today.</p>
      </div>

      <ProductVariations items={MASKS} activeIndex={activeIndex} onChange={chooseMask} label="Mask types">

      <div className="product-experience">
        <div className="product-visual-stack">
          <div className="product-main-image"><img key={active.name} src={active.model} alt={`Beauty reference for ${active.name}`} /></div>
          <div className="ingredient-preview glass-panel perspective-tilt-card" onPointerMove={applyTilt} onPointerLeave={resetTilt}>
            <img key={ingredientImage} src={ingredientImage} alt={`${ingredient} visual reference`} />
            <div><span>INSIDE THE FORMULA</span><strong>{ingredient}</strong><small>Explore the selected key ingredient.</small></div>
          </div>
        </div>

        <div className="product-copy-panel glass-panel">
          <p className="product-category">{active.tab}</p>
          <h3>{active.name}</h3>
          <p className="product-description">{active.description}</p>

          <div className="product-meta-block">
            <span>KEY INGREDIENTS</span>
            <div className="ingredient-buttons">
              {active.ingredients.map((item) => (
                <button key={item} type="button" className={ingredient === item ? 'is-active' : ''} onMouseEnter={() => setIngredient(item)} onFocus={() => setIngredient(item)} onClick={() => setIngredient(item)}>{item}</button>
              ))}
            </div>
          </div>

          <div className="product-facts">
            <div><span>BEST FOR</span><p>{active.bestFor}</p></div>
            <div><span>USE</span><p>{active.use}</p></div>
          </div>

          <a className="glass-shop-button" href="#shop">{active.cta} <span aria-hidden="true">↗</span></a>
        </div>
      </div>
      </ProductVariations>
    </section>
  )
}
