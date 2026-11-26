'use client'

import dynamic from 'next/dynamic'
import { useRef, useState } from 'react'
import { CalendarDays, LoaderCircle, X } from 'lucide-react'
import { Field, FieldLabel, FieldError } from '@/components/ui/field'
import { prettyDate } from '@/lib/rental-request'

const RentalCalendar = dynamic(() => import('@/components/rental-calendar'), {
  ssr: false,
  loading: () => (
    <div className="calendar-loading" role="status">
      <LoaderCircle className="animate-spin" size={18} />
      Loading calendar…
    </div>
  ),
})

export function DateField({
  id,
  label,
  value,
  minimum,
  error,
  optional = false,
  onChange,
}: {
  id: string
  label: string
  value: string
  minimum: string
  optional?: boolean
  error?: string
  onChange: (value: string) => void
}) {
  const dialog = useRef<HTMLDialogElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const [open, setOpen] = useState(false)
  function select(date: string) {
    onChange(date)
    dialog.current?.close()
  }
  return (
    <Field data-invalid={Boolean(error)}>
      <FieldLabel id={`${id}-label`} htmlFor={id}>
        {label}
        {!optional && (
          <span className="required-star" aria-hidden="true">
            *
          </span>
        )}
      </FieldLabel>
      <button
        ref={trigger}
        id={id}
        type="button"
        className="date-trigger"
        aria-haspopup="dialog"
        aria-controls={`${id}-dialog`}
        aria-expanded={open}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        aria-labelledby={`${id}-label ${id}-value`}
        onClick={() => {
          setOpen(true)
          dialog.current?.showModal()
        }}
      >
        <span id={`${id}-value`}>{value ? prettyDate(value) : 'Select date'}</span>
        <CalendarDays size={17} aria-hidden="true" />
      </button>
      <FieldError id={`${id}-error`}>{error}</FieldError>
      <dialog
        id={`${id}-dialog`}
        ref={dialog}
        className="date-dialog"
        aria-labelledby={`${id}-heading`}
        onClose={() => {
          setOpen(false)
          trigger.current?.focus({ preventScroll: true })
        }}
        onClick={(event) => {
          if (event.target !== event.currentTarget) return
          const r = event.currentTarget.getBoundingClientRect()
          if (
            event.clientX < r.left ||
            event.clientX > r.right ||
            event.clientY < r.top ||
            event.clientY > r.bottom
          )
            dialog.current?.close()
        }}
      >
        <div className="calendar-heading">
          <div>
            <p className="eyebrow">Your rental dates</p>
            <h3 id={`${id}-heading`}>{label}</h3>
          </div>
          <button type="button" aria-label="Close calendar" onClick={() => dialog.current?.close()}>
            <X size={20} />
          </button>
        </div>
        {open && <RentalCalendar value={value} minimum={minimum} onSelect={select} />}
        <p className="calendar-footnote">Local dates in Kathmandu, Nepal.</p>
      </dialog>
    </Field>
  )
}
