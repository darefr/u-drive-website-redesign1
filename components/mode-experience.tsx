import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Info,
  Mountain,
  PlaneLanding,
  type LucideIcon,
} from 'lucide-react'
import { Eyebrow, WhatsAppIcon } from './brand'
import { Breadcrumbs, CTASection, FAQAccordion, TextLink, type Question } from './editorial'
import { Price } from './price'
import { bookingLink, vehicles, whatsappLink, type RentalMode } from '@/lib/fleet'

type ModeCopy = {
  name: string
  title: React.ReactNode
  intro: string
  image: string
  alt: string
  heading: string
  text: string
  // Steps are numbered in order; occasions are marked with an icon instead.
  points: { title: string; body: string; Icon?: LucideIcon }[]
  faqs: Question[]
  other: { mode: RentalMode; href: string; title: string; text: string; label: string }
}

const modeCopy: Record<RentalMode, ModeCopy> = {
  'self-drive': {
    name: 'Self Drive',
    title: (
      <>
        Self drive.
        <br />
        <em>Your pace.</em>
      </>
    ),
    intro:
      'Take the keys and make the route your own. Arrange a self-drive rental from Kathmandu for the journey you have in mind.',
    image: 'mode-self-drive',
    alt: 'A driver’s view over the steering wheel of a winding road through terraced hills',
    heading: 'The road is yours.',
    text: 'Self Drive means you drive the rental car yourself. Choose a model and dates, then share your itinerary so U Drive can confirm the arrangements for your trip.',
    points: [
      { title: 'Pick your vehicle', body: 'Choose the model and daily rate that suit your plans.' },
      {
        title: 'Share your plans',
        body: 'Tell us your dates, route, and preferred pickup point.',
      },
      {
        title: 'Confirm and collect',
        body: 'Agree the requirements and rental terms before handover.',
      },
    ],
    faqs: [
      {
        q: 'What do I need for a self-drive rental?',
        a: 'You need a driving licence valid for your intended journey in Nepal. Ask the team which licence and identity documents they need for your particular rental, and confirm the terms before collection.',
      },
      {
        q: 'Can I choose my pickup location?',
        a: 'Yes. Enter your preferred pickup or delivery location in your request. The team will confirm the meeting point with you.',
      },
      {
        q: 'Is my car reserved when I send a request?',
        a: 'No. Your request lets U Drive check the vehicle and dates. Your rental is confirmed only once the team agrees the details with you.',
      },
    ],
    other: {
      mode: 'with-driver',
      href: '/with-driver',
      title: 'Rather take in the view?',
      text: 'Every car in the fleet can also be arranged with a professional driver at the wheel.',
      label: 'Explore With Driver',
    },
  },
  'with-driver': {
    name: 'With Driver',
    title: (
      <>
        Sit back.
        <br />
        <em>Take it in.</em>
      </>
    ),
    intro:
      'A car and a professional driver, arranged around your itinerary. Enjoy the journey from Kathmandu to your destination.',
    image: 'mode-with-driver',
    alt: 'A passenger looking out at the mountains from the back seat while a driver takes the wheel',
    heading: 'Your plans. A driver at the wheel.',
    text: 'Choose a driver-assisted rental when you would rather focus on the people and places along the way. U Drive coordinates your vehicle, driver, and pickup for the itinerary you share.',
    points: [
      {
        Icon: Mountain,
        title: 'Sightseeing & longer journeys',
        body: 'Share the places you want to see, including overnight stops, so the team can check your route.',
      },
      {
        Icon: BriefcaseBusiness,
        title: 'Business travel',
        body: 'Plan your meetings and preferred pickup times while a professional driver takes the wheel.',
      },
      {
        Icon: PlaneLanding,
        title: 'Airport & hotel pickups',
        body: 'Include your arrival details and accommodation. The team will agree the exact meeting point and timing.',
      },
    ],
    faqs: [
      {
        q: 'Is a professional driver available?',
        a: 'Yes. Select With Driver in the booking form. Driver and vehicle availability are confirmed for your requested dates and itinerary.',
      },
      {
        q: 'Does the daily vehicle rate include the driver?',
        a: 'The published figure is the daily vehicle rate. U Drive will confirm your driver arrangement and the final rental amount before you book.',
      },
      {
        q: 'Can I arrange a journey outside Kathmandu?',
        a: 'Yes. U Drive offers rental and vehicle delivery services across Nepal. Share your itinerary so the team can confirm the details.',
      },
    ],
    other: {
      mode: 'self-drive',
      href: '/self-drive',
      title: 'Rather take the wheel?',
      text: 'Every car in the fleet can also be rented self-drive, at the same daily rate.',
      label: 'Explore Self Drive',
    },
  },
}

export function ModeExperience({ mode }: { mode: RentalMode }) {
  const m = modeCopy[mode]
  return (
    <main id="main-content">
      <div className="shell">
        <Breadcrumbs items={[{ label: m.name }]} />
      </div>
      <section className={`experience-hero on-dark ${mode}`}>
        <div className="experience-image">
          <Image
            src={`/images/${m.image}.webp`}
            alt={m.alt}
            fill
            sizes="(max-width: 700px) 100vw, 62vw"
            priority
          />
        </div>
        <div className="shell experience-hero-inner">
          <div className="experience-copy">
            <Eyebrow light>{m.name} rentals</Eyebrow>
            <h1 className="display">{m.title}</h1>
            <p>{m.intro}</p>
            <div className="action-row">
              <Link className="action action-gold action-lg" href={bookingLink(undefined, mode)}>
                Book {m.name} <ArrowRight />
              </Link>
              <Link className="action action-glass action-lg" href="/fleet">
                Explore Fleet <ArrowUpRight />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="shell section-space editorial-split">
        <div>
          <Eyebrow>The experience</Eyebrow>
          <h2 className="editorial-title">{m.heading}</h2>
          <p className="body-copy">{m.text}</p>
          {mode === 'self-drive' && (
            <p className="requirements-note">
              <Info size={17} aria-hidden="true" />
              Requirements will be confirmed during booking.
            </p>
          )}
        </div>
        <div className="mode-process">
          {m.points.map(({ title, body, Icon }, i) => (
            <div key={title}>
              {Icon ? <Icon aria-hidden="true" /> : <span aria-hidden="true">0{i + 1}</span>}
              <div>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="mode-fleet-section">
        <div className="shell section-space">
          <div className="section-heading-row">
            <div>
              <Eyebrow>Choose your car</Eyebrow>
              <h2 className="editorial-title">The rental line-up.</h2>
            </div>
            <Link href="/fleet" className="drive-section-link">
              Full catalogue <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="mode-fleet-list">
            {vehicles.map((v) => (
              <div key={v.slug}>
                <Link className="mode-car-name" href={`/fleet/${v.slug}`}>
                  <Image
                    src={`/images/${v.slug}-card.webp`}
                    alt=""
                    width={506}
                    height={302}
                    sizes="160px"
                  />
                  <span>
                    {v.name}
                    <small>{v.label}</small>
                  </span>
                </Link>
                <Price amount={v.rate} />
                <Link
                  href={bookingLink(v.slug, mode)}
                  aria-label={`Request ${v.name} ${m.name}`}
                  className="mode-request-link"
                >
                  Request <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
            ))}
          </div>
          <p className="image-note">
            Vehicle rates only. The team confirms your chosen rental mode and final arrangements.
          </p>
        </div>
      </section>
      <section className="shell section-space editorial-split">
        <div>
          <Eyebrow>Before you book</Eyebrow>
          <h2 className="editorial-title">A few useful answers.</h2>
          <div className="action-row home-faq-links">
            <TextLink href="/faq">Read all questions</TextLink>
            <a
              className="text-action"
              href={whatsappLink(`Hello U Drive, I would like to ask about a ${m.name} rental.`)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon size={16} /> Ask on WhatsApp
            </a>
          </div>
        </div>
        <FAQAccordion questions={m.faqs} />
      </section>
      <div className="shell">
        <section className="mode-other">
          <div>
            <Eyebrow light>The other way to travel</Eyebrow>
            <h2>{m.other.title}</h2>
            <p>{m.other.text}</p>
          </div>
          <Link className="action action-glass" href={m.other.href}>
            {m.other.label} <ArrowRight />
          </Link>
        </section>
      </div>
      <CTASection href={bookingLink(undefined, mode)} label={`Book ${m.name}`} />
    </main>
  )
}
