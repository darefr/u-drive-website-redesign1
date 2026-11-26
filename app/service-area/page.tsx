import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, MapPin, Route } from 'lucide-react'
import { Breadcrumbs, CTASection, PageIntro, TextLink } from '@/components/editorial'
import { Eyebrow } from '@/components/brand'
import { DestinationCard } from '@/components/destination-card'
import { destinations } from '@/lib/destinations'
import { pageMeta } from '@/lib/site'

export const metadata = pageMeta(
  'Service Area — Kathmandu & All Nepal',
  'Request car rental pickup in Kathmandu or delivery across Nepal. Share your dates, destination, and preferred meeting point with U Drive.',
  '/service-area',
  '/images/kathmandu.webp',
)

const featuredGuides = ['pokhara', 'chitwan', 'mustang']

export default function ServiceAreaPage() {
  const guides = destinations.filter((d) => featuredGuides.includes(d.slug))
  return (
    <main id="main-content">
      <div className="shell">
        <Breadcrumbs items={[{ label: 'Service area' }]} />
        <PageIntro label="Our service area" title="Kathmandu + all Nepal.">
          A Kathmandu starting point. A Nepal-wide service. Tell us where your journey begins and
          we’ll work out the handover with you.
        </PageIntro>
        <div className="area-diptych">
          <figure>
            <Image
              src="/images/kathmandu.webp"
              alt="Layered pagoda rooftops and the hills of the Kathmandu valley"
              fill
              sizes="(max-width: 700px) 92vw, 55vw"
              priority
            />
            <figcaption>
              <MapPin aria-hidden="true" />
              <span>
                <small>Our base</small>Kathmandu
              </span>
            </figcaption>
          </figure>
          <figure>
            <Image
              src="/images/nepal-high-road.webp"
              alt="A mountain road lined with prayer flags, with snow peaks catching the last light"
              fill
              sizes="(max-width: 700px) 92vw, 40vw"
            />
            <figcaption>
              <Route aria-hidden="true" />
              <span>
                <small>Service & delivery</small>Across Nepal
              </span>
            </figcaption>
          </figure>
        </div>
        <section className="section-space editorial-split" aria-labelledby="delivery-heading">
          <div>
            <Eyebrow>Vehicle delivery</Eyebrow>
            <h2 id="delivery-heading" className="editorial-title">
              Where should we meet you?
            </h2>
            <p className="body-copy">
              Request a handover at your preferred location. Delivery and collection are arranged
              for each booking, rather than assumed from a standard coverage list.
            </p>
            <Link className="action action-dark editorial-action" href="/contact?topic=delivery">
              Discuss Your Location <ArrowRight />
            </Link>
          </div>
          <div className="brief-list">
            <h3>Your delivery brief</h3>
            <dl>
              <div>
                <dt>Pickup point</dt>
                <dd>Your hotel, neighbourhood, or preferred meeting place.</dd>
              </div>
              <div>
                <dt>Dates & route</dt>
                <dd>Your pickup and return dates, destination, and any planned stops.</dd>
              </div>
              <div>
                <dt>Rental mode</dt>
                <dd>Self Drive or With Driver, with the model you have in mind.</dd>
              </div>
              <div>
                <dt>Confirmation</dt>
                <dd>U Drive confirms timing, availability, and delivery terms before handover.</dd>
              </div>
            </dl>
            <TextLink href="/booking">Include delivery in a booking</TextLink>
          </div>
        </section>
        <section className="guide-more" aria-labelledby="journeys-heading">
          <div className="drive-section-head">
            <div>
              <p className="drive-eyebrow">Beyond the valley</p>
              <h2 id="journeys-heading" className="drive-section-title">
                Journeys to plan from Kathmandu.
              </h2>
            </div>
            <Link href="/destinations" className="drive-section-link">
              All destinations <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="destination-directory">
            {guides.map((d) => (
              <DestinationCard key={d.slug} destination={d} />
            ))}
          </div>
          <p className="image-note">
            Guides are travel inspiration, not branch locations. Routes and vehicle suitability are
            confirmed for each booking.
          </p>
        </section>
      </div>
      <CTASection />
    </main>
  )
}
