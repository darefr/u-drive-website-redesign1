import Link from 'next/link'
import {
  ArrowUpRight,
  CalendarDays,
  CarFront,
  ClipboardCheck,
  KeyRound,
  Route,
  Send,
} from 'lucide-react'
import { Eyebrow } from './brand'
import { TextLink } from './editorial'

export const rentalSteps = [
  {
    title: 'Choose your car',
    short: 'Choose your car',
    brief: 'Compare the fleet and each daily rate.',
    phase: 'Plan your trip',
    icon: CarFront,
    body: 'Browse the four vehicles in our fleet. Compare their daily rental rates and open a model page for a closer look.',
    link: '/fleet',
    action: 'Explore the fleet',
  },
  {
    title: 'Find your rental mode',
    short: 'Self drive or driver',
    brief: 'Take the wheel, or travel with a driver.',
    phase: 'Plan your trip',
    icon: Route,
    body: 'Take the wheel with Self Drive, or request a professional driver to accompany your journey. Select your preference when booking.',
    link: '/self-drive',
    action: 'Explore Self Drive',
  },
  {
    title: 'Set your dates',
    short: 'Select your dates',
    brief: 'Add pickup and return dates for an estimate.',
    phase: 'Plan your trip',
    icon: CalendarDays,
    body: 'Choose your pickup and return dates, then add a preferred pickup time in Nepal. Your estimate updates using the vehicle’s daily rate and the number of rental days.',
  },
  {
    title: 'Send your request',
    short: 'Request booking',
    brief: 'Review it, then send by WhatsApp or email.',
    phase: 'Arrange your rental',
    icon: Send,
    body: 'Review your estimate and send your prepared request by WhatsApp or email. Preparing a request does not reserve a car.',
    link: '/booking',
    action: 'Start a booking request',
  },
  {
    title: 'Confirm the details',
    short: 'Confirm details',
    brief: 'U Drive confirms the car, terms, and meeting point.',
    phase: 'Arrange your rental',
    icon: ClipboardCheck,
    body: 'U Drive checks availability for your dates, then confirms the vehicle, final terms, and meeting point with you directly.',
  },
  {
    title: 'Collect your car',
    short: 'Pickup or delivery',
    brief: 'Collect in Kathmandu, or meet where agreed.',
    phase: 'On the road',
    icon: KeyRound,
    body: 'Meet at the agreed pickup point or receive your vehicle at the arranged delivery location. For a driver-assisted rental, meet your driver as agreed.',
  },
]

const stepNumber = (index: number) => String(index + 1).padStart(2, '0')

export function ProcessPreview() {
  return (
    <section className="route-section on-dark section-space" aria-labelledby="process-heading">
      <div className="shell">
        <div className="section-heading-row" data-reveal>
          <div>
            <Eyebrow light>How it works</Eyebrow>
            <h2 id="process-heading" className="editorial-title">
              From plans to keys.
            </h2>
          </div>
          <div className="section-head-aside">
            <p className="section-aside">
              A request starts the conversation. U Drive confirms the rental with you before
              anything is reserved.
            </p>
            <Link href="/how-it-works" className="drive-section-link">
              See the full process <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
        <ol className="route" data-reveal>
          {rentalSteps.map((step, i) => (
            <li key={step.title}>
              <span className="route-node">
                <step.icon size={20} aria-hidden="true" />
              </span>
              <span className="route-number" aria-hidden="true">
                {stepNumber(i)}
              </span>
              <h3>{step.short}</h3>
              <p>{step.brief}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export function ProcessTimeline() {
  return (
    <ol className="process-timeline">
      {rentalSteps.map((step, i) => (
        <li key={step.title}>
          <span className="timeline-number">{stepNumber(i)}</span>
          <div>
            <p className="overline">{step.phase}</p>
            <h2>{step.title}.</h2>
            <p>{step.body}</p>
            {step.link && <TextLink href={step.link}>{step.action}</TextLink>}
          </div>
          <step.icon className="timeline-icon" size={24} aria-hidden="true" />
        </li>
      ))}
    </ol>
  )
}
