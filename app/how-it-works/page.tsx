import Image from 'next/image'
import { Breadcrumbs, CTASection, TextLink } from '@/components/editorial'
import { Eyebrow } from '@/components/brand'
import { ProcessTimeline } from '@/components/process-timeline'
import { pageMeta } from '@/lib/site'

export const metadata = pageMeta(
  'How Car Rental Works',
  'Follow the five steps from choosing a U Drive rental car to pickup or delivery. Understand rental requests, estimates, and personal confirmation.',
  '/how-it-works',
)
export default function HowItWorksPage() {
  return (
    <main id="main-content">
      <div className="shell">
        <Breadcrumbs items={[{ label: 'How it works' }]} />
        <div className="journey-layout">
          <div className="journey-intro">
            <Eyebrow>HOW IT WORKS</Eyebrow>
            <h1 className="display page-title">
              FROM PLANS
              <br />
              TO KEYS.
            </h1>
            <p className="body-copy">
              Five steps from your first look at the fleet to your agreed pickup. A request starts
              the conversation; U Drive confirms the rental.
            </p>
            <div className="journey-image">
              <Image
                src="/images/nepal-road.webp"
                alt="A winding road leading into the hills of Nepal"
                fill
                sizes="(max-width:760px) 90vw, 30vw"
              />
            </div>
            <TextLink href="/booking">Start a booking request</TextLink>
          </div>
          <ProcessTimeline />
        </div>
      </div>
      <CTASection />
    </main>
  )
}
