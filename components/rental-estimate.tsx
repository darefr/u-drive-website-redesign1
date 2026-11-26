import Image from 'next/image'
import { Info } from 'lucide-react'
import { modeName, money, type Vehicle } from '@/lib/fleet'
import { rentalDays, type RentalRequest } from '@/lib/rental-request'

export function RentalEstimate({ request, vehicle }: { request: RentalRequest; vehicle: Vehicle }) {
  const days = rentalDays(request.pickupDate, request.returnDate)
  return (
    <aside className="estimate-card" aria-labelledby="estimate-heading">
      <div className="estimate-photo">
        <Image
          src={`/images/${vehicle.slug}-card.webp`}
          alt={vehicle.imageAlt}
          fill
          sizes="(max-width: 760px) 100px, 360px"
        />
      </div>
      <div className="estimate-content">
        <p className="eyebrow">YOUR SELECTED VEHICLE</p>
        <h2 id="estimate-heading" className="estimate-name">
          {vehicle.name}
        </h2>
        <p className="estimate-mode">
          {modeName(request.mode)} · {vehicle.label}
        </p>
        <dl className="estimate-lines">
          <div>
            <dt>Daily vehicle rate</dt>
            <dd>{money(vehicle.rate)}</dd>
          </div>
          <div>
            <dt>Rental duration</dt>
            <dd>{days ? `${days} ${days === 1 ? 'day' : 'days'}` : 'Select dates'}</dd>
          </div>
        </dl>
        <div className="estimate-total" aria-live="polite" aria-atomic="true">
          <span>Estimated rental</span>
          <strong>{days ? money(days * vehicle.rate) : 'Add your dates'}</strong>
        </div>
        <p className="estimate-note">
          <Info size={14} />
          Vehicle-rate estimate only. Availability, driver arrangements, delivery, and final terms
          are confirmed directly.
        </p>
      </div>
    </aside>
  )
}
