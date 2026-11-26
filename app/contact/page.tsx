import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Breadcrumbs, PageIntro } from '@/components/editorial'
import { FacebookIcon } from '@/components/brand'
import { ContactChannels } from '@/components/contact-channels'
import { EnquiryForm } from '@/components/enquiry-form'
import { business } from '@/lib/fleet'
import { pageMeta } from '@/lib/site'

export const metadata = pageMeta(
  'Contact the Kathmandu Rental Team',
  'Contact U Drive Rental Car Kathmandu by phone, WhatsApp, or email. Ask about vehicles, itineraries, pickup locations, and delivery across Nepal.',
  '/contact',
  '/images/kathmandu.webp',
)
export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string }>
}) {
  const q = await searchParams
  return (
    <main id="main-content">
      <div className="shell">
        <Breadcrumbs items={[{ label: 'Contact' }]} />
        <div className="contact-layout">
          <div>
            <PageIntro label="Contact U Drive" title="Let’s talk travel.">
              A question about a car, a route, or a handover? Speak directly with the Kathmandu
              team.
            </PageIntro>
            <ContactChannels />
            <p className="contact-organic">
              {business.name}
              <br />
              <a
                className="text-action"
                href={business.facebook}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FacebookIcon size={16} /> Find us on Facebook{' '}
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </p>
          </div>
          <EnquiryForm delivery={q.topic === 'delivery'} />
        </div>
        <div className="contact-booking">
          <div>
            <h2>Already have a car in mind?</h2>
            <p>Choose your dates and see a live rental estimate.</p>
          </div>
          <Link href="/booking" className="action action-gold">
            Book a Car <ArrowRight />
          </Link>
        </div>
      </div>
    </main>
  )
}
