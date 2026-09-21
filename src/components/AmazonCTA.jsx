function applyTilt(event) {
  const rect = event.currentTarget.getBoundingClientRect()
  const x = (event.clientX - rect.left) / rect.width - 0.5
  const y = (event.clientY - rect.top) / rect.height - 0.5
  event.currentTarget.style.setProperty('--amazon-rx', `${y * -2}deg`)
  event.currentTarget.style.setProperty('--amazon-ry', `${x * 2.5}deg`)
  event.currentTarget.style.setProperty('--amazon-mx', `${(x + 0.5) * 100}%`)
  event.currentTarget.style.setProperty('--amazon-my', `${(y + 0.5) * 100}%`)
}

function resetTilt(event) {
  event.currentTarget.style.setProperty('--amazon-rx', '0deg')
  event.currentTarget.style.setProperty('--amazon-ry', '0deg')
  event.currentTarget.style.setProperty('--amazon-mx', '50%')
  event.currentTarget.style.setProperty('--amazon-my', '50%')
}

export default function AmazonCTA() {
  return (
    <section id="shop" className="amazon-section section-shell">
      <div className="amazon-visual">
        <img src="/assets/site/amazon-skin.png" alt="Luminous close-up beauty portrait" />
        <div className="amazon-glass glass-panel amazon-inner-tilt" onPointerMove={applyTilt} onPointerLeave={resetTilt}>
          <p className="section-kicker">SHOP SOUL OF SEOUL</p>
          <h2>Visit the Amazon Storefront</h2>
          <p>Explore current availability and discover the latest additions to the Soul of Seoul collection.</p>
          <a className="glass-shop-button light" href="#" aria-label="Discover Soul of Seoul on Amazon">DISCOVER NOW <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </section>
  )
}
