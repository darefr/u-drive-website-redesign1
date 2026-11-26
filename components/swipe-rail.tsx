'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export function SwipeRail({ children, label }: { children: ReactNode; label: string }) {
  const rail = useRef<HTMLDivElement>(null)
  const [view, setView] = useState({
    start: true,
    end: false,
    overflow: false,
    selected: 0,
    count: 0,
  })
  useEffect(() => {
    const el = rail.current
    if (!el) return
    const sync = () => {
      const cards = [...el.children] as HTMLElement[]
      const left = el.getBoundingClientRect().left
      const selected = cards.reduce(
        (best, card, i) =>
          Math.abs(card.getBoundingClientRect().left - left) <
          Math.abs(cards[best].getBoundingClientRect().left - left)
            ? i
            : best,
        0,
      )
      setView({
        start: el.scrollLeft <= 2,
        end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 3,
        overflow: el.scrollWidth - el.clientWidth > 3,
        selected,
        count: cards.length,
      })
    }
    const ro = new ResizeObserver(sync)
    ro.observe(el)
    el.addEventListener('scroll', sync, { passive: true })
    sync()
    return () => {
      ro.disconnect()
      el.removeEventListener('scroll', sync)
    }
  }, [])
  const slide = (direction: number) => {
    const el = rail.current
    if (!el || !el.firstElementChild) return
    const width =
      el.firstElementChild.getBoundingClientRect().width +
      parseFloat(getComputedStyle(el).gap || '0')
    el.scrollBy({
      left: direction * width,
      behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    })
  }
  return (
    <div className="rail-wrap">
      <div ref={rail} className="vehicle-rail" role="region" aria-label={label} tabIndex={0}>
        {children}
      </div>
      {view.overflow && (
        <div className="rail-controls">
          <span className="rail-meter" aria-hidden="true">
            {Array.from({ length: view.count }, (_, i) => (
              <i key={i} data-active={i === view.selected} />
            ))}
          </span>
          <span className="sr-only" aria-live="polite">
            Vehicle {view.selected + 1} of {view.count}
          </span>
          <button
            type="button"
            disabled={view.start}
            aria-label="Previous rental car"
            onClick={() => slide(-1)}
          >
            <ArrowLeft size={16} />
          </button>
          <button
            type="button"
            disabled={view.end}
            aria-label="Next rental car"
            onClick={() => slide(1)}
          >
            <ArrowRight size={16} />
          </button>
        </div>
      )}
    </div>
  )
}
