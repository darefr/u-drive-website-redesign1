'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowRight, ArrowUpRight, ChevronDown, Menu, Phone, UserRound, X } from 'lucide-react'
import { Brand, WhatsAppIcon, WheelIcon } from './brand'
import { business, whatsappLink } from '@/lib/fleet'
import { navigation } from '@/lib/site'

const drawerPrimary = navigation.slice(0, 6)
const drawerSecondary = navigation.slice(6)

export function SiteHeader() {
  const pathname = usePathname()
  const drawer = useRef<HTMLDialogElement>(null)
  const rentalMenu = useRef<HTMLDivElement>(null)
  const rentalToggle = useRef<HTMLButtonElement>(null)
  const [open, setOpen] = useState(false)
  const [optionsOpen, setOptionsOpen] = useState(false)
  const [ready, setReady] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => setReady(true), [])
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])
  useEffect(() => {
    drawer.current?.close()
    setOptionsOpen(false)
  }, [pathname])
  useEffect(() => {
    if (!open) return
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const desktop = window.matchMedia('(min-width: 1180px)')
    const changed = () => {
      if (desktop.matches) drawer.current?.close()
    }
    desktop.addEventListener('change', changed)
    return () => {
      document.body.style.overflow = overflow
      desktop.removeEventListener('change', changed)
    }
  }, [open])
  useEffect(() => {
    if (!optionsOpen) return
    const outside = (e: PointerEvent) => {
      if (!rentalMenu.current?.contains(e.target as Node)) setOptionsOpen(false)
    }
    const escape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOptionsOpen(false)
        rentalToggle.current?.focus()
      }
    }
    document.addEventListener('pointerdown', outside)
    document.addEventListener('keydown', escape)
    return () => {
      document.removeEventListener('pointerdown', outside)
      document.removeEventListener('keydown', escape)
    }
  }, [optionsOpen])
  const active = (href: string) =>
    pathname === href || (href !== '/' && pathname.startsWith(`${href}/`))
  const current = (href: string) => (active(href) ? ('page' as const) : undefined)
  const closeDrawer = () => drawer.current?.close()
  return (
    <header
      className="masthead"
      data-ready={ready}
      data-scrolled={scrolled}
      data-overlay={pathname === '/' && !scrolled}
    >
      <div className="shell masthead-inner">
        <Brand adaptive />
        <nav className="main-nav" aria-label="Main navigation">
          {navigation
            .filter((n) => !['/faq', '/with-driver'].includes(n.href))
            .map((n) =>
              n.href === '/self-drive' ? (
                <div
                  className="rental-nav"
                  ref={rentalMenu}
                  key={n.href}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget)) setOptionsOpen(false)
                  }}
                >
                  <Link
                    href="/self-drive"
                    aria-current={current('/self-drive') || current('/with-driver')}
                  >
                    Rental Options
                  </Link>
                  <button
                    ref={rentalToggle}
                    type="button"
                    aria-label="Show rental options"
                    aria-expanded={optionsOpen}
                    aria-controls="rental-nav-options"
                    onClick={() => setOptionsOpen(!optionsOpen)}
                  >
                    <ChevronDown size={14} />
                  </button>
                  {optionsOpen && (
                    <div id="rental-nav-options" className="rental-popover">
                      <Link href="/self-drive">
                        <WheelIcon /> Self Drive <ArrowRight size={15} />
                      </Link>
                      <Link href="/with-driver">
                        <UserRound size={16} /> With Driver <ArrowRight size={15} />
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <Link key={n.href} href={n.href} aria-current={current(n.href)}>
                  {n.label}
                </Link>
              ),
            )}
        </nav>
        <div className="header-tools">
          <a className="header-phone" href={`tel:${business.phone}`}>
            <Phone size={16} aria-hidden="true" />
            {business.phoneDisplay}
          </a>
          <Link className="action action-gold header-cta" href="/booking">
            Book Now <ArrowUpRight />
          </Link>
          <button
            className="menu-trigger icon-button"
            type="button"
            aria-label="Open navigation"
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-controls="navigation-drawer"
            onClick={() => {
              drawer.current?.showModal()
              setOpen(true)
            }}
          >
            <Menu />
          </button>
        </div>
      </div>
      <dialog
        id="navigation-drawer"
        className="navigation-drawer"
        ref={drawer}
        aria-labelledby="drawer-title"
        onClose={() => setOpen(false)}
        onClick={(e) => {
          if (
            e.target === e.currentTarget &&
            e.clientX < e.currentTarget.getBoundingClientRect().left
          )
            closeDrawer()
        }}
      >
        <div className="drawer-top">
          <Brand reversed onNavigate={closeDrawer} />
          <h2 id="drawer-title" className="sr-only">
            U Drive navigation
          </h2>
          <button
            autoFocus
            type="button"
            className="icon-button"
            aria-label="Close navigation"
            onClick={closeDrawer}
          >
            <X />
          </button>
        </div>
        <nav className="drawer-links" aria-label="Mobile navigation">
          {drawerPrimary.map((n, i) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={current(n.href)}
              style={{ '--i': i } as CSSProperties}
              onClick={closeDrawer}
            >
              {n.label === 'Fleet' ? 'Our Fleet' : n.label}
              <ArrowUpRight size={20} aria-hidden="true" />
            </Link>
          ))}
        </nav>
        <nav className="drawer-secondary" aria-label="More pages">
          {drawerSecondary.map((n) => (
            <Link key={n.href} href={n.href} aria-current={current(n.href)} onClick={closeDrawer}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="drawer-foot">
          <Link className="action action-gold action-lg drawer-book" href="/booking" onClick={closeDrawer}>
            Book Now <ArrowRight />
          </Link>
          <div className="drawer-contacts">
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon />
              WhatsApp
            </a>
            <a href={`tel:${business.phone}`}>
              <Phone />
              Call us
            </a>
          </div>
        </div>
      </dialog>
    </header>
  )
}
