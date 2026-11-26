'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, MapPin, Star, UserRound } from 'lucide-react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { findVehicle, modeName } from '@/lib/fleet'
import { reviews, type TravellerReview } from '@/lib/reviews'

function rentalSummary(review: TravellerReview) {
  return [modeName(review.mode), findVehicle(review.vehicle)?.name].filter(Boolean).join(' · ')
}

function Stars({ review }: { review: TravellerReview }) {
  return (
    <span
      className="review-stars"
      role="img"
      aria-label={`${review.rating} of 5 stars${review.sample ? ', sample rating' : ''}`}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <Star key={star} size={14} fill={star <= review.rating ? 'currentColor' : 'none'} />
      ))}
    </span>
  )
}

export function ReviewCard({ review: r }: { review: TravellerReview }) {
  return (
    <article
      className="review-feature"
      aria-label={`${r.sample ? 'Sample review' : `Review from ${r.name}`}, ${rentalSummary(r)}`}
    >
      <div className="review-photo">
        <Image src={r.image} alt={r.imageAlt} fill sizes="(max-width: 900px) 100vw, 30vw" />
        <span className="review-route">
          <MapPin size={13} aria-hidden="true" />
          {r.route}
        </span>
      </div>
      <div className="review-words">
        <div className="review-topline">
          <Stars review={r} />
          {r.sample && <span className="sample-label">Sample review</span>}
        </div>
        <blockquote>“{r.text}”</blockquote>
        <div className="review-attribution">
          <Avatar size="lg">
            {r.avatar && <AvatarImage src={r.avatar} alt="" />}
            <AvatarFallback>
              {r.sample ? <UserRound size={18} aria-hidden="true" /> : r.name.slice(0, 1)}
            </AvatarFallback>
          </Avatar>
          <div>
            <strong>{r.name}</strong>
            <span>{rentalSummary(r)}</span>
          </div>
        </div>
      </div>
    </article>
  )
}

export function ReviewCarousel() {
  const [index, setIndex] = useState(0)
  const origin = useRef<{ x: number; y: number } | null>(null)
  if (reviews.length === 0) return null
  const total = reviews.length
  const shift = (direction: number) => setIndex((i) => (i + direction + total) % total)
  const active = reviews[index]
  // Up to two upcoming reviews sit beside the featured one.
  const upcoming = Array.from({ length: Math.min(2, total - 1) }, (_, n) => (index + n + 1) % total)
  return (
    <div
      className="review-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="Traveller reviews"
      data-reveal
      onTouchStart={(e) => {
        origin.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
      }}
      onTouchEnd={(e) => {
        const p = origin.current
        origin.current = null
        if (!p) return
        const dx = e.changedTouches[0].clientX - p.x
        const dy = e.changedTouches[0].clientY - p.y
        if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.5) shift(dx < 0 ? 1 : -1)
      }}
    >
      <div className="review-layout" data-solo={upcoming.length === 0}>
        <div key={active.id} className="review-active" aria-live="polite">
          <ReviewCard review={active} />
        </div>
        {upcoming.length > 0 && (
          <div className="review-queue">
            {upcoming.map((i) => {
              const r = reviews[i]
              return (
                <button
                  type="button"
                  key={r.id}
                  className="review-mini"
                  aria-label={`Show ${r.sample ? 'sample review' : `review from ${r.name}`} ${i + 1}: ${rentalSummary(r)}, ${r.route}`}
                  onClick={() => setIndex(i)}
                >
                  <span className="review-mini-top">
                    <Stars review={r} />
                    {r.sample && <span className="sample-label">Sample</span>}
                  </span>
                  <span className="review-mini-text">“{r.text}”</span>
                  <span className="review-mini-meta">
                    <span>
                      <strong>{r.name}</strong>
                      {rentalSummary(r)}
                    </span>
                    <ArrowRight size={16} aria-hidden="true" />
                  </span>
                </button>
              )
            })}
          </div>
        )}
      </div>
      <div className="review-foot">
        <div className="review-pages">
          {reviews.map((r, i) => (
            <button
              type="button"
              key={r.id}
              aria-label={`Show review ${i + 1} of ${total}`}
              aria-pressed={i === index}
              onClick={() => setIndex(i)}
            >
              <span />
            </button>
          ))}
        </div>
        <p>
          {active.sample
            ? 'Sample content shown for layout. Not a customer testimonial.'
            : 'Customer review'}
        </p>
        <div className="review-browse">
          <button type="button" aria-label="Previous review" onClick={() => shift(-1)}>
            <ArrowLeft size={17} />
          </button>
          <button type="button" aria-label="Next review" onClick={() => shift(1)}>
            <ArrowRight size={17} />
          </button>
        </div>
      </div>
    </div>
  )
}
