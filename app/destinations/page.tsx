import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, MapPin } from 'lucide-react'
import { Breadcrumbs, CTASection, FAQAccordion } from '@/components/editorial'
import { DestinationBrowser } from '@/components/destination-browser'
import { pageMeta } from '@/lib/site'

export const metadata = pageMeta(
  'Destinations — Kathmandu & Across Nepal',
  'Explore eight Nepal destination guides and plan your road journey with U Drive. Discover heritage cities, lakeside escapes, and Himalayan gateways.',
  '/destinations',
  '/images/destinations/pokhara.webp',
)
export default function DestinationsPage() {
  return (
    <main id="main-content">
      <div className="shell">
        <Breadcrumbs items={[{ label: 'Destinations' }]} />
      </div>
      <section className="destination-cover">
        <Image
          src="/images/destinations/pokhara.webp"
          alt="Phewa Lake in Pokhara"
          fill
          sizes="100vw"
          priority
        />
        <div className="destination-cover-shade" />
        <div className="shell">
          <p className="journey-kicker">
            <MapPin size={15} /> NEPAL TRAVEL GUIDE
          </p>
          <h1>
            Kathmandu starts it.
            <br />
            <em>Nepal awaits.</em>
          </h1>
          <p>
            Eight places to shape your itinerary. Choose a destination, explore the road ahead, and
            plan your rental with our Kathmandu team.
          </p>
          <span className="photo-caption">Phewa Lake · Pokhara</span>
        </div>
      </section>
      <DestinationBrowser />
      <section className="route-planning-note">
        <div className="shell section-space editorial-split">
          <div>
            <p className="drive-eyebrow">Service & delivery</p>
            <h2 className="drive-section-title">A route built around you.</h2>
            <p className="body-copy">
              Start in Kathmandu or request another handover point. We agree the vehicle, road
              access, and delivery details for your itinerary before confirmation.
            </p>
            <Link href="/contact?topic=delivery" className="text-action">
              Discuss your route <ArrowUpRight size={15} />
            </Link>
          </div>
          <FAQAccordion
            questions={[
              {
                q: 'Are these U Drive branches?',
                a: 'No. The locations in our guides are destinations you can discuss with the Kathmandu team. Collection and delivery points are agreed for each rental.',
              },
              {
                q: 'Can every car travel on every route?',
                a: 'No. Road conditions, access rules, range, and the specific vehicle matter. U Drive will confirm whether your route and preferred rental mode are suitable.',
              },
              {
                q: 'Can I plan a one-way trip?',
                a: 'Add a different return location to your request. The team will confirm whether the handover can be arranged and what it will cost.',
              },
            ]}
          />
        </div>
      </section>
      <CTASection title="Take the scenic route." />
    </main>
  )
}
