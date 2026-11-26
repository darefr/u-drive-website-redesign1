import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Check, UserRound } from 'lucide-react'
import { Eyebrow, WheelIcon } from './brand'
import { TextLink } from './editorial'
import { bookingLink, type RentalMode } from '@/lib/fleet'

const modes: {
  mode: RentalMode
  href: string
  label: string
  title: string
  copy: string
  image: string
  alt: string
  points: string[]
  book: string
  learn: string
}[] = [
  {
    mode: 'self-drive',
    href: '/self-drive',
    label: 'Self Drive',
    title: 'Take the wheel.',
    copy: 'Your route, your stops, your own pace. Choose a model, share your plans, and collect the keys.',
    image: '/images/mode-self-drive.webp',
    alt: 'A driver’s view over the steering wheel of a winding road through terraced hills',
    points: [
      'You drive the rental car yourself',
      'Choose any model at its daily rate',
      'Pickup in Kathmandu, or request delivery',
      'Requirements confirmed during booking',
    ],
    book: 'Book Self Drive',
    learn: 'How self drive works',
  },
  {
    mode: 'with-driver',
    href: '/with-driver',
    label: 'With Driver',
    title: 'Take in the view.',
    copy: 'A car and a professional driver, arranged around your itinerary. Settle in and watch Nepal go by.',
    image: '/images/mode-with-driver.webp',
    alt: 'A passenger looking out at the mountains from the back seat while a driver takes the wheel',
    points: [
      'A professional driver takes the wheel',
      'Suited to sightseeing and longer journeys',
      'Airport and hotel pickups arranged',
      'Driver terms confirmed before you book',
    ],
    book: 'Book With Driver',
    learn: 'How with driver works',
  },
]

export function RentalOptions() {
  return (
    <section className="modes-section section-space" aria-labelledby="modes-heading">
      <div className="shell">
        <div className="section-heading-row" data-reveal>
          <div>
            <Eyebrow>Rental options</Eyebrow>
            <h2 id="modes-heading" className="editorial-title">
              Two ways to travel.
            </h2>
          </div>
          <p className="section-aside">
            The same cars and the same daily rates. The only question is who you would like behind
            the wheel.
          </p>
        </div>
        <div className="mode-duel">
          {modes.map((m, i) => (
            <article
              className="mode-panel"
              data-mode={m.mode}
              key={m.mode}
              data-reveal
              style={{ '--reveal-delay': `${i * 120}ms` } as React.CSSProperties}
            >
              <div className="mode-photo">
                <Image src={m.image} alt={m.alt} fill sizes="(max-width: 900px) 94vw, 46vw" />
                <span className="mode-tag">
                  {m.mode === 'self-drive' ? <WheelIcon size={16} /> : <UserRound size={16} />}
                  {m.label}
                </span>
              </div>
              <div className="mode-body">
                <h3>{m.title}</h3>
                <p>{m.copy}</p>
                <ul className="mode-points">
                  {m.points.map((point) => (
                    <li key={point}>
                      <Check size={15} aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
                <div className="action-row">
                  <Link
                    className={`action ${m.mode === 'self-drive' ? 'action-dark' : 'action-gold'}`}
                    href={bookingLink(undefined, m.mode)}
                  >
                    {m.book} <ArrowRight />
                  </Link>
                  <TextLink href={m.href}>{m.learn}</TextLink>
                </div>
              </div>
            </article>
          ))}
          <span className="mode-or" aria-hidden="true">
            or
          </span>
        </div>
      </div>
    </section>
  )
}
