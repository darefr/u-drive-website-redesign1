import { Breadcrumbs, CTASection, PageIntro } from '@/components/editorial'
import { FleetCatalogue } from '@/components/fleet-catalogue'
import { vehicles } from '@/lib/fleet'
import { pageMeta } from '@/lib/site'

export const metadata = pageMeta(
  'Our Fleet — Car Rental Kathmandu',
  'Compare the Deepal S05, BYD Atto 3, Tata Nexon, and BYD Atto 1. Explore daily rental rates from NPR 6,500 and request your preferred car.',
  '/fleet',
  '/images/deepal-s05.webp',
)
import { readTripSearch, type QueryValues } from '@/lib/trip-search'
import { todayInNepal } from '@/lib/rental-request'

export default async function FleetPage({ searchParams }: { searchParams: Promise<QueryValues> }) {
  const q = await searchParams
  const trip = Object.keys(q).length ? readTripSearch(q, todayInNepal()) : undefined
  return (
    <main id="main-content">
      <div className="shell">
        <Breadcrumbs items={[{ label: 'Our fleet' }]} />
        <div className="catalogue-intro">
          <PageIntro label="The U Drive collection" title="Our fleet.">
            Four cars, two ways to travel. Explore each model and find the right daily rate for your
            journey.
          </PageIntro>
          <p className="collection-count">
            <strong>{String(vehicles.length).padStart(2, '0')}</strong> vehicles
          </p>
        </div>
        <FleetCatalogue key={JSON.stringify(trip)} trip={trip} />
        <p className="catalogue-footnote">
          Daily vehicle rates are shown in Nepalese rupees. Availability, driver arrangements, and
          delivery are confirmed for your booking. Vehicle images are illustrative.
        </p>
      </div>
      <CTASection />
    </main>
  )
}
