import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, ArrowUpRight, Check, MapPin, UserRound } from 'lucide-react'
import { Breadcrumbs, FAQAccordion } from '@/components/editorial'
import { Eyebrow, WhatsAppIcon, WheelIcon } from '@/components/brand'
import { Price } from '@/components/price'
import { SwipeRail } from '@/components/swipe-rail'
import { VehicleGallery } from '@/components/vehicle-gallery'
import { VehicleBookingPanel } from '@/components/vehicle-booking-panel'
import { VehicleSpecs } from '@/components/vehicle-specs'
import { readTripSearch, tripHref, type QueryValues } from '@/lib/trip-search'
import { todayInNepal } from '@/lib/rental-request'
import { VehicleCard } from '@/components/fleet-showcase'
import { findVehicle, money, vehicles, whatsappLink } from '@/lib/fleet'
import { pageMeta } from '@/lib/site'

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<QueryValues> }
export const dynamicParams = false
export function generateStaticParams() {
  return vehicles.map(({ slug }) => ({ slug }))
}
export async function generateMetadata({ params }: Props) {
  const v = findVehicle((await params).slug)
  return v
    ? pageMeta(
        `${v.name} Rental Kathmandu`,
        `Explore the ${v.name} at ${money(v.rate)} per day. View the gallery, choose your dates, and request self-drive or driver-assisted rental from Kathmandu.`,
        `/fleet/${v.slug}`,
        `/images/${v.slug}.webp`,
      )
    : { title: 'Vehicle not found' }
}
export default async function VehiclePage({ params, searchParams }: Props) {
  const v = findVehicle((await params).slug)
  if (!v) notFound()
  const trip = readTripSearch(await searchParams, todayInNepal())
  const booking = tripHref('/booking', { ...trip, vehicle: v.slug })
  return (
    <main id="main-content" className="model-page">
      <div className="shell">
        <Breadcrumbs items={[{ label: 'Our fleet', href: '/fleet' }, { label: v.name }]} />
        <div className="model-heading">
          <div>
            <Eyebrow>The U Drive fleet · {v.label}</Eyebrow>
            <h1 className="display page-title">{v.name}.</h1>
          </div>
          <p className="model-base">
            <MapPin size={16} aria-hidden="true" /> Kathmandu + all Nepal
          </p>
        </div>
        <div className="model-intro-grid">
          <VehicleGallery vehicle={v} />
          <section className="model-dossier" aria-labelledby="dossier-heading">
            <p className="overline">Daily vehicle rate</p>
            <Price amount={v.rate} className="dossier-price" />
            <h2 id="dossier-heading">Meet the {v.name}.</h2>
            <p>{v.introduction}</p>
            <ul className="dossier-modes" aria-label="Rental modes">
              <li>
                <WheelIcon size={16} /> Self drive
              </li>
              <li>
                <UserRound size={16} aria-hidden="true" /> With driver
              </li>
            </ul>
            <dl className="dossier-facts">
              <div>
                <dt>Pickup & delivery</dt>
                <dd>Arranged with U Drive</dd>
              </div>
              <div>
                <dt>Availability</dt>
                <dd>Confirmed on request</dd>
              </div>
            </dl>
            <Link className="action action-gold action-lg" href={booking}>
              Book This Car <ArrowRight />
            </Link>
            <a
              className="model-enquiry"
              href={whatsappLink(`Hello U Drive, I have a question about renting the ${v.name}.`)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon size={17} /> Ask about this car
            </a>
          </section>
        </div>
        <VehicleSpecs vehicle={v} />
        <section className="model-request" aria-labelledby="request-heading">
          <div className="model-request-copy">
            <Eyebrow>Book this model</Eyebrow>
            <h2 id="request-heading" className="editorial-title">
              Make it your drive.
            </h2>
            <p>
              Set your dates and preferred rental mode. Review your estimate before sending your
              request to the Kathmandu team.
            </p>
            <ul className="request-points">
              <li>
                <Check aria-hidden="true" /> Your estimate updates as you choose your dates
              </li>
              <li>
                <Check aria-hidden="true" /> Send your request by WhatsApp or email
              </li>
              <li>
                <Check aria-hidden="true" /> U Drive confirms availability and the final terms
              </li>
            </ul>
          </div>
          <VehicleBookingPanel vehicle={v} trip={trip} />
        </section>
        <section className="model-questions editorial-split" aria-labelledby="questions-heading">
          <div>
            <Eyebrow>Good to know</Eyebrow>
            <h2 id="questions-heading" className="editorial-title">
              Renting the {v.name}.
            </h2>
            <Link className="text-action" href="/faq">
              Read all questions <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
          <FAQAccordion
            questions={[
              {
                q: 'How is my estimate calculated?',
                a: `The daily vehicle rate of ${money(v.rate)} is multiplied by the number of rental days. A same-day rental is estimated as one day. Final arrangements are agreed directly with U Drive.`,
              },
              {
                q: `Can I rent the ${v.name} with a driver?`,
                a: 'Yes. Choose With Driver in the booking form and share your itinerary. U Drive confirms the driver arrangement and the final rental amount with you before you book.',
              },
              {
                q: 'Can I request delivery?',
                a: 'Yes. Enter your preferred meeting point in the booking form. The team will confirm the delivery location and timing for your itinerary.',
              },
              {
                q: 'Is the car reserved when I send a request?',
                a: 'No. Your request lets U Drive check the vehicle for your dates. The rental is confirmed once the team agrees the details with you.',
              },
            ]}
          />
        </section>
        <section className="related-models" aria-labelledby="related-heading">
          <div className="section-heading-row">
            <div>
              <Eyebrow>Keep exploring</Eyebrow>
              <h2 id="related-heading" className="editorial-title">
                Also in the fleet.
              </h2>
            </div>
            <Link href="/fleet" className="drive-section-link">
              All vehicles <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <SwipeRail label="More rental cars">
            {vehicles
              .filter((car) => car.slug !== v.slug)
              .map((car) => (
                <VehicleCard key={car.slug} vehicle={car} />
              ))}
          </SwipeRail>
        </section>
      </div>
      <div className="mobile-model-action">
        <span>
          <small>Daily rate</small>
          <strong>
            {money(v.rate)} <em>/ day</em>
          </strong>
        </span>
        <Link className="action action-gold" href={booking}>
          Book This Car <ArrowRight />
        </Link>
      </div>
    </main>
  )
}
