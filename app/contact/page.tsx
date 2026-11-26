import Link from 'next/link'
import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { Breadcrumbs, PageIntro } from '@/components/editorial'
import { EnquiryForm } from '@/components/enquiry-form'
import { business, whatsappLink } from '@/lib/fleet'
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
            <PageIntro label="CONTACT U DRIVE" title="Let’s talk travel.">
              A question about a car, a route, or a handover? Speak directly with the Kathmandu
              team.
            </PageIntro>
            <div className="contact-channels">
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                <MessageCircle />
                <span>
                  <small>WHATSAPP</small>Chat with U Drive
                </span>
                <ArrowUpRight />
              </a>
              <a href={`tel:${business.phone}`}>
                <Phone />
                <span>
                  <small>CALL THE TEAM</small>
                  {business.phoneDisplay}
                </span>
                <ArrowUpRight />
              </a>
              <a href={`mailto:${business.email}`}>
                <Mail />
                <span>
                  <small>EMAIL</small>
                  {business.email}
                </span>
                <ArrowUpRight />
              </a>
              <Link href="/destinations">
                <MapPin />
                <span>
                  <small>SERVICE AREA</small>Kathmandu + All Nepal
                </span>
                <ArrowUpRight />
              </Link>
            </div>
            <p className="contact-organic">
              {business.name}
              <br />
              <a
                className="text-action"
                href={business.facebook}
                target="_blank"
                rel="noopener noreferrer"
              >
                Find us on Facebook <ArrowUpRight size={15} />
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
          <Link href="/booking" className="action action-dark">
            Book a Car <ArrowUpRight />
          </Link>
        </div>
      </div>
    </main>
  )
}
