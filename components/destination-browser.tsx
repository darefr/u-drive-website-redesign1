'use client'

import { useState } from 'react'
import { destinations } from '@/lib/destinations'
import { DestinationCard } from './destination-card'

export function DestinationBrowser() {
  const [filter, setFilter] = useState('All places')
  const visible = destinations.filter((d) => filter === 'All places' || d.kind === filter)
  return (
    <section className="shell section-space" aria-labelledby="places-title">
      <p className="drive-eyebrow">The destination collection</p>
      <h2 id="places-title" className="drive-section-title">
        Find your next stop.
      </h2>
      <div className="destination-filter-bar">
        <fieldset className="catalogue-filters">
          <legend className="sr-only">Filter destinations by interest</legend>
          {['All places', 'Heritage', 'Nature', 'Mountains'].map((f) => (
            <label key={f}>
              <input
                type="radio"
                className="sr-only"
                name="destination-filter"
                checked={f === filter}
                onChange={() => setFilter(f)}
              />
              <span>{f}</span>
            </label>
          ))}
        </fieldset>
        <span role="status">{visible.length} destination guides</span>
      </div>
      <div className="destination-directory">
        {visible.map((d) => (
          <DestinationCard key={d.slug} destination={d} />
        ))}
      </div>
      <p className="image-note">
        Destination photography courtesy of the{' '}
        <a href="https://ntb.gov.np/" target="_blank" rel="noopener noreferrer">
          Nepal Tourism Board
        </a>
        . These guides are travel inspiration, not branch locations or guaranteed routes.
      </p>
    </section>
  )
}
