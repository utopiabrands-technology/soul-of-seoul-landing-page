import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function OurStory() {
  const sectionRef = useRef(null)
  const imageA = useRef(null)
  const imageB = useRef(null)
  const imageC = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const media = gsap.matchMedia()
    media.add({ mobile: '(max-width: 820px)', desktop: '(min-width: 821px)', motion: '(prefers-reduced-motion: no-preference)' }, (context) => {
      if (!context.conditions.motion) return
      const amount = context.conditions.mobile ? 0.35 : 1
      gsap.to(imageA.current, {
        yPercent: -7 * amount,
        ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: true },
      })
      gsap.to(imageB.current, {
        yPercent: 8 * amount,
        ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: true },
      })
      gsap.to(imageC.current, {
        yPercent: -7 * amount,
        ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: true },
      })
    }, sectionRef)
    return () => media.revert()
  }, [])

  return (
    <section ref={sectionRef} id="our-story" className="story-section section-shell">
      
      <div className="story-grid">
        <div className="story-copy">
          <div className="story-pattern" aria-hidden="true"><img src="/assets/site/diagonal-lines.png" /></div>
          <div className="section-kicker">OUR STORY</div>
          <h2>Rooted in Seoul</h2>
          <p>Seoul is built on strong roots, with a future facing world rising around it, in balance. Glass towers rise from centuries of history. Glass skin rises from layers of care. Both are defined by what you see. Both are made meaningful by what sits beneath. Born in Korea. Built for every complexion, concern and routine that follows.</p>
          <a className="glass-link" href="#philosophy">Discover our philosophy <span aria-hidden="true">↓</span></a>
        </div>

        <div className="story-collage" aria-label="Seoul heritage and modernity imagery">
          <figure ref={imageA} className="story-image story-image-a">
            <img src="/assets/site/rooted-bottle.jpg" alt="Skincare bottle staged against Korean architectural scenery" />
          </figure>
          <figure ref={imageB} className="story-image story-image-b">
            <img src="/assets/site/rooted-city.png" alt="Beauty portrait set against modern Seoul architecture" />
          </figure>
          <figure ref={imageC} className="story-image story-image-c">
            <img src="/assets/site/rooted-temple.png" alt="Traditional Korean pagoda framed by soft blossoms" />
          </figure>
        </div>
      </div>
    </section>
  )
}
