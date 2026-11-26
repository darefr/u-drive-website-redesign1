'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState, type KeyboardEvent } from 'react'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { bookingLink, money, vehicles } from '@/lib/fleet'
import { modelDetails } from '@/lib/vehicle-specs'
import { Price } from './price'

export function FleetStage() {
  const [selected, setSelected] = useState(0)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const last = vehicles.length - 1
    const target =
      event.key === 'ArrowRight' || event.key === 'ArrowDown'
        ? selected === last
          ? 0
          : selected + 1
        : event.key === 'ArrowLeft' || event.key === 'ArrowUp'
          ? selected === 0
            ? last
            : selected - 1
          : event.key === 'Home'
            ? 0
            : event.key === 'End'
              ? last
              : null
    if (target === null) return
    event.preventDefault()
    setSelected(target)
    tabs.current[target]?.focus()
  }
  return (
    <div className="fleet-stage" data-reveal>
      <div className="stage-tabs" role="tablist" aria-label="Fleet models">
        {vehicles.map((v, i) => (
          <button
            key={v.slug}
            ref={(node) => {
              tabs.current[i] = node
            }}
            type="button"
            role="tab"
            id={`stage-tab-${v.slug}`}
            className="stage-tab"
            aria-selected={i === selected}
            aria-controls={`stage-panel-${v.slug}`}
            tabIndex={i === selected ? 0 : -1}
            onClick={() => setSelected(i)}
            onKeyDown={onKeyDown}
          >
            <span className="stage-tab-thumb">
              <Image
                src={`/images/${v.slug}-card.webp`}
                alt=""
                width={506}
                height={302}
                sizes="120px"
              />
            </span>
            <span className="stage-tab-text">
              <strong>{v.name}</strong>
              <span>{money(v.rate)} / day</span>
            </span>
          </button>
        ))}
      </div>
      {vehicles.map((v, i) => {
        const specs = modelDetails[v.slug]
        return (
          <div
            key={v.slug}
            role="tabpanel"
            id={`stage-panel-${v.slug}`}
            className="stage-panel"
            aria-labelledby={`stage-tab-${v.slug}`}
            hidden={i !== selected}
          >
            <div className="stage-photo">
              <Image
                src={v.scene.image}
                alt={v.scene.alt}
                fill
                sizes="(max-width: 900px) 100vw, 58vw"
                style={{ objectPosition: v.scene.focus }}
              />
              <span className="stage-plate">{v.label}</span>
            </div>
            <div className="stage-info">
              <h3>{v.name}</h3>
              <p className="stage-description">{v.introduction}</p>
              <dl className="stage-specs">
                <div>
                  <dt>Body style</dt>
                  <dd>{v.category}</dd>
                </div>
                <div>
                  <dt>Seating</dt>
                  <dd>{specs.seats}</dd>
                </div>
                <div>
                  <dt>Transmission</dt>
                  <dd>{specs.transmission}</dd>
                </div>
                <div>
                  <dt>Powertrain</dt>
                  <dd>{specs.power}</dd>
                </div>
              </dl>
              <div className="stage-foot">
                <div className="stage-rate">
                  <span>Daily vehicle rate</span>
                  <Price amount={v.rate} />
                </div>
                <div className="action-row">
                  <Link className="action action-gold" href={bookingLink(v.slug)}>
                    Book This Car <ArrowRight />
                  </Link>
                  <Link className="action action-outline" href={`/fleet/${v.slug}`}>
                    View Details <ArrowUpRight />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
