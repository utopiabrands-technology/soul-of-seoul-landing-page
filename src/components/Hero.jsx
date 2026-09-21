import { useEffect, useRef, useState } from 'react'
import CondensationCanvas from './CondensationCanvas.jsx'
import BrandLogo from './BrandLogo.jsx'

export default function Hero() {
  const heroRef = useRef(null)
  const copyRef = useRef(null)
  const navRef = useRef(null)
  const toggleRef = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!menuOpen) return
    const closeOutside = (event) => {
      if (!navRef.current?.contains(event.target)) setMenuOpen(false)
    }
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') { setMenuOpen(false); toggleRef.current?.focus() }
    }
    const desktop = window.matchMedia('(min-width: 981px)')
    const closeOnResize = () => { if (desktop.matches) setMenuOpen(false) }
    document.addEventListener('pointerdown', closeOutside)
    document.addEventListener('keydown', closeOnEscape)
    desktop.addEventListener('change', closeOnResize)
    return () => {
      document.removeEventListener('pointerdown', closeOutside)
      document.removeEventListener('keydown', closeOnEscape)
      desktop.removeEventListener('change', closeOnResize)
    }
  }, [menuOpen])

  return (
    <section className="hero-shell" aria-label="Soul of Seoul interactive hero">
      <div ref={heroRef} className="hero" id="hero">
        <div className="hero-bg" />
        <CondensationCanvas heroRef={heroRef} copyRef={copyRef} />

        <header ref={navRef} className="nav">
          <a className="brand" href="#top" aria-label="Soul of Seoul home">
            <BrandLogo />
          </a>
          <nav className="links" aria-label="Primary navigation">
            <a href="#our-story">Our Story</a>
            <a href="#philosophy">Our Philosophy</a>
            <a href="#masks">Hydrogel Masks</a>
            <a href="#toner-pads">Toner Pads</a>
            <div className="range-menu">
              <button className="range-trigger" type="button" aria-haspopup="true">The Range <span className="range-arrow" aria-hidden="true" /></button>
              <div className="range-dropdown">
                <a href="#masks"><strong>Hydrogel Masks</strong><small>Four targeted formulas</small></a>
                <a href="#toner-pads"><strong>Toner Pads</strong><small>Targeted daily care</small></a>
                <a href="#collection"><strong>Coming Soon</strong><small>More formulas in development</small></a>
              </div>
            </div>
          </nav>
          <a className="navbtn hero-glass-cta" href="#shop">SHOP NOW <span aria-hidden="true">↗</span></a>
          <button ref={toggleRef} className="mobile-menu-toggle" type="button"
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={menuOpen} aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}>
            <span aria-hidden="true">{menuOpen ? '×' : '☰'}</span>
          </button>
          <nav id="mobile-navigation" className="mobile-navigation" aria-label="Mobile navigation" hidden={!menuOpen}
            onClick={(event) => { if (event.target.closest('a')) setMenuOpen(false) }}>
            <a href="#our-story">Our Story</a>
            <a href="#philosophy">Our Philosophy</a>
            <a href="#masks">Hydrogel Masks</a>
            <a href="#toner-pads">Toner Pads</a>
            <a href="#collection">The Range</a>
          </nav>
        </header>

        <div ref={copyRef} className="copy" id="copy">
          <p className="eyebrow">THE GLASS SKIN CONCEPT</p>
          <h1><span className="hero-initial">S</span>trong Beneath.<br />Luminous Above.</h1>
          <p className="body">
            <span className="body-line">Modern Korean skincare, built on the philosophy of Glass Skin:</span>
            <span className="body-line">strength at the root, glow where it shows.</span>
          </p>
          <a className="cta hero-glass-cta" href="#shop">SHOP NOW <span>↗</span></a>
        </div>

        <div className="scroll"><span>SCROLL TO REVEAL</span><i /></div>
      </div>
    </section>
  )
}
