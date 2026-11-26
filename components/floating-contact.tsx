'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowUpRight, Mail, MessagesSquare, Phone, X } from 'lucide-react'
import { FacebookIcon, WhatsAppIcon } from './brand'
import { business, whatsappLink } from '@/lib/fleet'

// Panels the button must not sit on top of on small screens.
const protectedPanels =
  '.trip-planner, .booking-form-panel, .enquiry-panel, .estimate-card, .hero-foot, .review-foot, .rail-controls, .faq-topics'

export function FloatingContactButtons() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const toggle = useRef<HTMLButtonElement>(null)
  const path = usePathname()
  useEffect(() => setOpen(false), [path])
  useEffect(() => {
    const root = ref.current
    if (!root || open) return
    let frame = 0
    const position = () => {
      const narrow = window.matchMedia('(max-width: 700px)').matches
      const rest = path.startsWith('/fleet/') && narrow ? 83 : narrow ? 13 : 21
      let bottom = rest
      if (narrow) {
        const boxes = [...document.querySelectorAll(protectedPanels)]
          .map((node) => node.getBoundingClientRect())
          .sort((a, b) => b.bottom - a.bottom)
        for (const box of boxes) {
          const foot = window.innerHeight - bottom
          if (box.right > window.innerWidth - 70 && box.top < foot && box.bottom > foot - 48)
            bottom = window.innerHeight - box.top + 9
        }
      }
      // Beside a tall form the button steps aside instead of hovering mid-screen.
      const displaced = bottom - rest > 150
      root.style.bottom = `${displaced ? rest : bottom}px`
      root.style.visibility = displaced ? 'hidden' : ''
    }
    const schedule = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(position)
    }
    const observer = new ResizeObserver(schedule)
    observer.observe(document.body)
    position()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [path, open])
  useEffect(() => {
    if (!open) return
    ref.current
      ?.querySelector<HTMLAnchorElement>('.contact-popover a')
      ?.focus({ preventScroll: true })
    const outside = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false)
    }
    const escape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggle.current?.focus()
      }
    }
    document.addEventListener('pointerdown', outside)
    document.addEventListener('keydown', escape)
    return () => {
      document.removeEventListener('pointerdown', outside)
      document.removeEventListener('keydown', escape)
    }
  }, [open])
  return (
    <div ref={ref} className="floating-contact" data-model={path.startsWith('/fleet/')}>
      {open && (
        <section className="contact-popover" id="contact-actions" aria-label="Contact U Drive">
          <p className="overline">U Drive · Kathmandu</p>
          <h2>Let’s talk travel.</h2>
          <p>Ask about a car, a route, or your rental dates.</p>
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon size={18} />
            <span>Chat on WhatsApp</span>
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
          <a href={`tel:${business.phone}`}>
            <Phone size={17} aria-hidden="true" />
            <span>{business.phoneDisplay}</span>
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
          <a href={`mailto:${business.email}`}>
            <Mail size={17} aria-hidden="true" />
            <span>Email the team</span>
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
          <a href={business.facebook} target="_blank" rel="noopener noreferrer">
            <FacebookIcon size={17} />
            <span>Facebook page</span>
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
          <Link href="/contact" onClick={() => setOpen(false)}>
            All contact options <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
        </section>
      )}
      <button
        ref={toggle}
        type="button"
        className="contact-fab"
        aria-label={open ? 'Close contact options' : 'Contact U Drive'}
        aria-expanded={open}
        aria-controls={open ? 'contact-actions' : undefined}
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={22} /> : <MessagesSquare size={22} />}
      </button>
    </div>
  )
}
