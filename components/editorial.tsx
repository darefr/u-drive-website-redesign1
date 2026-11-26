import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, ChevronRight, Phone, Plus } from 'lucide-react'
import { Eyebrow, WhatsAppIcon } from './brand'
import { business, whatsappLink } from '@/lib/fleet'
import type { ReactNode } from 'react'

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <Link href="/">Home</Link>
      {items.map((i) => (
        <span key={i.label}>
          <ChevronRight size={13} aria-hidden="true" />
          {i.href ? (
            <Link href={i.href}>{i.label}</Link>
          ) : (
            <span aria-current="page">{i.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link className="text-action" href={href}>
      {children}
      <ArrowUpRight size={17} aria-hidden="true" />
    </Link>
  )
}
export function PageIntro({
  label,
  title,
  children,
}: {
  label: string
  title: string
  children?: ReactNode
}) {
  return (
    <div className="page-intro">
      <Eyebrow>{label}</Eyebrow>
      <h1 className="display page-title">{title}</h1>
      {children && <p className="intro-description">{children}</p>}
    </div>
  )
}
export function CTASection({
  title = 'Ready to drive?',
  href = '/booking',
  label = 'Book Your Car',
}: {
  title?: string
  href?: string
  label?: string
}) {
  return (
    <section className="closing-cta on-dark">
      <Image
        className="closing-photo"
        src="/images/nepal-road.webp"
        alt=""
        fill
        sizes="100vw"
      />
      <div className="shell closing-inner">
        <div className="closing-copy" data-reveal>
          <Eyebrow light>Your next journey</Eyebrow>
          <h2 className="display">{title}</h2>
          <p>
            Choose a car, set your dates, and send your request to the Kathmandu team. They confirm
            availability and the final details with you.
          </p>
        </div>
        <div className="closing-actions" data-reveal>
          <Link href={href} className="action action-gold action-lg">
            {label} <ArrowRight />
          </Link>
          <a
            className="action action-glass action-lg"
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon /> Chat on WhatsApp
          </a>
          <a className="closing-phone" href={`tel:${business.phone}`}>
            <Phone size={15} aria-hidden="true" />
            or call {business.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  )
}
export type Question = { q: string; a: string }
export function FAQAccordion({ questions }: { questions: Question[] }) {
  return (
    <div className="questions">
      {questions.map(({ q, a }) => (
        <details key={q}>
          <summary>
            {q}
            <Plus size={19} aria-hidden="true" />
          </summary>
          <p>{a}</p>
        </details>
      ))}
    </div>
  )
}
