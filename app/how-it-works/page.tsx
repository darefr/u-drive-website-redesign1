import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Breadcrumbs, CTASection, TextLink } from '@/components/editorial'
import { Eyebrow } from '@/components/brand'
import { ProcessTimeline } from '@/components/process-timeline'
import { pageMeta } from '@/lib/site'

export const metadata = pageMeta(
  'How Car Rental Works',
  'Follow the six steps from choosing a U Drive rental car to pickup or delivery. Understand rental requests, estimates, and personal confirmation.',
  '/how-it-works',
)
export default function HowItWorksPage() {
  return (
    <main id="main-content">
      <div className="shell">
        <Breadcrumbs items={[{ label: 'How it works' }]} />
        <div className="journey-layout">
          <div className="journey-intro">
            <Eyebrow>How it works</Eyebrow>
            <h1 className="display page-title">
              From plans
              <br />
              <em>to keys.</em>
            </h1>
            <p className="body-copy">
              Six steps from your first look at the fleet to your agreed pickup. A request starts
              the conversation; U Drive confirms the rental.
            </p>
            <div className="journey-image">
              <Image
                src="/images/nepal-road.webp"
                alt="A winding road leading into the hills of Nepal"
                fill
                sizes="(max-width: 900px) 92vw, 36vw"
                priority
              />
            </div>
            <div className="action-row">
              <Link className="action action-gold" href="/booking">
                Start a Booking Request <ArrowRight />
              </Link>
              <TextLink href="/faq">Read the rental FAQ</TextLink>
            </div>
          </div>
          <ProcessTimeline />
        </div>
      </div>
      <CTASection scene="dusk" />
    </main>
  )
}
