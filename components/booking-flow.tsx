'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Check, Phone } from 'lucide-react'
import { Eyebrow } from './brand'
import { TripFields, ContactFields } from './booking-fields'
import { InquiryReview, RequestReceipt } from './inquiry-review'
import { RentalEstimate } from './rental-estimate'
import { business, findVehicle, money, vehicles, type RentalMode } from '@/lib/fleet'
import {
  rentalDays,
  todayInNepal,
  validateTrip,
  validateContact,
  type RentalRequest,
  type RequestErrors,
} from '@/lib/rental-request'
import type { TripSearch } from '@/lib/trip-search'

const titles = [
  'Your trip details',
  'Your contact details',
  'Review your request',
  'Request marked as sent.',
]
export function BookingFlow({
  initialVehicle,
  initialMode,
  initialTrip,
  today,
  embedded = false,
}: {
  initialVehicle: string
  initialMode: RentalMode
  initialTrip?: TripSearch
  today: string
  embedded?: boolean
}) {
  const [request, setRequest] = useState<RentalRequest>({
    vehicle: initialVehicle,
    mode: initialMode,
    pickupDate: initialTrip?.start || '',
    returnDate: initialTrip?.end || '',
    pickupLocation: initialTrip?.pickup || '',
    handover: 'pickup',
    pickupTime: '',
    sameReturn: true,
    returnLocation: '',
    name: '',
    phone: '',
    email: '',
    notes: initialTrip?.destination ? `Planned destination: ${initialTrip.destination}.` : '',
  })
  const [step, setStep] = useState(0)
  const [ready, setReady] = useState(false)
  const [localDay, setLocalDay] = useState(today)
  const [errors, setErrors] = useState<RequestErrors>({})
  const heading = useRef<HTMLHeadingElement>(null)
  const previous = useRef(0)
  const vehicle = findVehicle(request.vehicle) ?? vehicles[0]
  const days = rentalDays(request.pickupDate, request.returnDate)
  useEffect(() => {
    setReady(true)
    setLocalDay(todayInNepal())
  }, [])
  useEffect(() => {
    if (previous.current !== step) {
      heading.current?.focus({ preventScroll: true })
      heading.current?.scrollIntoView({ behavior: 'instant', block: 'start' })
      previous.current = step
    }
  }, [step])
  function update(patch: Partial<RentalRequest>) {
    setRequest((value) => ({ ...value, ...patch }))
    setErrors((old) => {
      const next = { ...old }
      for (const k of Object.keys(patch) as (keyof RentalRequest)[]) delete next[k]
      return next
    })
  }
  function advance(event: React.FormEvent) {
    event.preventDefault()
    const problems = step === 0 ? validateTrip(request, todayInNepal()) : validateContact(request)
    setErrors(problems)
    const first = Object.keys(problems)[0]
    if (first) {
      requestAnimationFrame(() => document.getElementById(first)?.focus())
      return
    }
    setStep(step + 1)
  }
  function edit(s: number) {
    setErrors({})
    setStep(s)
  }
  const formPanel = (
    <section className="booking-form-panel" aria-label={`Booking request for ${vehicle.name}`}>
      {step < 3 && (
        <ol className="booking-steps" aria-label="Booking progress">
          {['Trip details', 'Your details', 'Review & send'].map((name, i) => (
            <li
              key={name}
              data-current={i === step}
              data-complete={i < step}
              aria-current={i === step ? 'step' : undefined}
            >
              <span>{i < step ? <Check size={11} /> : i + 1}</span>
              {name}
            </li>
          ))}
        </ol>
      )}
      <h2 className="form-heading" tabIndex={-1} ref={heading}>
        {titles[step]}
      </h2>
      {step < 2 ? (
        <form noValidate onSubmit={advance}>
          {step === 0 ? (
            <TripFields
              request={request}
              errors={errors}
              update={update}
              today={localDay}
              lockedVehicle={embedded}
            />
          ) : (
            <ContactFields request={request} errors={errors} update={update} />
          )}
          {days !== null && (
            <div className={embedded ? 'embedded-estimate' : 'mobile-estimate'} aria-live="polite">
              <span>
                {days} {days === 1 ? 'day' : 'days'} × {money(vehicle.rate)}
              </span>
              <strong>{money(days * vehicle.rate)}</strong>
              <small>Estimated vehicle rental. Final terms confirmed by U Drive.</small>
            </div>
          )}
          <div className="form-actions">
            {step > 0 && (
              <button type="button" className="back-link" onClick={() => edit(0)}>
                <ArrowLeft size={15} /> Back
              </button>
            )}
            <button className="action action-gold" type="submit">
              {step === 0 ? 'Continue to your details' : 'Review booking request'}
              <ArrowRight />
            </button>
          </div>
        </form>
      ) : step === 2 ? (
        <>
          <InquiryReview request={request} vehicle={vehicle} onSent={() => setStep(3)} />
          <div className="edit-links">
            <button className="back-link" type="button" onClick={() => edit(0)}>
              <ArrowLeft size={15} /> Edit trip
            </button>
            <button className="back-link" type="button" onClick={() => edit(1)}>
              Edit contact details
            </button>
          </div>
        </>
      ) : (
        <RequestReceipt request={request} vehicle={vehicle} />
      )}
    </section>
  )
  if (embedded)
    return (
      <div className="embedded-booking" data-ready={ready}>
        {formPanel}
      </div>
    )
  return (
    <div className="booking-page shell" data-ready={ready}>
      <Link className="back-link" href="/fleet">
        <ArrowLeft size={15} /> Back to the fleet
      </Link>
      <div className="booking-heading">
        <div>
          <Eyebrow>RENTAL REQUEST</Eyebrow>
          <h1 className="display section-title">PLAN YOUR DRIVE.</h1>
          <p>
            {initialTrip?.destination
              ? `Your ${initialTrip.destination} itinerary. Choose a car and dates to build your request.`
              : 'Your car, your dates, and a clear estimate before you send.'}
          </p>
        </div>
        <a className="booking-help" href={`tel:${business.phone}`}>
          <Phone size={17} />
          <span>
            Prefer to call?<strong>{business.phoneDisplay}</strong>
          </span>
        </a>
      </div>
      <div className="booking-layout">
        {formPanel}
        <RentalEstimate request={request} vehicle={vehicle} />
      </div>
    </div>
  )
}
