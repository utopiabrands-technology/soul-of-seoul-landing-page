import { useEffect, useId, useRef } from 'react'

export default function ProductVariations({ items, activeIndex, onChange, label, children }) {
  const id = useId()
  const tabs = useRef(null)
  const gesture = useRef(null)
  const dragged = useRef(false)
  const direction = useRef(1)
  const select = (index) => {
    const next = Math.max(0, Math.min(items.length - 1, index))
    if (next === activeIndex) return
    direction.current = next > activeIndex ? 1 : -1
    onChange(next)
  }

  useEffect(() => {
    const row = tabs.current
    const tab = row.children[activeIndex]
    const left = tab.offsetLeft - row.offsetLeft
    if (left < row.scrollLeft || left + tab.offsetWidth > row.scrollLeft + row.clientWidth) {
      row.scrollTo({ left: left - (row.clientWidth - tab.offsetWidth) / 2,
        behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
    }
  }, [activeIndex])

  const start = (event, mode) => {
    dragged.current = false
    if (!event.isPrimary || event.button !== 0) return
    if (mode === 'tabs' && event.pointerType !== 'mouse') return
    if (mode === 'panel' && event.target.closest('button, a, input')) return
    gesture.current = { x: event.clientX, y: event.clientY, scroll: event.currentTarget.scrollLeft, mode }
  }
  const move = (event) => {
    const g = gesture.current
    if (!g) return
    const dx = event.clientX - g.x
    const dy = event.clientY - g.y
    if (!dragged.current && Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 8) {
      gesture.current = null
      return
    }
    if (Math.abs(dx) > 8) {
      dragged.current = true
      event.currentTarget.setPointerCapture(event.pointerId)
      if (g.mode === 'tabs') event.currentTarget.scrollLeft = g.scroll - dx
    }
  }
  const finish = (event) => {
    const g = gesture.current
    if (g?.mode === 'panel' && dragged.current && Math.abs(event.clientX - g.x) > 55) {
      select(activeIndex + (event.clientX < g.x ? 1 : -1))
    }
    gesture.current = null
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId)
  }
  const preventDragClick = (event) => {
    if (dragged.current) { event.preventDefault(); event.stopPropagation(); dragged.current = false }
  }

  return (
    <>
      <div ref={tabs} className="product-tabs" role="tablist" aria-label={label}
        onPointerDown={(e) => start(e, 'tabs')} onPointerMove={move} onPointerUp={finish}
        onPointerCancel={() => { gesture.current = null }} onClickCapture={preventDragClick}>
        {items.map((item, index) => (
          <button key={item.tab} id={`${id}-tab-${index}`} type="button" role="tab"
            aria-selected={index === activeIndex} aria-controls={`${id}-panel`}
            tabIndex={index === activeIndex ? 0 : -1} className={index === activeIndex ? 'is-active' : ''}
            onClick={() => select(index)} onKeyDown={(event) => {
              const next = { ArrowRight: Math.min(items.length - 1, index + 1), ArrowLeft: Math.max(0, index - 1), Home: 0, End: items.length - 1 }[event.key]
              if (next !== undefined) { event.preventDefault(); select(next); tabs.current.children[next].focus() }
            }}>{item.tab}</button>
        ))}
      </div>
      <div id={`${id}-panel`} className="product-variation-panel" role="tabpanel" aria-labelledby={`${id}-tab-${activeIndex}`} tabIndex={0}
        onPointerDown={(e) => start(e, 'panel')} onPointerMove={move} onPointerUp={finish}
        onPointerCancel={() => { gesture.current = null }} onClickCapture={preventDragClick}
        onDragStart={(e) => e.preventDefault()}>
        <div key={activeIndex} className="product-variation-content" style={{ '--variation-offset': `${direction.current * 28}px` }}>{children}</div>
      </div>
    </>
  )
}
