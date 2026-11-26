'use client'

import Form from 'next/form'
import { useEffect, useState } from 'react'
import { ArrowRight, CarFront, ChevronDown, MapPin, UserRound } from 'lucide-react'
import { WheelIcon } from './brand'
import { DateField } from './date-field'
import { type RentalMode, vehicles } from '@/lib/fleet'
import { nextDate, todayInNepal } from '@/lib/rental-request'

export function QuickPlanner() {
  const [mode, setMode] = useState<RentalMode>('self-drive')
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [today, setToday] = useState('')
  useEffect(() => setToday(todayInNepal()), [])
  return (
    <section className="trip-planner-wrap shell" aria-labelledby="rental-search-title">
      <Form action="/fleet" className="trip-planner">
        <div className="trip-planner-head">
          <div>
            <h2 id="rental-search-title">Find your rental</h2>
            <p>Pick a car and dates. Availability is confirmed by the Kathmandu team.</p>
          </div>
          <fieldset className="trip-mode-switch">
            <legend className="sr-only">Rental type</legend>
            {(['self-drive', 'with-driver'] as const).map((value) => (
              <label key={value}>
                <input
                  className="sr-only"
                  type="radio"
                  name="mode"
                  value={value}
                  checked={mode === value}
                  onChange={() => setMode(value)}
                />
                <span>
                  {value === 'self-drive' ? <WheelIcon /> : <UserRound size={15} />}
                  {value === 'self-drive' ? 'Self Drive' : 'With Driver'}
                </span>
              </label>
            ))}
          </fieldset>
        </div>
        <div className="trip-search-fields">
          <label className="trip-field">
            <span>Pickup location</span>
            <span className="trip-value">
              <MapPin aria-hidden="true" />
              <select name="pickup" defaultValue="Kathmandu" aria-label="Pickup location">
                <option>Kathmandu</option>
                <option>Tribhuvan Airport</option>
                <option>Lalitpur</option>
                <option>Bhaktapur</option>
                <option value="">Other location</option>
              </select>
              <ChevronDown aria-hidden="true" />
            </span>
          </label>
          <label className="trip-field">
            <span>Vehicle</span>
            <span className="trip-value">
              <CarFront aria-hidden="true" />
              <select name="vehicle" aria-label="Preferred vehicle" defaultValue="">
                <option value="">All vehicles</option>
                {vehicles.map((v) => (
                  <option key={v.slug} value={v.slug}>
                    {v.name}
                  </option>
                ))}
              </select>
              <ChevronDown aria-hidden="true" />
            </span>
          </label>
          <div className="trip-date">
            <DateField
              id="search-start"
              label="Pickup date"
              value={start}
              minimum={today}
              optional
              onChange={(value) => {
                setStart(value)
                if (!end || end < value) setEnd(nextDate(value))
              }}
            />
            <input type="hidden" name="start" value={start} />
          </div>
          <div className="trip-date">
            <DateField
              id="search-end"
              label="Return date"
              value={end}
              minimum={start || today}
              optional
              onChange={(value) => {
                setEnd(value)
                if (!start) setStart(today)
              }}
            />
            <input type="hidden" name="end" value={end} />
          </div>
          <button type="submit" className="action action-gold trip-search-button">
            Search Cars <ArrowRight />
          </button>
        </div>
      </Form>
    </section>
  )
}
