import Link from 'next/link'
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'
import { Brand, FacebookIcon, WhatsAppIcon } from './brand'
import { business, money, vehicles, whatsappLink } from '@/lib/fleet'
import { destinations } from '@/lib/destinations'

const rentalLinks = [
  { label: 'Self Drive', href: '/self-drive' },
  { label: 'With Driver', href: '/with-driver' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Service Area', href: '/service-area' },
]
const companyLinks = [
  { label: 'About U Drive', href: '/about' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
  { label: 'Privacy & enquiries', href: '/privacy' },
]

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-top">
          <div className="footer-identity">
            <Brand reversed />
            <p>
              Self-drive and driver-assisted car rentals from Kathmandu. Choose your car, plan your
              route, and explore Nepal at your own pace.
            </p>
          </div>
          <div className="footer-reach">
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon />
              <span>
                <small>WhatsApp</small>
                Chat with U Drive
              </span>
            </a>
            <a href={`tel:${business.phone}`}>
              <Phone aria-hidden="true" />
              <span>
                <small>Call</small>
                {business.phoneDisplay}
              </span>
            </a>
            <a href={`mailto:${business.email}`}>
              <Mail aria-hidden="true" />
              <span>
                <small>Email</small>
                {business.email}
              </span>
            </a>
          </div>
        </div>
        <div className="footer-grid">
          <nav className="footer-column" aria-labelledby="footer-fleet">
            <h2 id="footer-fleet">Our fleet</h2>
            {vehicles.map((v) => (
              <Link key={v.slug} href={`/fleet/${v.slug}`}>
                {v.name}
                <small>{money(v.rate)}/day</small>
              </Link>
            ))}
            <Link href="/fleet">
              All vehicles <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </nav>
          <nav className="footer-column" aria-labelledby="footer-rental">
            <h2 id="footer-rental">Rental options</h2>
            {rentalLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
            <Link href="/booking">
              Book a Car <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </nav>
          <nav className="footer-column footer-destinations" aria-labelledby="footer-destinations">
            <h2 id="footer-destinations">Destinations</h2>
            <ul>
              {destinations.map((d) => (
                <li key={d.slug}>
                  <Link href={`/destinations/${d.slug}`}>{d.name}</Link>
                </li>
              ))}
            </ul>
            <Link href="/destinations">
              All destinations <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </nav>
          <nav className="footer-column" aria-labelledby="footer-company">
            <h2 id="footer-company">Company</h2>
            {companyLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="footer-base">
          <span>
            © {new Date().getFullYear()} {business.name}
          </span>
          <span>
            <MapPin size={14} aria-hidden="true" /> Kathmandu, Nepal
          </span>
          <a href={business.facebook} target="_blank" rel="noopener noreferrer">
            <FacebookIcon size={15} /> Facebook
          </a>
        </div>
      </div>
    </footer>
  )
}
