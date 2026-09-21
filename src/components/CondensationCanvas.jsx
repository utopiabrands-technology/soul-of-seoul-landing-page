import { useEffect, useRef } from 'react'

export default function CondensationCanvas({ heroRef, copyRef }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const hero = heroRef.current
    const copy = copyRef.current
    if (!canvas || !hero || !copy) return

    const shell = hero.closest('.hero-shell')
    const ctx = canvas.getContext('2d')
    const base = document.createElement('canvas')
    const bctx = base.getContext('2d')
    const img = new Image()

    let dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    let last = null
    let touching = false
    let ready = false
    let heroVisible = false
    let reveal = 0
    let updateRaf = 0
    let resizeRaf = 0
    let refogRaf = 0
    let refogTimer = 0
    let refogStart = 0

    function coverDraw(c, x) {
      const W = c.canvas.width
      const H = c.canvas.height
      const iw = x.naturalWidth
      const ih = x.naturalHeight
      const s = Math.max(W / iw, H / ih)
      const w = iw * s
      const h = ih * s
      const positionX = window.innerWidth <= 620 ? 0.58 : 0.5
      c.drawImage(x, (W - w) * positionX, (H - h) / 2, w, h)
    }

    function drawBase() {
      if (!ready) return
      base.width = canvas.width
      base.height = canvas.height
      bctx.clearRect(0, 0, base.width, base.height)
      bctx.save()
      bctx.filter = `blur(${18 * dpr}px) saturate(.82) contrast(.95)`
      coverDraw(bctx, img)
      bctx.restore()
      bctx.globalCompositeOperation = 'source-over'
      bctx.fillStyle = 'rgba(255,248,250,.62)'
      bctx.fillRect(0, 0, base.width, base.height)
      for (let i = 0; i < 900; i += 1) {
        const x = Math.random() * base.width
        const y = Math.random() * base.height
        const r = (0.5 + Math.random() * 2.8) * dpr
        bctx.fillStyle = `rgba(255,255,255,${0.03 + Math.random() * 0.11})`
        bctx.beginPath()
        bctx.arc(x, y, r, 0, Math.PI * 2)
        bctx.fill()
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(base, 0, 0)
    }

    function resize(redraw = false) {
      const r = hero.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      const width = Math.max(1, Math.round(r.width * dpr))
      const height = Math.max(1, Math.round(r.height * dpr))
      const sizeChanged = canvas.width !== width || canvas.height !== height
      if (sizeChanged) {
        canvas.width = width
        canvas.height = height
      }
      canvas.style.width = `${r.width}px`
      canvas.style.height = `${r.height}px`
      if (sizeChanged || redraw) drawBase()
    }

    img.onload = () => {
      ready = true
      if (heroVisible && !document.hidden) {
        resize(true)
        scheduleUpdate()
      }
    }
    img.src = '/assets/hero-glass-skin.png'

    function point(e) {
      const r = canvas.getBoundingClientRect()
      return { x: (e.clientX - r.left) * dpr, y: (e.clientY - r.top) * dpr }
    }

    function stamp(p, s = 0.8) {
      const baseR = (50 + Math.min(38, s * 20)) * dpr
      ctx.save()
      ctx.globalCompositeOperation = 'destination-out'
      for (let i = 0; i < 12; i += 1) {
        const a = Math.random() * Math.PI * 2
        const dist = Math.random() * baseR * 0.46
        const rx = p.x + Math.cos(a) * dist
        const ry = p.y + Math.sin(a) * dist * 0.72
        const r = baseR * (0.5 + Math.random() * 0.65)
        const g = ctx.createRadialGradient(rx, ry, r * 0.12, rx, ry, r)
        g.addColorStop(0, 'rgba(0,0,0,.97)')
        g.addColorStop(0.56, 'rgba(0,0,0,.72)')
        g.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(rx, ry, r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.restore()
      stopRefog()
      scheduleRefog()
    }

    function paint(a, b, s) {
      if (!a) {
        stamp(b, s)
        return
      }
      const dx = b.x - a.x
      const dy = b.y - a.y
      const dist = Math.hypot(dx, dy)
      const steps = Math.max(1, Math.ceil(dist / (15 * dpr)))
      for (let i = 1; i <= steps; i += 1) {
        const t = i / steps
        stamp({ x: a.x + dx * t, y: a.y + dy * t }, s)
      }
    }

    const onPointerMove = (e) => {
      if (e.pointerType === 'touch' && !touching) return
      const p = point(e)
      const s = last ? Math.min(2.3, Math.hypot(p.x - last.x, p.y - last.y) / (38 * dpr)) : 0.7
      paint(last, p, s)
      last = p
    }

    const onPointerDown = (e) => {
      if (e.pointerType === 'touch') touching = true
      last = point(e)
      stamp(last, 0.7)
    }

    const clearPointer = () => {
      touching = false
      last = null
    }

    function canUpdate() {
      return heroVisible && !document.hidden
    }

    function update() {
      updateRaf = 0
      if (!canUpdate()) return
      const shellRect = shell.getBoundingClientRect()
      const total = Math.max(1, shell.offsetHeight - window.innerHeight)
      const progress = Math.min(1, Math.max(0, -shellRect.top / total))
      reveal = Math.min(1, progress / 0.68)
      canvas.style.opacity = String(1 - reveal)
      copy.style.transform = window.innerWidth <= 980 ? 'none' : `translateY(calc(-43% - ${Math.max(0, (progress - 0.42)) * 18}px))`
      copy.style.opacity = String(1 - Math.max(0, progress - 0.42) * 0.1)
    }

    function scheduleUpdate() {
      if (!canUpdate() || updateRaf) return
      updateRaf = requestAnimationFrame(update)
    }

    function scheduleResize() {
      if (!canUpdate() || resizeRaf) return
      resizeRaf = requestAnimationFrame(() => {
        resizeRaf = 0
        if (!canUpdate()) return
        resize()
        scheduleUpdate()
      })
    }

    function stopRefog() {
      if (refogTimer) {
        window.clearTimeout(refogTimer)
        refogTimer = 0
      }
      if (refogRaf) {
        cancelAnimationFrame(refogRaf)
        refogRaf = 0
      }
    }

    function refog(time) {
      if (!canUpdate() || !ready || reveal >= 0.92 || time - refogStart > 10000) {
        refogRaf = 0
        return
      }
      ctx.save()
      ctx.globalCompositeOperation = 'source-over'
      ctx.globalAlpha = 0.0035
      ctx.drawImage(base, 0, 0)
      ctx.restore()
      refogRaf = requestAnimationFrame(refog)
    }

    function scheduleRefog() {
      refogTimer = window.setTimeout(() => {
        refogTimer = 0
        if (!canUpdate() || !ready || reveal >= 0.92) return
        refogStart = performance.now()
        refogRaf = requestAnimationFrame(refog)
      }, 900)
    }

    const observer = new IntersectionObserver(([entry]) => {
      heroVisible = entry.isIntersecting
      if (heroVisible && !document.hidden) {
        resize()
        scheduleUpdate()
      } else {
        if (updateRaf) {
          cancelAnimationFrame(updateRaf)
          updateRaf = 0
        }
        if (resizeRaf) {
          cancelAnimationFrame(resizeRaf)
          resizeRaf = 0
        }
        stopRefog()
      }
    })

    const onVisibilityChange = () => {
      if (document.hidden) {
        if (updateRaf) {
          cancelAnimationFrame(updateRaf)
          updateRaf = 0
        }
        if (resizeRaf) {
          cancelAnimationFrame(resizeRaf)
          resizeRaf = 0
        }
        stopRefog()
        return
      }
      scheduleResize()
      scheduleUpdate()
    }

    observer.observe(hero)
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleResize, { passive: true })
    document.addEventListener('visibilitychange', onVisibilityChange)
    canvas.addEventListener('pointermove', onPointerMove)
    canvas.addEventListener('pointerdown', onPointerDown)
    canvas.addEventListener('pointerup', clearPointer)
    canvas.addEventListener('pointercancel', clearPointer)
    canvas.addEventListener('pointerleave', clearPointer)

    return () => {
      observer.disconnect()
      if (updateRaf) cancelAnimationFrame(updateRaf)
      if (resizeRaf) cancelAnimationFrame(resizeRaf)
      stopRefog()
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleResize)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      canvas.removeEventListener('pointermove', onPointerMove)
      canvas.removeEventListener('pointerdown', onPointerDown)
      canvas.removeEventListener('pointerup', clearPointer)
      canvas.removeEventListener('pointercancel', clearPointer)
      canvas.removeEventListener('pointerleave', clearPointer)
      img.onload = null
    }
  }, [heroRef, copyRef])

  return <canvas ref={canvasRef} id="fog" aria-label="Interactive frosted glass. Move the pointer to wipe condensation." />
}
