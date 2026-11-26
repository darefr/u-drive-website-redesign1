'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CalendarDays, ChevronDown, MapPin, RotateCcw, SlidersHorizontal } from 'lucide-react'
import { modeName, vehicles } from '@/lib/fleet'
import { prettyDate } from '@/lib/rental-request'
import type { TripSearch } from '@/lib/trip-search'
import { VehicleCard } from './fleet-showcase'

export function FleetCatalogue({ trip }: { trip?: TripSearch }) {
  const [filter, setFilter] = useState('All vehicles')
  const [sort, setSort] = useState('featured')
  const cars = vehicles
    .filter(
      (v) =>
        (!trip?.vehicle || v.slug === trip.vehicle) &&
        (filter === 'All vehicles' || v.category === filter),
    )
    .sort((a, b) => (sort === 'low' ? a.rate - b.rate : sort === 'high' ? b.rate - a.rate : 0))
  return (
    <section className="catalogue" aria-label="Vehicle catalogue">
      {trip && (
        <div className="trip-results-summary">
          <div>
            <strong>Your trip search</strong>
            <span>
              <MapPin size={15} />
              {trip.pickup || 'Pickup to arrange'}
            </span>
            <span>{modeName(trip.mode)}</span>
            {trip.start && (
              <span>
                <CalendarDays size={15} />
                {prettyDate(trip.start)}
                {trip.end ? ` – ${prettyDate(trip.end)}` : ''}
              </span>
            )}
          </div>
          <Link href="/fleet">
            <RotateCcw size={14} />
            Clear search
          </Link>
        </div>
      )}
      <div className="catalogue-controls">
        <fieldset className="catalogue-filters">
          <legend className="sr-only">Filter by body style</legend>
          {['All vehicles', 'SUV', 'Hatchback'].map((label) => (
            <label key={label}>
              <input
                className="sr-only"
                type="radio"
                name="body-style"
                checked={filter === label}
                onChange={() => setFilter(label)}
              />
              <span>{label}</span>
            </label>
          ))}
        </fieldset>
        <label className="sort-control">
          <SlidersHorizontal size={16} />
          <span className="sr-only">Sort vehicles</span>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="featured">Featured order</option>
            <option value="low">Price: low to high</option>
            <option value="high">Price: high to low</option>
          </select>
          <ChevronDown size={14} />
        </label>
      </div>
      <p className="result-count" role="status">
        {cars.length} {cars.length === 1 ? 'vehicle' : 'vehicles'}
        {trip
          ? ' matching your selection · Availability confirmed on request'
          : ' in the U Drive collection'}
      </p>
      <div className="catalogue-car-grid">
        {cars.map((v, i) => (
          <VehicleCard key={v.slug} vehicle={v} trip={trip} eager={i < 2} />
        ))}
      </div>
      {cars.length === 0 && (
        <div className="empty-fleet">
          <h2>No matches in this body style.</h2>
          <p>Keep your trip details and show all body styles, or start a fresh search.</p>
          <button
            type="button"
            className="action action-dark"
            onClick={() => setFilter('All vehicles')}
          >
            Show all body styles
          </button>
        </div>
      )}
    </section>
  )
}
