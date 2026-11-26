import Link from 'next/link'
import { ArrowRight, Clock3 } from 'lucide-react'
import { WhatsAppIcon } from './brand'
import { MessageHandoff } from './message-handoff'
import { modeName, money, whatsappLink, type Vehicle } from '@/lib/fleet'
import { prettyDate, rentalDays, type RentalRequest } from '@/lib/rental-request'

type Props = { request: RentalRequest; vehicle: Vehicle }
function summary({ request: r, vehicle: v }: Props) {
  const days = rentalDays(r.pickupDate, r.returnDate) ?? 0
  return [
    ['Vehicle', v.name],
    ['Rental mode', modeName(r.mode)],
    ['Pickup date', prettyDate(r.pickupDate)],
    ['Return date', prettyDate(r.returnDate)],
    [
      'Handover preference',
      r.handover === 'delivery' ? 'Vehicle delivery requested' : 'Collect the vehicle',
    ],
    ...(r.pickupTime ? [['Preferred pickup time (Nepal)', r.pickupTime]] : []),
    ['Pickup / delivery', r.pickupLocation.trim()],
    ['Return location', r.sameReturn ? r.pickupLocation.trim() : r.returnLocation.trim()],
    ['Daily vehicle rate', `${money(v.rate)} / day`],
    ['Rental duration', `${days} ${days === 1 ? 'day' : 'days'}`],
    ['Estimated total', money(days * v.rate)],
    ['Customer name', r.name.trim()],
    ['Phone number', r.phone.trim()],
    ['Email', r.email.trim()],
    ...(r.notes.trim() ? [['Additional message', r.notes.trim()]] : []),
  ]
}
export function InquiryReview({ request, vehicle, onSent }: Props & { onSent: () => void }) {
  const rows = summary({ request, vehicle })
  const message = [
    'Hello U Drive, I would like to submit a booking request.',
    '',
    ...rows.map(([k, v]) => `${k}: ${v}`),
    '',
    'Please confirm availability, the final rental terms, and the pickup or delivery arrangements.',
  ].join('\n')
  return (
    <div className="inquiry-review">
      <p className="review-intro">
        Check your trip, estimate, and contact details before sending. This is a request, not a
        confirmed reservation.
      </p>
      <dl className="review-list">
        {rows.map(([k, v]) => (
          <div key={k}>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
      <MessageHandoff
        message={message}
        subject={`Booking request — ${vehicle.name}`}
        sendLabel="Request Booking on WhatsApp"
        onSent={onSent}
      />
    </div>
  )
}
export function RequestReceipt({ request, vehicle }: Props) {
  const rows = summary({ request, vehicle })
  return (
    <div className="request-receipt">
      <span className="receipt-status">
        <Clock3 size={16} aria-hidden="true" /> Awaiting confirmation
      </span>
      <p>
        You marked your booking request as sent. Your car is <strong>not reserved yet</strong>. U
        Drive will confirm the vehicle, dates, pickup, and final terms with you.
      </p>
      <dl className="review-list">
        {rows.map(([k, v]) => (
          <div key={k}>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
      <a
        className="action action-outline"
        target="_blank"
        rel="noopener noreferrer"
        href={whatsappLink(
          `Hello U Drive, I’m following up on my request for the ${vehicle.name}, ${prettyDate(request.pickupDate)} to ${prettyDate(request.returnDate)}.`,
        )}
      >
        <WhatsAppIcon /> Contact U Drive
      </a>
      <div className="receipt-links">
        <Link className="text-action" href="/fleet">
          Return to fleet <ArrowRight size={15} />
        </Link>
        <Link className="back-link" href="/">
          Return home
        </Link>
      </div>
    </div>
  )
}
