'use client'

import { useEffect, useRef } from 'react'
import { CarFront, Coins, Mountain, Route } from 'lucide-react'
import { capabilities } from '@/lib/capabilities'

const icons = { cars: CarFront, modes: Route, price: Coins, area: Mountain }
const number = new Intl.NumberFormat('en-NP')
export function StatsCounter() {
  const section = useRef<HTMLElement>(null)
  useEffect(() => {
    const el = section.current
    if (
      !el ||
      !('IntersectionObserver' in window) ||
      matchMedia('(prefers-reduced-motion: reduce)').matches
    )
      return
    let frame = 0
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        const nodes = Array.from(el.querySelectorAll<HTMLElement>('[data-count]'))
        const began = performance.now()
        const draw = (now: number) => {
          const t = Math.min(1, (now - began) / 1300)
          const eased = 1 - Math.pow(1 - t, 3)
          for (const node of nodes)
            node.textContent = number.format(Math.round(Number(node.dataset.count) * eased))
          if (t < 1) frame = requestAnimationFrame(draw)
        }
        frame = requestAnimationFrame(draw)
      },
      { threshold: 0.3 },
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [])
  return (
    <section ref={section} className="capability-band on-dark" aria-label="U Drive rental facts">
      <div className="shell capability-list">
        {capabilities.map((stat) => {
          const Icon = icons[stat.id]
          return (
            <div className="capability" key={stat.id} data-kind={stat.value === null ? 'text' : 'number'}>
              <strong
                aria-label={
                  stat.value !== null ? `${stat.prefix} ${number.format(stat.value)}` : 'Nepal-wide'
                }
              >
                {stat.prefix && <small>{stat.prefix} </small>}
                {stat.value === null ? (
                  'Nepal-wide'
                ) : (
                  <span aria-hidden="true" data-count={stat.value}>
                    {number.format(stat.value)}
                  </span>
                )}
              </strong>
              <div className="capability-label">
                <Icon size={17} aria-hidden="true" />
                {stat.label}
              </div>
              <p>{stat.detail}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
