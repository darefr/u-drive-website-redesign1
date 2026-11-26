import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ArrowUpRight, MessageCircle } from 'lucide-react'
import { Eyebrow } from './brand'
import { Breadcrumbs, CTASection, FAQAccordion, TextLink } from './editorial'
import { bookingLink, money, vehicles, whatsappLink, type RentalMode } from '@/lib/fleet'

const modeCopy = {
  'self-drive': {
    name: 'Self Drive',
    title: (
      <>
        SELF DRIVE.
        <br />
        <em>YOUR PACE.</em>
      </>
    ),
    intro:
      'Take the keys and make the route your own. Arrange a self-drive rental from Kathmandu for the journey you have in mind.',
    image: 'nepal-road',
    alt: 'A mountain road curving through the green landscape of Nepal',
    heading: 'The road is yours.',
    text: 'Self Drive means you drive the rental car yourself. Choose a model and dates, then share your itinerary so U Drive can confirm the arrangements for your trip.',
    points: [
      ['Pick your vehicle', 'Choose the model and daily rate that suit your plans.'],
      ['Share your plans', 'Tell us your dates, route, and preferred pickup point.'],
      ['Confirm and collect', 'Agree the requirements and rental terms before handover.'],
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
  },
  'with-driver': {
    name: 'With Driver',
    title: (
      <>
        SIT BACK.
        <br />
        <em>TAKE IT IN.</em>
      </>
    ),
    intro:
      'A car and a professional driver, arranged around your itinerary. Enjoy the journey from Kathmandu to your destination.',
    image: 'driver-view',
    alt: 'The view past a driver onto an open road in the Nepal foothills',
    heading: 'Your plans. A driver at the wheel.',
    text: 'Choose a driver-assisted rental when you would rather focus on the people and places along the way. U Drive coordinates your vehicle, driver, and pickup for the itinerary you share.',
    points: [
      [
        'Sightseeing & longer journeys',
        'Share the places you want to see, including overnight stops, so the team can check your route.',
      ],
      [
        'Business travel',
        'Plan your meetings and preferred pickup times while a professional driver takes the wheel.',
      ],
      [
        'Airport & hotel pickups',
        'Include your arrival details and accommodation. The team will agree the exact meeting point and timing.',
      ],
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
  },
}
export function ModeExperience({ mode }: { mode: RentalMode }) {
  const m = modeCopy[mode]
  return (
    <main id="main-content">
      <div className="shell">
        <Breadcrumbs items={[{ label: m.name }]} />
      </div>
      <section className={`experience-hero ${mode}`}>
        <div className="experience-image">
          <Image
            src={`/images/${m.image}.webp`}
            alt={m.alt}
            fill
            sizes="(max-width:680px) 100vw, 60vw"
            priority
          />
        </div>
        <div className="shell experience-hero-inner">
          <div className="experience-copy">
            <Eyebrow light>{m.name.toUpperCase()} RENTALS</Eyebrow>
            <h1 className="display">{m.title}</h1>
            <p>{m.intro}</p>
            <Link className="action action-gold" href={bookingLink(undefined, mode)}>
              Plan this rental <ArrowRight />
            </Link>
          </div>
        </div>
      </section>
      <section className="shell section-space editorial-split">
        <div>
          <Eyebrow>THE EXPERIENCE</Eyebrow>
          <h2 className="editorial-title">{m.heading}</h2>
          <p className="body-copy">{m.text}</p>
          {mode === 'self-drive' && (
            <p className="requirements-note">Requirements will be confirmed during booking.</p>
          )}
        </div>
        <div className="mode-process">
          {m.points.map(([title, body], i) => (
            <div key={title}>
              <span>0{i + 1}</span>
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
              <Eyebrow>CHOOSE YOUR CAR</Eyebrow>
              <h2 className="editorial-title">The rental line-up.</h2>
            </div>
            <TextLink href="/fleet">Full catalogue</TextLink>
          </div>
          <div className="mode-fleet-list">
            {vehicles.map((v) => (
              <div key={v.slug}>
                <Link className="mode-car-name" href={`/fleet/${v.slug}`}>
                  <Image src={`/images/${v.slug}-card.webp`} alt="" width={98} height={58} />
                  <span>
                    {v.name}
                    <small>{v.label}</small>
                  </span>
                </Link>
                <p>
                  <strong>{money(v.rate)}</strong>
                  <span> / day</span>
                </p>
                <Link
                  href={bookingLink(v.slug, mode)}
                  aria-label={`Request ${v.name} ${m.name}`}
                  className="mode-request-link"
                >
                  Request <ArrowUpRight size={17} />
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
          <Eyebrow>BEFORE YOU BOOK</Eyebrow>
          <h2 className="editorial-title">A few useful answers.</h2>
          <a
            className="text-action"
            href={whatsappLink(`Hello U Drive, I would like to ask about a ${m.name} rental.`)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle size={16} /> Ask on WhatsApp
          </a>
        </div>
        <FAQAccordion questions={m.faqs} />
      </section>
      <CTASection href={bookingLink(undefined, mode)} label={`Book ${m.name}`} />
    </main>
  )
}
