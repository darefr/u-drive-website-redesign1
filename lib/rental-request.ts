import type { RentalMode } from './fleet'

export interface RentalRequest {
  vehicle: string
  mode: RentalMode
  pickupDate: string
  returnDate: string
  pickupLocation: string
  handover: 'pickup' | 'delivery'
  pickupTime: string
  sameReturn: boolean
  returnLocation: string
  name: string
  phone: string
  email: string
  notes: string
}
export type RequestErrors = Partial<Record<keyof RentalRequest, string>>
const DAY_MS = 86400000

function dateValue(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null
  const time = Date.parse(`${value}T00:00:00Z`)
  return Number.isFinite(time) && new Date(time).toISOString().slice(0, 10) === value ? time : null
}

export function todayInNepal(now = new Date()) {
  const parts = new Intl.DateTimeFormat('en', {
    timeZone: 'Asia/Kathmandu',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(now)
  return ['year', 'month', 'day']
    .map((type) => parts.find((part) => part.type === type)?.value)
    .join('-')
}

export function nextDate(value: string) {
  const time = dateValue(value)
  return time === null ? '' : new Date(time + DAY_MS).toISOString().slice(0, 10)
}

export function rentalDays(start: string, end: string) {
  const from = dateValue(start),
    to = dateValue(end)
  return from === null || to === null || to < from ? null : Math.max(1, (to - from) / DAY_MS)
}

export function prettyDate(value: string) {
  const time = dateValue(value)
  return time === null
    ? 'Not selected'
    : new Intl.DateTimeFormat('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        timeZone: 'UTC',
      }).format(time)
}

export function validateTrip(request: RentalRequest, today: string): RequestErrors {
  const errors: RequestErrors = {}
  if (dateValue(request.pickupDate) === null) errors.pickupDate = 'Choose a valid pickup date.'
  else if (request.pickupDate < today) errors.pickupDate = 'Choose today or a future date in Nepal.'
  if (dateValue(request.returnDate) === null) errors.returnDate = 'Choose a valid return date.'
  else if (request.returnDate < request.pickupDate)
    errors.returnDate = 'The return date cannot be before pickup.'
  if (request.pickupTime && !/^([01]\d|2[0-3]):[0-5]\d$/.test(request.pickupTime))
    errors.pickupTime = 'Choose a valid pickup time.'
  if (request.pickupLocation.trim().length < 2)
    errors.pickupLocation = 'Enter your preferred pickup location.'
  else if (request.pickupLocation.length > 160)
    errors.pickupLocation = 'Keep the pickup location under 160 characters.'
  if (
    !request.sameReturn &&
    (request.returnLocation.trim().length < 2 || request.returnLocation.length > 160)
  )
    errors.returnLocation = 'Enter a drop-off location, up to 160 characters.'
  return errors
}

export function validEmail(value: string) {
  return (
    typeof value === 'string' &&
    value.trim().length <= 254 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
  )
}

export function validateContact(request: RentalRequest): RequestErrors {
  const errors: RequestErrors = {}
  if (request.name.trim().length < 2 || request.name.length > 80)
    errors.name = 'Enter your name, between 2 and 80 characters.'
  const number = request.phone.replace(/[\s().-]/g, '')
  if (!/^\+?\d{7,15}$/.test(number))
    errors.phone = 'Enter a valid phone number, including your country code.'
  if (!validEmail(request.email)) errors.email = 'Enter a valid email address.'
  if (request.notes.length > 600) errors.notes = 'Keep your notes under 600 characters.'
  return errors
}
