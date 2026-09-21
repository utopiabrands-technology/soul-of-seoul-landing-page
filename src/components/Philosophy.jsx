import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PILLARS = [
  {
    index: '01',
    nav: 'Heritage',
    title: 'Heritage, Refined',
    subhead: 'Korean skincare wisdom. Modern formulation.',
    body: 'Soul of Seoul brings together heritage-led ingredients such as Yuja, licorice, traditional botanicals and barrier-first thinking with contemporary actives, stabilization, precision dosing and advanced delivery systems.',
    images: ['/assets/site/licorice.jpg', '/assets/site/heritage-second.png'],
  },
  {
    index: '02',
    nav: 'Glass Skin',
    title: 'Glass Skin, Built Beneath',
    subhead: 'Radiance begins with healthier-looking skin.',
    body: 'The brand’s glass-skin philosophy is not about surface shine. It is built around hydration, barrier support, clarity, bounce and luminosity - the idea that radiance is the visible result of consistent care.',
    images: ['/assets/site/hyaluronic.jpg', '/assets/site/collagen.jpg'],
  },
  {
    index: '03',
    nav: 'Design',
    title: 'Targeted by Design',
    subhead: 'Purposeful actives. Thoughtful combinations.',
    body: 'Across the range, formulas are built around specific skin needs - hydration, firmness, brightness, barrier recovery, texture and redness with combinations such as collagen + hyaluronic acid, niacinamide + vitamin C, PDRN + licorice, and Yuja + multi-form vitamin C.',
    images: ['/assets/site/pdrn.jpg', '/assets/site/targeted-pic-2.png'],
  },
]

export default function Philosophy() {
  const sectionRef = useRef(null)
  const stageRef = useRef(null)
  const mobileProgressRef = useRef(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const media = gsap.matchMedia()
    media.add({ desktop: '(min-width: 821px)', reducedMotion: '(prefers-reduced-motion: reduce)' }, (context) => {
      if (!context.conditions.desktop) return
      const update = (self) => {
        const index = Math.min(PILLARS.length - 1, Math.floor(self.progress * PILLARS.length))
        setActive(index)
        const stage = stageRef.current
        if (!stage) return
        stage.style.setProperty('--philosophy-progress', self.progress.toFixed(4))
        stage.style.setProperty('--parallax-a', context.conditions.reducedMotion ? '0px' : `${(self.progress - 0.5) * -120}px`)
        stage.style.setProperty('--parallax-b', context.conditions.reducedMotion ? '0px' : `${(self.progress - 0.5) * 90}px`)
      }
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.32,
        invalidateOnRefresh: true,
        onUpdate: update,
        onRefresh: update,
      })
    }, sectionRef)

    media.add('(max-width: 820px)', () => {
      const updateMobileProgress = (self) => {
        const progress = mobileProgressRef.current
        if (!progress) return
        const amount = self.progress
        const index = Math.min(PILLARS.length - 1, Math.floor(amount * PILLARS.length))

        progress.style.setProperty('--mobile-philosophy-progress', amount.toFixed(4))
        setActive((current) => current === index ? current : index)
      }

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.32,
        invalidateOnRefresh: true,
        onUpdate: updateMobileProgress,
        onRefresh: updateMobileProgress,
      })
    }, sectionRef)

    return () => media.revert()
  }, [])

  return (
    <section ref={sectionRef} id="philosophy" className="philosophy-scroll">
      <div ref={stageRef} className="philosophy-stage">
        <div className="philosophy-pattern philosophy-pattern-right" aria-hidden="true"><img src="/assets/site/diagonal-lines.png" /></div>
        <div className="philosophy-backdrop" aria-hidden="true">
          {PILLARS.map((pillar, index) => (
            <div key={pillar.index} className={`philosophy-media ${index === active ? 'is-active' : ''}`}>
              <div className="philosophy-media-left"><img src={pillar.images[0]} alt="" /></div>
              <div className="philosophy-media-right"><img src={pillar.images[1]} alt="" /></div>
            </div>
          ))}
          <div className="philosophy-glass-orb" />
        </div>

        <div className="philosophy-header">
          <p className="section-kicker">OUR PHILOSOPHY</p>
          <h2>Old Ritual.<br />New Science.</h2>
          <div className="philosophy-intro" key={PILLARS[active].index}>
            <p><strong>{PILLARS[active].subhead}</strong></p>
            <p>{PILLARS[active].body}</p>
          </div>
        </div>

        <div className="philosophy-progress" aria-label={`Philosophy item ${active + 1} of ${PILLARS.length}`}>
          {PILLARS.map((pillar, index) => (
            <button
              key={pillar.index}
              type="button"
              className={index === active ? 'is-active' : ''}
              onClick={() => setActive(index)}
              aria-label={`Show ${pillar.title}`}
            >
              <span>{pillar.index}/</span>
              <small>{pillar.nav}</small>
            </button>
          ))}
        </div>
      </div>

      <div className="philosophy-mobile">
        <div className="philosophy-mobile-stage section-shell">
          <p className="section-kicker">OUR PHILOSOPHY</p>
          <h2>Old Ritual. New Science.</h2>

          <div ref={mobileProgressRef} className="philosophy-mobile-progress" aria-label={`Philosophy progress: ${PILLARS[active].nav}, item ${active + 1} of ${PILLARS.length}`}>
            <span>{PILLARS[active].index} / {PILLARS.length.toString().padStart(2, '0')}</span>
            <div className="philosophy-mobile-progress-track" aria-hidden="true"><i /></div>
            <small>{PILLARS[active].nav}</small>
          </div>

          <div className="philosophy-mobile-list">
            {PILLARS.map((pillar, index) => (
              <article key={pillar.index} className={`philosophy-mobile-card ${index === active ? 'is-active' : index < active ? 'is-before' : 'is-after'}`}>
                <span>{pillar.index} / {pillar.nav}</span>
                <div className="philosophy-mobile-images"><img src={pillar.images[0]} alt="" /><img src={pillar.images[1]} alt="" /></div>
                <h3>{pillar.title}</h3>
                <strong>{pillar.subhead}</strong>
                <p>{pillar.body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
