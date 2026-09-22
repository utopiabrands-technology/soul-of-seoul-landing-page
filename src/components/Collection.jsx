const COLLECTION = [
  {
    eyebrow: 'MASKS',
    title: 'Hydrogel Masks',
    body: 'Four formulas for distinct skin concerns.',
    image: '/assets/site/collection-hydrogel-mask-v2.png',
    href: '#masks',
    cta: 'Explore Masks',
    className: 'collection-card--mask',
  },
  {
    eyebrow: 'TONER PADS',
    title: 'Daily Toner Pads',
    body: 'Targeted daily care in an easy-to-use format.',
    image: '/assets/site/collection-toner-pads-v2.png',
    href: '#toner-pads',
    cta: 'Explore Toner Pads',
    className: 'collection-card--toner',
  },
]

function ProductCard({ item }) {
  const handlePointer = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--mx', `${((event.clientX - rect.left) / rect.width) * 100}%`)
    event.currentTarget.style.setProperty('--my', `${((event.clientY - rect.top) / rect.height) * 100}%`)
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2
    event.currentTarget.style.setProperty('--tilt-x', `${x * 4}deg`)
    event.currentTarget.style.setProperty('--tilt-y', `${y * -4}deg`)
  }

  return (
    <a className={`collection-card liquid-card ${item.className || ''}`} href={item.href} onPointerMove={handlePointer} onPointerLeave={(event) => {
      event.currentTarget.style.setProperty('--tilt-x', '0deg')
      event.currentTarget.style.setProperty('--tilt-y', '0deg')
    }}>
      <img src={item.image} alt="" className="collection-card-image" />
      <div className="liquid-sheen" aria-hidden="true" />
      <div className="collection-card-content">
        <p>{item.eyebrow}</p>
        <h3>{item.title}</h3>
        <span className="collection-copy">{item.body}</span>
        <span className="collection-cta">{item.cta} <b aria-hidden="true">↗</b></span>
      </div>
    </a>
  )
}

export default function Collection() {
  return (
    <section id="collection" className="collection-section section-shell">
      <div className="section-heading-row">
        <div>
          <p className="section-kicker">THE COLLECTION</p>
          <h2>Targeted care.<br />Designed around your skin.</h2>
        </div>
        <p className="section-intro">Explore the first Soul of Seoul formulas, created around distinct skin needs and thoughtful ingredient combinations.</p>
      </div>

      <div className="collection-grid">
        {COLLECTION.map((item) => <ProductCard key={item.title} item={item} />)}
        <div className="collection-card coming-card" aria-label="Coming soon product family">
          <img src="/assets/site/coming-soon.jpg" alt="Blurred skincare product teaser" className="collection-card-image" />
          <div className="coming-fade" />
          <div className="collection-card-content">
            <p>COMING SOON</p>
            <h3>The Range Continues</h3>
            <span className="collection-copy">New formulas are taking shape.</span>
            <span className="collection-cta">Explore Soon <b aria-hidden="true">↗</b></span>
          </div>
        </div>
      </div>
    </section>
  )
}
