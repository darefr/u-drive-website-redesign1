import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import { Analytics } from '@vercel/analytics/next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { FloatingContactButtons } from '@/components/floating-contact'
import { RevealObserver } from '@/components/reveal'
import { siteOrigin } from '@/lib/site'
import './globals.css'
import './inner-pages.css'
import './business-pages.css'
import '@/components/booking.css'
import './drive.css'
import './journeys.css'
import './company.css'

const display = localFont({
  src: [
    { path: '../public/fonts/barlow-condensed-bold.woff2', weight: '700', style: 'normal' },
    { path: '../public/fonts/barlow-condensed-bold-italic.woff2', weight: '700', style: 'italic' },
  ],
  variable: '--font-display-face',
  display: 'swap',
  fallback: ['Arial Narrow', 'Arial'],
})
const sans = localFont({
  src: '../public/fonts/dm-sans.woff2',
  weight: '100 900',
  variable: '--font-body-face',
  display: 'swap',
  fallback: ['Arial'],
})

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin()),
  title: {
    default: 'U Drive Rental Car Kathmandu | Self Drive & With Driver',
    template: '%s | U Drive Rental Car Kathmandu',
  },
  description:
    'Explore four rental cars from NPR 6,500/day. Choose self drive or a professional driver in Kathmandu and across Nepal. Check daily rates and plan your rental with U Drive.',
  applicationName: 'U Drive Rental Car Kathmandu',
  icons: {
    icon: { url: '/icon.png', type: 'image/png', sizes: '192x192' },
    apple: '/apple-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_NP',
    siteName: 'U Drive Rental Car Kathmandu',
    title: 'Drive Your Journey Across Nepal | U Drive Rental Car Kathmandu',
    description:
      'Premium car rentals in Kathmandu and across Nepal. Explore our fleet, compare daily rates, and choose your drive.',
    images: [{ url: '/images/hero-wide.webp', alt: 'U Drive — premium car rental in Nepal' }],
  },
  twitter: { card: 'summary_large_image' },
}
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#08273a',
  colorScheme: 'light',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`bg-background ${display.variable} ${sans.variable}`}>
      <body className="font-sans antialiased">
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
        <FloatingContactButtons />
        <RevealObserver />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
