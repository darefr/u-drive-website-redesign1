'use client'

import { useEffect, useLayoutEffect } from 'react'
import { usePathname } from 'next/navigation'

const useBeforePaint = typeof window === 'undefined' ? useEffect : useLayoutEffect

/**
 * Fades in elements marked with `data-reveal` as they scroll into view.
 * Anything already on screen is shown immediately, and the hidden state is only
 * switched on once the observer is running, so content never depends on this script.
 */
export function RevealObserver() {
  const pathname = usePathname()
  useBeforePaint(() => {
    if (
      !('IntersectionObserver' in window) ||
      matchMedia('(prefers-reduced-motion: reduce)').matches
    )
      return
    const pending = Array.from(
      document.querySelectorAll<HTMLElement>('[data-reveal]:not([data-revealed])'),
    )
    const waiting: HTMLElement[] = []
    for (const el of pending) {
      if (el.getBoundingClientRect().top < window.innerHeight) el.dataset.revealed = 'instant'
      else waiting.push(el)
    }
    document.documentElement.classList.add('reveal-ready')
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          ;(entry.target as HTMLElement).dataset.revealed = 'true'
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    )
    for (const el of waiting) observer.observe(el)
    return () => observer.disconnect()
  }, [pathname])
  return null
}
