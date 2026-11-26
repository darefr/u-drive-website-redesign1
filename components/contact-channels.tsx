import Link from 'next/link'
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'
import { WhatsAppIcon } from './brand'
import { business, whatsappLink } from '@/lib/fleet'

/** Lets a long address wrap at the @ sign instead of mid-word. */
export function EmailAddress({ address }: { address: string }) {
  const [name, domain] = address.split('@')
  return (
    <>
      {name}
      <wbr />@{domain}
    </>
  )
}

export function ContactChannels() {
  return (
    <div className="contact-channels">
      <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
        <WhatsAppIcon />
        <span>
          <small>WhatsApp</small>Chat with U Drive
        </span>
        <ArrowUpRight aria-hidden="true" />
      </a>
      <a href={`tel:${business.phone}`}>
        <Phone aria-hidden="true" />
        <span>
          <small>Call the team</small>
          {business.phoneDisplay}
        </span>
        <ArrowUpRight aria-hidden="true" />
      </a>
      <a href={`mailto:${business.email}`}>
        <Mail aria-hidden="true" />
        <span>
          <small>Email</small>
          <EmailAddress address={business.email} />
        </span>
        <ArrowUpRight aria-hidden="true" />
      </a>
      <Link href="/service-area">
        <MapPin aria-hidden="true" />
        <span>
          <small>Service area</small>Kathmandu + all Nepal
        </span>
        <ArrowUpRight aria-hidden="true" />
      </Link>
    </div>
  )
}
