import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, ArrowUpRight, MapPin, MessageCircle } from 'lucide-react'
import { Breadcrumbs, FAQAccordion, TextLink } from '@/components/editorial'
import { Eyebrow } from '@/components/brand'
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
            <Eyebrow>THE U DRIVE FLEET / {v.label.toUpperCase()}</Eyebrow>
            <h1 className="display page-title">{v.name}.</h1>
          </div>
          <div className="model-base">
            <MapPin size={16} /> Kathmandu + all Nepal
          </div>
        </div>
        <div className="model-intro-grid">
          <VehicleGallery vehicle={v} />
          <section className="model-dossier">
            <p className="overline">DAILY VEHICLE RATE</p>
            <p className="dossier-price">
              {money(v.rate)}
              <span> / day</span>
            </p>
            <h2>Meet the {v.name}.</h2>
            <p>{v.introduction}</p>
            <dl className="dossier-facts">
              <div>
                <dt>Rental modes</dt>
                <dd>Self Drive / With Driver</dd>
              </div>
              <div>
                <dt>Pickup & delivery</dt>
                <dd>Arranged with U Drive</dd>
              </div>
              <div>
                <dt>Availability</dt>
                <dd>Confirmed on request</dd>
              </div>
            </dl>
            <Link className="action action-gold" href={booking}>
              Book Now <ArrowRight />
            </Link>
            <a
              className="model-enquiry"
              href={whatsappLink(`Hello U Drive, I have a question about renting the ${v.name}.`)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={16} /> Ask about this car
            </a>
          </section>
        </div>
        <VehicleSpecs vehicle={v} />
        <section className="model-request">
          <div className="model-request-copy">
            <Eyebrow>BOOK THIS MODEL</Eyebrow>
            <h2 className="editorial-title">Make it your drive.</h2>
            <p>
              Set your dates and preferred rental mode. Review your estimate before sending your
              request to the Kathmandu team.
            </p>
            <FAQAccordion
              questions={[
                {
                  q: 'How is my estimate calculated?',
                  a: `The daily vehicle rate of ${money(v.rate)} is multiplied by the number of rental days. A same-day rental is estimated as one day. Final arrangements are agreed directly with U Drive.`,
                },
                {
                  q: 'Can I request delivery?',
                  a: 'Yes. Enter your preferred meeting point in the booking form. The team will confirm the delivery location and timing for your itinerary.',
                },
              ]}
            />
          </div>
          <VehicleBookingPanel vehicle={v} trip={trip} />
        </section>
        <section className="related-models">
          <div className="section-heading-row">
            <div>
              <Eyebrow>KEEP EXPLORING</Eyebrow>
              <h2 className="editorial-title">Also in the fleet.</h2>
            </div>
            <TextLink href="/fleet">All vehicles</TextLink>
          </div>
          <div className="related-grid">
            {vehicles
              .filter((car) => car.slug !== v.slug)
              .map((car) => (
                <VehicleCard key={car.slug} vehicle={car} />
              ))}
          </div>
        </section>
      </div>
      <div className="mobile-model-action">
        <span>
          <small>DAILY RATE</small>
          <strong>
            {money(v.rate)} <em>/ day</em>
          </strong>
        </span>
        <Link className="action action-gold" href={booking}>
          Book this car <ArrowUpRight />
        </Link>
      </div>
    </main>
  )
}
