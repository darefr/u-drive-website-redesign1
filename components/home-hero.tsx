'use client'

import Link from 'next/link'
import { getImageProps } from 'next/image'
import { useRef, useState, type CSSProperties } from 'react'
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { lowestRate, money, vehicles, type Vehicle } from '@/lib/fleet'

// Matches the stacked hero breakpoint in drive.css: phones, and tablets held upright.
const stackedHero = '(max-width: 700px), (max-width: 1023px) and (orientation: portrait)'

function HeroFrame({ vehicle, active, first }: { vehicle: Vehicle; active: boolean; first: boolean }) {
  const { scene } = vehicle
  const alt = active ? scene.alt : ''
  // Passed to getImageProps, not only set on the <img>, so Next knows the first frame is eager.
  const delivery = first
    ? ({ loading: 'eager', fetchPriority: 'high' } as const)
    : ({ loading: 'lazy' } as const)
  const { props: desktop } = getImageProps({
    src: scene.panorama?.image ?? scene.image,
    alt,
    fill: true,
    sizes: scene.panorama ? '100vw' : '64vw',
    ...delivery,
  })
  const { props: mobile } = getImageProps({
    src: scene.image,
    alt,
    fill: true,
    sizes: '100vw',
    ...delivery,
  })
  return (
    <picture
      className="hero-frame"
      data-active={active}
      data-layout={scene.panorama ? 'wide' : 'panel'}
      aria-hidden={!active}
      style={
        { '--focus': scene.focus, '--focus-wide': scene.panorama?.focus } as CSSProperties
      }
    >
      {/* Unoptimized images have no srcSet, and an empty source would fall back to the panorama. */}
      <source media={stackedHero} srcSet={mobile.srcSet ?? mobile.src} sizes={mobile.sizes} />
      <img {...desktop} />
    </picture>
  )
}

export function HomeHero() {
  const count = vehicles.length
  const [index, setIndex] = useState(0)
  // Frames are only mounted once visited, so the page loads a single hero photograph.
  const [seen, setSeen] = useState([0])
  const touch = useRef<{ x: number; y: number } | null>(null)
  const car = vehicles[index]
  function show(next: number) {
    const target = (next + count) % count
    setIndex(target)
    setSeen((list) => (list.includes(target) ? list : [...list, target]))
  }
  const position = (n: number) => String(n).padStart(2, '0')
  return (
    <section
      className="hero"
      aria-labelledby="cover-title"
      onTouchStart={(e) => {
        touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
      }}
      onTouchEnd={(e) => {
        const start = touch.current
        touch.current = null
        if (!start) return
        const dx = e.changedTouches[0].clientX - start.x
        const dy = e.changedTouches[0].clientY - start.y
        if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.5) show(index + (dx < 0 ? 1 : -1))
      }}
    >
      <div className="hero-media">
        {vehicles.map(
          (vehicle, i) =>
            seen.includes(i) && (
              <HeroFrame key={vehicle.slug} vehicle={vehicle} active={i === index} first={i === 0} />
            ),
        )}
      </div>
      <div className="hero-scrim" />
      <div className="shell hero-inner">
        <div className="hero-copy">
          <p className="hero-kicker">U Drive Rental Car Kathmandu</p>
          <h1 id="cover-title">
            <span className="hero-line">
              <span>Drive your</span>
            </span>{' '}
            <span className="hero-line">
              <span>journey</span>
            </span>{' '}
            <span className="hero-line">
              <em>across Nepal.</em>
            </span>
          </h1>
          <p className="hero-lead">
            Self-drive freedom or a driver at the wheel. {count} rental cars from{' '}
            {money(lowestRate)} a day, with pickup in Kathmandu and delivery across Nepal.
          </p>
          <div className="action-row hero-actions">
            <Link href="/booking" className="action action-gold action-lg">
              Book a Car <ArrowRight />
            </Link>
            <Link href="/fleet" className="action action-glass action-lg">
              Explore Fleet <ArrowUpRight />
            </Link>
          </div>
        </div>
        <div className="hero-foot">
          <div className="hero-slides" role="group" aria-label="Featured vehicles">
            <button
              type="button"
              aria-label="Previous featured vehicle"
              onClick={() => show(index - 1)}
            >
              <ChevronLeft size={18} />
            </button>
            <button type="button" aria-label="Next featured vehicle" onClick={() => show(index + 1)}>
              <ChevronRight size={18} />
            </button>
            <span className="hero-count" aria-hidden="true">
              {position(index + 1)}
              <span> / {position(count)}</span>
            </span>
            <span className="hero-progress" aria-hidden="true">
              {vehicles.map((vehicle, i) => (
                <i key={vehicle.slug} data-active={i === index} />
              ))}
            </span>
            <span className="sr-only" aria-live="polite">
              Showing the {car.name}, {money(car.rate)} per day. Vehicle {index + 1} of {count}.
            </span>
          </div>
          <Link href={`/fleet/${car.slug}`} className="hero-car">
            <span className="hero-car-label">In frame</span>
            <strong>{car.name}</strong>
            <span className="hero-car-rate">
              {money(car.rate)}
              <small> / day</small>
            </span>
            <span className="hero-car-arrow">
              <ArrowUpRight size={16} aria-hidden="true" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}
