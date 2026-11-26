'use client'

import Image from 'next/image'
import { useRef, useState, type CSSProperties } from 'react'
import { ArrowLeft, ArrowRight, Expand, Images, X } from 'lucide-react'
import type { Vehicle } from '@/lib/fleet'

type Shot = { image: string; label: string; alt: string; style?: CSSProperties }

function galleryShots(v: Vehicle): Shot[] {
  const { scene } = v
  return [
    {
      image: scene.image,
      label: 'On the road',
      alt: scene.alt,
      style: { objectPosition: scene.focus },
    },
    { image: `/images/${v.slug}.webp`, label: 'Exterior', alt: v.imageAlt },
    {
      image: scene.image,
      label: 'Closer look',
      alt: `A closer view of the ${v.name}`,
      // Zooms around the same point the crop is anchored to, so the car stays in frame.
      style: { objectPosition: scene.focus, transform: 'scale(1.5)', transformOrigin: scene.focus },
    },
    ...(scene.panorama
      ? [
          {
            image: scene.panorama.image,
            label: 'Wide view',
            alt: `The ${v.name} in a wide mountain landscape`,
            style: { objectPosition: scene.panorama.focus },
          },
        ]
      : []),
  ]
}

export function VehicleGallery({ vehicle: v }: { vehicle: Vehicle }) {
  const [index, setIndex] = useState(0)
  const dialog = useRef<HTMLDialogElement>(null)
  const touch = useRef<{ x: number; y: number } | null>(null)
  const shots = galleryShots(v)
  const selected = shots[index]
  function browse(direction: number) {
    setIndex((i) => (i + direction + shots.length) % shots.length)
  }
  return (
    <div className="model-gallery">
      <div
        className="gallery-main"
        onTouchStart={(e) => {
          touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
        }}
        onTouchEnd={(e) => {
          const start = touch.current
          touch.current = null
          if (!start) return
          const dx = e.changedTouches[0].clientX - start.x
          const dy = e.changedTouches[0].clientY - start.y
          if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.5) browse(dx < 0 ? 1 : -1)
        }}
      >
        <Image
          key={index}
          src={selected.image}
          alt={selected.alt}
          fill
          sizes="(max-width: 1000px) 100vw, 58vw"
          style={selected.style}
          priority={index === 0}
        />
        <span className="gallery-tag">
          <Images size={14} aria-hidden="true" />
          {selected.label}
        </span>
        <button
          type="button"
          className="gallery-step"
          data-direction="previous"
          aria-label="Previous photo"
          onClick={() => browse(-1)}
        >
          <ArrowLeft size={18} />
        </button>
        <button
          type="button"
          className="gallery-step"
          data-direction="next"
          aria-label="Next photo"
          onClick={() => browse(1)}
        >
          <ArrowRight size={18} />
        </button>
        <button
          type="button"
          className="gallery-expand"
          aria-label={`Enlarge photo: ${selected.label}`}
          onClick={() => dialog.current?.showModal()}
        >
          <Expand size={19} />
        </button>
      </div>
      <div className="gallery-filmstrip" role="group" aria-label="Choose a gallery view">
        {shots.map((shot, i) => (
          <button
            type="button"
            key={shot.label}
            aria-pressed={i === index}
            onClick={() => setIndex(i)}
            className="gallery-thumb"
          >
            <span>
              <Image src={shot.image} alt="" fill sizes="160px" style={shot.style} />
            </span>
            {shot.label}
          </button>
        ))}
      </div>
      <p className="image-note">Illustrative model imagery. Colour and trim may vary.</p>
      <dialog
        ref={dialog}
        className="gallery-dialog"
        aria-labelledby="gallery-heading"
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') browse(1)
          if (e.key === 'ArrowLeft') browse(-1)
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close()
        }}
      >
        <div className="lightbox-top">
          <h2 id="gallery-heading">
            {v.name} <span>/ Model gallery</span>
          </h2>
          <button
            type="button"
            autoFocus
            className="icon-button"
            aria-label="Close gallery"
            onClick={() => dialog.current?.close()}
          >
            <X />
          </button>
        </div>
        <div className="lightbox-image">
          <Image src={selected.image} alt={selected.alt} fill sizes="100vw" style={selected.style} />
        </div>
        <div className="lightbox-controls">
          <button
            type="button"
            className="icon-button"
            aria-label="Previous photo"
            onClick={() => browse(-1)}
          >
            <ArrowLeft />
          </button>
          <p aria-live="polite">
            {index + 1} / {shots.length} · {selected.label}
          </p>
          <button
            type="button"
            className="icon-button"
            aria-label="Next photo"
            onClick={() => browse(1)}
          >
            <ArrowRight />
          </button>
        </div>
      </dialog>
    </div>
  )
}
