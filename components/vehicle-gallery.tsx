'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Expand, X } from 'lucide-react'
import type { Vehicle } from '@/lib/fleet'

export function VehicleGallery({ vehicle: v }: { vehicle: Vehicle }) {
  const [index, setIndex] = useState(0)
  const dialog = useRef<HTMLDialogElement>(null)
  const shots = [
    { image: `/images/${v.slug}.webp`, label: 'Exterior view', alt: v.imageAlt },
    {
      image:
        v.slug === 'deepal-s05'
          ? '/images/nepal-drive-mobile.webp'
          : `/images/${v.slug}-profile.webp`,
      label: 'Road portrait',
      alt: `${v.name} in an outdoor setting, showing its exterior profile`,
    },
    {
      image: `/images/${v.slug}.webp`,
      label: 'Design detail',
      alt: `A closer crop of the front design of the ${v.name}`,
    },
  ]
  const selected = shots[index]
  function browse(direction: number) {
    setIndex((i) => (i + direction + shots.length) % shots.length)
  }
  return (
    <div className="model-gallery">
      <div className="gallery-main">
        <Image
          className={index === 2 ? 'detail-crop' : ''}
          src={selected.image}
          alt={selected.alt}
          fill
          sizes="(max-width: 780px) 100vw, 62vw"
          priority
        />
        <span className="gallery-tag">MODEL GALLERY</span>
        <button
          type="button"
          className="gallery-expand"
          aria-label={`Enlarge ${selected.label}`}
          onClick={() => dialog.current?.showModal()}
        >
          <Expand size={19} />
        </button>
      </div>
      <div className="gallery-filmstrip" aria-label="Choose a gallery view">
        {shots.map((s, i) => (
          <button
            type="button"
            key={s.label}
            aria-pressed={i === index}
            onClick={() => setIndex(i)}
            className="gallery-thumb"
          >
            <span>
              <Image
                src={s.image}
                alt=""
                fill
                sizes="80px"
                className={i === 2 ? 'detail-crop' : ''}
              />
            </span>
            {s.label}
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
          <Image
            src={selected.image}
            alt={selected.alt}
            fill
            sizes="100vw"
            className={index === 2 ? 'detail-crop' : ''}
          />
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
