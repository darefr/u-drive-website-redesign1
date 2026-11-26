import { pageMeta } from '@/lib/site'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Eyebrow } from '@/components/brand'
import { business } from '@/lib/fleet'

export const metadata = pageMeta(
  'Privacy & Rental Enquiries',
  'How your rental request is prepared, reviewed, and shared directly with U Drive Rental Car Kathmandu.',
  '/privacy',
)
export default function PrivacyPage() {
  return (
    <main id="main-content" className="simple-page shell">
      <Link href="/" className="back-link">
        <ArrowLeft size={16} />
        Back to home
      </Link>
      <Eyebrow>YOUR INFORMATION</Eyebrow>
      <h1 className="display section-title">PRIVACY & INQUIRIES.</h1>
      <div className="prose-copy">
        <h2>Preparing your rental inquiry</h2>
        <p>
          Your vehicle, dates, contact details, and notes stay in the current booking form while you
          prepare your request. The website does not save the form to a booking database or your
          browser’s local storage.
        </p>
        <h2>Contacting the team</h2>
        <p>
          When you choose WhatsApp or email, your selected service opens with the details you
          reviewed. You decide whether to send the message. That service’s privacy policy applies,
          and delivery is handled by that service. Marking a request as sent on this site is your
          own acknowledgement, not verification of delivery or a confirmed booking.
        </p>
        <h2>Site operation</h2>
        <p>
          Hosting and privacy-focused traffic analytics help operate this site. Your booking form
          contents are not included in analytics events.
        </p>
        <h2>Questions about your information?</h2>
        <p>
          Contact U Drive directly at <a href={`mailto:${business.email}`}>{business.email}</a> or{' '}
          <a href={`tel:${business.phone}`}>{business.phoneDisplay}</a>.
        </p>
      </div>
    </main>
  )
}
