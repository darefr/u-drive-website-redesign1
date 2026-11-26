import { HomeHero } from '@/components/home-hero'
import { QuickPlanner } from '@/components/quick-planner'
import { FleetShowcase } from '@/components/fleet-showcase'
import { StatsCounter } from '@/components/stats-counter'
import { RentalOptions } from '@/components/rental-options'
import { DestinationPreview } from '@/components/destination-card'
import { ServiceArea } from '@/components/service-area'
import { HomeStory, ReviewPreview } from '@/components/home-story'
import { ProcessPreview } from '@/components/process-timeline'
import { HomeFaq } from '@/components/home-faq'
import { CTASection } from '@/components/editorial'
import { business, vehicles } from '@/lib/fleet'
import { pageMeta } from '@/lib/site'

export const metadata = pageMeta(
  'Car Rental in Kathmandu — Drive Your Journey Across Nepal',
  'Compare four rental cars from NPR 6,500/day, choose self-drive or a driver, and plan a journey from Kathmandu across Nepal. Explore vehicles, destination guides, and trip estimates.',
  '/',
)
export default function HomePage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'AutoRental',
    name: business.name,
    telephone: business.phone,
    email: business.email,
    logo: '/brand/u-drive-user-logo.png',
    address: { '@type': 'PostalAddress', addressLocality: 'Kathmandu', addressCountry: 'NP' },
    areaServed: { '@type': 'Country', name: 'Nepal' },
    sameAs: [business.facebook],
    currenciesAccepted: 'NPR',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Daily vehicle rentals',
      itemListElement: vehicles.map((v) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: `${v.name} rental` },
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: v.rate,
          priceCurrency: 'NPR',
          unitText: 'day',
        },
      })),
    },
  }
  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}
      />
      <HomeHero />
      <QuickPlanner />
      <FleetShowcase />
      <StatsCounter />
      <RentalOptions />
      <DestinationPreview />
      <ServiceArea />
      <HomeStory />
      <ProcessPreview />
      <ReviewPreview />
      <HomeFaq />
      <CTASection />
    </main>
  )
}
