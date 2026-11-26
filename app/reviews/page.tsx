import Link from 'next/link'
import { ArrowUpRight, MessageCircle } from 'lucide-react'
import { Breadcrumbs, CTASection } from '@/components/editorial'
import { ReviewCarousel } from '@/components/review-carousel'
import { business } from '@/lib/fleet'
import { reviews } from '@/lib/reviews'
import { pageMeta } from '@/lib/site'

export const metadata = pageMeta(
  'Traveller Reviews & Stories',
  'Explore the U Drive traveller journal, find the official business profile, and ask the Kathmandu team about planning your rental.',
  '/reviews',
  '/images/destinations/pokhara.webp',
)
export default function ReviewsPage() {
  const sampleOnly = reviews.every((review) => review.sample)
  return (
    <main id="main-content">
      <div className="shell">
        <Breadcrumbs items={[{ label: 'Reviews' }]} />
        <section className="reviews-page-intro">
          <p className="drive-eyebrow">The traveller journal</p>
          <h1 className="drive-section-title">Stories from the road.</h1>
          <p>
            {sampleOnly
              ? 'A preview of our traveller review collection. The stories below are illustrative examples, not verified customer feedback.'
              : 'Journeys and perspectives from the U Drive community. Illustrative examples are individually labelled.'}
          </p>
        </section>
        <ReviewCarousel />
        <div className="review-community">
          <div>
            <MessageCircle size={22} aria-hidden="true" />
            <h2>Travelled with U Drive?</h2>
            <p>
              Visit our official Facebook page to share your experience, or contact the team about a
              recent rental.
            </p>
          </div>
          <div className="action-row">
            <a
              href={business.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="action action-dark"
            >
              Visit Facebook <ArrowUpRight />
            </a>
            <Link href="/contact" className="action action-outline">
              Contact the team
            </Link>
          </div>
        </div>
      </div>
      <CTASection />
    </main>
  )
}
