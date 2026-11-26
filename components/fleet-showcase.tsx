import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  ArrowUpRight,
  CarFront,
  CircleCheck,
  Gauge,
  UserRound,
  Users,
  Zap,
} from 'lucide-react'
import { vehicles, type Vehicle } from '@/lib/fleet'
import { modelDetails, onRequest } from '@/lib/vehicle-specs'
import { tripHref, type TripSearch } from '@/lib/trip-search'
import { WheelIcon } from './brand'
import { FleetStage } from './fleet-stage'
import { Price } from './price'

function specChips(slug: string) {
  const specs = modelDetails[slug]
  const known = (value: string) => value !== onRequest
  const chips = [
    known(specs.seats) && { Icon: Users, text: specs.seats },
    known(specs.transmission) && { Icon: Gauge, text: specs.transmission },
    known(specs.power) && { Icon: Zap, text: specs.power },
  ].filter((chip) => chip !== false)
  // Anything agreed per rental says so instead of guessing a spec.
  if (!known(specs.seats)) chips.push({ Icon: CircleCheck, text: 'Seating on request' })
  if (!known(specs.transmission) || !known(specs.power))
    chips.push({ Icon: CircleCheck, text: 'Variant on request' })
  return chips
}

export function VehicleCard({
  vehicle: v,
  trip,
  eager = false,
  layout = 'card',
  heading: Heading = 'h3',
}: {
  vehicle: Vehicle
  trip?: TripSearch
  eager?: boolean
  layout?: 'card' | 'row'
  heading?: 'h2' | 'h3'
}) {
  const electric = modelDetails[v.slug].power === 'Electric'
  const detail = tripHref(`/fleet/${v.slug}`, trip ? { ...trip, vehicle: '' } : {})
  const booking = tripHref('/booking', { ...trip, vehicle: v.slug })
  const row = layout === 'row'
  return (
    <article className="vehicle-tile" data-layout={layout}>
      <Link href={detail} className="vehicle-tile-photo" aria-label={`View ${v.name} gallery`}>
        <Image
          src={row ? v.scene.image : `/images/${v.slug}.webp`}
          alt={row ? v.scene.alt : v.imageAlt}
          fill
          sizes={
            row
              ? '(max-width: 900px) 94vw, 44vw'
              : '(max-width: 600px) 84vw, (max-width: 1100px) 44vw, 30vw'
          }
          style={row ? { objectPosition: v.scene.focus } : undefined}
          loading={eager ? 'eager' : 'lazy'}
        />
        <span className="vehicle-type">
          {electric ? <Zap size={13} aria-hidden="true" /> : <CarFront size={13} aria-hidden="true" />}
          {v.label}
        </span>
      </Link>
      <div className="vehicle-tile-body">
        <div className="vehicle-name-row">
          <Heading>
            <Link href={detail}>{v.name}</Link>
          </Heading>
          <Price amount={v.rate} className="vehicle-rate" />
        </div>
        <p className="vehicle-brief">{row ? v.introduction : v.description}</p>
        <ul className="car-spec-chips">
          {specChips(v.slug).map(({ Icon, text }) => (
            <li key={text}>
              <Icon size={15} aria-hidden="true" />
              {text}
            </li>
          ))}
        </ul>
        <p className="vehicle-modes">
          <span>
            <WheelIcon size={15} />
            Self drive
          </span>
          <span>
            <UserRound size={15} aria-hidden="true" />
            With driver
          </span>
          <span className="on-request">Availability on request</span>
        </p>
        <div className="vehicle-tile-links">
          <Link href={detail} aria-label={`View details for ${v.name}`}>
            View Details <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
          <Link href={booking} aria-label={`Book ${v.name}`}>
            Book Now <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  )
}

export function FleetShowcase() {
  return (
    <section className="fleet-stage-section section-space" aria-labelledby="fleet-heading">
      <div className="shell">
        <div className="drive-section-head" data-reveal>
          <div>
            <p className="drive-eyebrow">The U Drive fleet</p>
            <h2 id="fleet-heading" className="drive-section-title">
              Choose your drive.
            </h2>
          </div>
          <div className="section-head-aside">
            <p className="section-aside">
              {vehicles.length} cars with clear daily rates. Rent any of them self-drive, or with a
              driver at the wheel.
            </p>
            <Link href="/fleet" className="drive-section-link">
              View all vehicles <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
        <FleetStage />
      </div>
    </section>
  )
}
