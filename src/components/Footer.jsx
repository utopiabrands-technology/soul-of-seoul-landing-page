import BrandLogo from './BrandLogo.jsx'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top-row">
        <BrandLogo className="footer-logo" />
        <p className="footer-description">Modern Korean skincare rooted in Seoul, pairing heritage-led ingredients with<br className="footer-desktop-break" /> purposeful modern formulation for hydration, clarity, bounce and luminosity.</p>
        <a className="glass-shop-button footer-shop-button" href="#shop">SHOP NOW <span aria-hidden="true">↗</span></a>
      </div>

      <div className="footer-links">
        <div><a href="#our-story">Our Story</a><a href="#philosophy">Our Philosophy</a><a href="#masks">Hydrogel Masks</a><a href="#toner-pads">Toner Pads</a></div>
        <div className="footer-legal-links"><a href="#">Contact Us</a><a href="#">Privacy Policy</a><a href="#">Terms of Use</a></div>
        <div className="footer-social-links"><a href="https://www.instagram.com/soulofseoulbeauty/" target="_blank" rel="noreferrer">Instagram</a><a href="https://www.facebook.com/soulofseoulbeauty/" target="_blank" rel="noreferrer">Facebook</a></div>
      </div>

      <div className="footer-bottom"><span>© 2026 Soul of Seoul. All rights reserved.</span><a href="#top">Back to top ↑</a></div>
    </footer>
  )
}
