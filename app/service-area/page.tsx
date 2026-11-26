import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, MapPin, Route } from 'lucide-react'
import { Breadcrumbs, CTASection, PageIntro, TextLink } from '@/components/editorial'
import { Eyebrow } from '@/components/brand'
import { pageMeta } from '@/lib/site'

export const metadata = pageMeta(
  'Service Area — Kathmandu & All Nepal',
  'Request car rental pickup in Kathmandu or delivery across Nepal. Share your dates, destination, and preferred meeting point with U Drive.',
  '/service-area',
  '/images/kathmandu.webp',
)
export default function ServiceAreaPage() {
  return (
    <main id="main-content">
      <div className="shell">
        <Breadcrumbs items={[{ label: 'Service area' }]} />
        <PageIntro label="OUR SERVICE AREA" title="Kathmandu + All Nepal.">
          A Kathmandu starting point. A Nepal-wide service. Tell us where your journey begins and
          we’ll work out the handover with you.
        </PageIntro>
        <div className="area-diptych">
          <figure>
            <Image
              src="/images/kathmandu.webp"
              alt="Layered pagoda rooftops and the hills of the Kathmandu valley"
              fill
              sizes="(max-width:680px) 90vw, 55vw"
              priority
            />
            <figcaption>
              <MapPin />
              <span>
                <small>OUR BASE</small>Kathmandu
              </span>
            </figcaption>
          </figure>
          <figure>
            <Image
              src="/images/nepal-road.webp"
              alt="An open road winding between the hills of Nepal"
              fill
              sizes="(max-width:680px) 90vw, 40vw"
            />
            <figcaption>
              <Route />
              <span>
                <small>SERVICE & DELIVERY</small>Across Nepal
              </span>
            </figcaption>
          </figure>
        </div>
        <section className="section-space editorial-split">
          <div>
            <Eyebrow>VEHICLE DELIVERY</Eyebrow>
            <h2 className="editorial-title">
              Where should
              <br />
              we meet you?
            </h2>
            <p className="body-copy">
              Request a handover at your preferred location. Delivery and collection are arranged
              for each booking, rather than assumed from a standard coverage list.
            </p>
            <Link className="action action-dark editorial-action" href="/contact?topic=delivery">
              Discuss your location <ArrowRight />
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
      </div>
      <CTASection />
    </main>
  )
}
