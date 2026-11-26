'use client'

import { useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import Link from 'next/link'
import { TextField } from './booking-fields'
import { Field, FieldError, FieldGroup, FieldLabel } from './ui/field'
import { Textarea } from './ui/textarea'
import { MessageHandoff } from './message-handoff'
import { validEmail } from '@/lib/rental-request'

export function EnquiryForm({ delivery = false }: { delivery?: boolean }) {
  const [values, setValues] = useState({
    topic: delivery ? 'Vehicle delivery' : 'General rental enquiry',
    name: '',
    email: '',
    message: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [step, setStep] = useState(0)
  const heading = useRef<HTMLHeadingElement>(null)
  function changeStep(n: number) {
    setStep(n)
    requestAnimationFrame(() => heading.current?.focus())
  }
  function change(key: keyof typeof values, value: string) {
    setValues((v) => ({ ...v, [key]: value }))
    setErrors((v) => ({ ...v, [key]: '' }))
  }
  function review(e: React.FormEvent) {
    e.preventDefault()
    const issues: Record<string, string> = {}
    if (values.name.trim().length < 2) issues.name = 'Please enter your name.'
    if (!validEmail(values.email)) issues.email = 'Please enter a valid email address.'
    if (values.message.trim().length < 5) issues.message = 'Tell us a little about your enquiry.'
    setErrors(issues)
    const first = Object.keys(issues)[0]
    if (first) {
      requestAnimationFrame(() => document.getElementById(`enquiry-${first}`)?.focus())
      return
    }
    changeStep(1)
  }
  const message = `Hello U Drive,\n\n${values.topic}\n\n${values.message.trim()}\n\nName: ${values.name.trim()}\nEmail: ${values.email.trim()}`
  return (
    <section className="enquiry-panel">
      <p className="overline">ENQUIRY DESK</p>
      <h2 ref={heading} tabIndex={-1}>
        {['Tell us your plans.', 'Review your enquiry.', 'Enquiry marked as sent.'][step]}
      </h2>
      {step === 0 ? (
        <form noValidate onSubmit={review}>
          <FieldGroup className="booking-fields">
            <Field>
              <FieldLabel htmlFor="enquiry-topic">What is your enquiry about?</FieldLabel>
              <select
                id="enquiry-topic"
                value={values.topic}
                onChange={(e) => change('topic', e.target.value)}
              >
                {[
                  'General rental enquiry',
                  'Vehicle delivery',
                  'Self Drive',
                  'With Driver',
                  'Existing booking request',
                ].map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </Field>
            <TextField
              id="enquiry-name"
              label="Your name"
              required
              maxLength={80}
              autoComplete="name"
              value={values.name}
              onChange={(e) => change('name', e.target.value)}
              error={errors.name}
            />
            <TextField
              id="enquiry-email"
              type="email"
              label="Email address"
              required
              autoComplete="email"
              maxLength={254}
              value={values.email}
              onChange={(e) => change('email', e.target.value)}
              error={errors.email}
            />
            <Field data-invalid={Boolean(errors.message)}>
              <FieldLabel htmlFor="enquiry-message">Your message</FieldLabel>
              <Textarea
                id="enquiry-message"
                required
                rows={4}
                maxLength={1000}
                placeholder="Your dates, destination, or question for the team…"
                value={values.message}
                onChange={(e) => change('message', e.target.value)}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'enquiry-message-error' : undefined}
              />
              <FieldError id="enquiry-message-error">{errors.message}</FieldError>
            </Field>
          </FieldGroup>
          <p className="field-hint enquiry-hint">
            Review first, then send through WhatsApp or email. Your details are not stored on this
            site.
          </p>
          <button className="action action-gold" type="submit">
            Review enquiry <ArrowRight />
          </button>
        </form>
      ) : step === 1 ? (
        <>
          <div className="enquiry-preview">{message}</div>
          <MessageHandoff message={message} subject={values.topic} onSent={() => changeStep(2)} />
          <button type="button" className="back-link" onClick={() => changeStep(0)}>
            <ArrowLeft size={15} />
            Edit message
          </button>
        </>
      ) : (
        <div className="enquiry-receipt">
          <Check size={25} />
          <p>
            You marked your message as sent. Continue your conversation directly with U Drive in
            your chosen channel.
          </p>
          <Link className="text-action" href="/fleet">
            Explore the fleet <ArrowRight size={16} />
          </Link>
        </div>
      )}
    </section>
  )
}
