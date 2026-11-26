import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, BadgeCheck, MapPin, MessagesSquare, Route } from 'lucide-react'
import { TextLink } from './editorial'
import { ReviewCarousel } from './review-carousel'

const reasons = [
  {
    Icon: BadgeCheck,
    title: 'Daily rates in plain view',
    body: 'Every model lists its rate in rupees, and your estimate updates as you choose your dates.',
  },
  {
    Icon: Route,
    title: 'Self drive or with driver',
    body: 'Take the keys yourself, or travel with a professional driver. Either works with any car.',
  },
  {
    Icon: MapPin,
    title: 'A handover that suits you',
    body: 'Agree a pickup point in Kathmandu, or request delivery elsewhere in Nepal.',
  },
  {
    Icon: MessagesSquare,
    title: 'A direct line to the team',
    body: 'Send your request by WhatsApp or email. The Kathmandu team confirms the details with you.',
  },
]

export function HomeStory() {
  return (
    <section className="why-section section-space" aria-labelledby="why-heading">
      <div className="shell why-grid">
        <div className="why-media" data-reveal>
          <div className="why-photo-main">
            <Image
              src="/images/kathmandu.webp"
              alt="Warm brick rooftops and pagodas across the Kathmandu valley"
              fill
              sizes="(max-width: 900px) 92vw, 40vw"
            />
            <span className="story-place">
              <MapPin size={14} aria-hidden="true" /> Kathmandu Valley, Nepal
            </span>
          </div>
          <div className="why-photo-inset">
            <Image
              src="/images/mountain-tall.webp"
              alt="A Deepal S05 on a mountain road with snow peaks at sunrise"
              fill
              sizes="(max-width: 900px) 42vw, 18vw"
            />
          </div>
        </div>
        <div className="why-copy" data-reveal>
          <p className="drive-eyebrow">Why choose U Drive</p>
          <h2 id="why-heading" className="drive-section-title">
            Kathmandu roots. Open-road possibilities.
          </h2>
          <p className="body-copy">
            We’re a Kathmandu-based rental service for people who want to explore Nepal their own
            way. Choose the keys or the passenger seat. We’ll work out the details with you.
          </p>
          <dl className="why-list">
            {reasons.map(({ Icon, title, body }) => (
              <div key={title}>
                <dt>
                  <Icon size={20} aria-hidden="true" />
                  {title}
                </dt>
                <dd>{body}</dd>
              </div>
            ))}
          </dl>
          <TextLink href="/about">Get to know U Drive</TextLink>
        </div>
      </div>
    </section>
  )
}

export function ReviewPreview() {
  return (
    <section className="reviews-section section-space" aria-labelledby="reviews-heading">
      <div className="shell">
        <div className="drive-section-head" data-reveal>
          <div>
            <p className="drive-eyebrow">Traveller reviews</p>
            <h2 id="reviews-heading" className="drive-section-title">
              Stories from the road.
            </h2>
          </div>
          <Link href="/reviews" className="drive-section-link">
            All reviews <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <ReviewCarousel />
      </div>
    </section>
  )
}
