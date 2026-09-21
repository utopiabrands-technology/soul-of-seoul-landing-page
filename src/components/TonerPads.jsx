import ProductVariations from './ProductVariations.jsx'
import { useState } from 'react'

const TONERS = [
  {
    tab: 'EXFOLIATING',
    name: 'Dual Exfoliating Toner Pad',
    cta: 'SHOP EXFOLIATING',
    visual: '/assets/site/toner-exfoliating-main.png',
    previewImage: '/assets/site/vitamin-c.jpg',
    previewLabel: 'INSIDE THE FORMULA',
    previewTitle: 'Vitamin C Complex',
    previewText: 'Explore the selected key ingredient.',
  },
  {
    tab: 'COLLAGEN + PEPTIDE',
    name: 'Collagen + Peptide Toner Pads',
    cta: 'SHOP COLLAGEN + PEPTIDE',
    visual: '/assets/site/toner-collagen-main.png',
    previewImage: '/assets/site/vitamin-c.jpg',
    previewLabel: 'INSIDE THE FORMULA',
    previewTitle: 'Vitamin C Complex',
    previewText: 'Explore the selected key ingredient.',
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

export default function TonerPads() {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = TONERS[activeIndex]

  return (
    <section id="toner-pads" className="product-detail-section toner-section section-shell">
      <div className="product-section-top">
        <div>
          <p className="section-kicker">TONER PADS</p>
          <h2>Choose Your Toner Pad</h2>
        </div>
        <p>Targeted everyday formulas designed to make focused skincare easier to use.</p>
      </div>

      <ProductVariations items={TONERS} activeIndex={activeIndex} onChange={setActiveIndex} label="Toner pad types">

      <div className="toner-layout">
        <div className="toner-visual">
          <img key={active.visual} className="toner-model" src={active.visual} alt={`${active.name} beauty visual`} />
          <div className="ingredient-preview toner-preview-match glass-panel perspective-tilt-card" onPointerMove={applyTilt} onPointerLeave={resetTilt}>
            <img key={active.previewImage} src={active.previewImage} alt={`${active.previewTitle} visual reference`} />
            <div>
              <span>{active.previewLabel}</span>
              <strong>{active.previewTitle}</strong>
              <small>{active.previewText}</small>
            </div>
          </div>
        </div>

        <div className="product-copy-panel glass-panel">
          <p className="product-category">{active.tab}</p>
          <h3>{active.name}</h3>
          <p className="product-description pending-copy">Product benefit, key ingredients, skin concern and usage are pending final approved product information.</p>

          <div className="pending-grid">
            <div><span>KEY INGREDIENTS</span><p>Pending final approval</p></div>
            <div><span>BEST FOR</span><p>Pending final approval</p></div>
            <div><span>USE</span><p>Pending final approval</p></div>
          </div>

          <a className="glass-shop-button" href="#shop">{active.cta} <span aria-hidden="true">↗</span></a>
        </div>
      </div>
      </ProductVariations>
    </section>
  )
}
