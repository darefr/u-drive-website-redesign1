import { findVehicle, type RentalMode } from './fleet.ts'
import { rentalDays } from './rental-request.ts'

export type QueryValues = Record<string, string | string[] | undefined>
export type TripSearch = {
  vehicle: string
  mode: RentalMode
  pickup: string
  start: string
  end: string
  destination: string
}

export function readTripSearch(query: QueryValues, today: string): TripSearch {
  const text = (key: string, limit = 160) =>
    typeof query[key] === 'string' ? query[key].trim().slice(0, limit) : ''
  const rawStart = text('start', 10)
  const start = rawStart >= today && rentalDays(rawStart, rawStart) !== null ? rawStart : ''
  const end = start && rentalDays(start, text('end', 10)) !== null ? text('end', 10) : ''
  return {
    vehicle: findVehicle(text('vehicle'))?.slug || '',
    mode: text('mode') === 'with-driver' ? 'with-driver' : 'self-drive',
    pickup: text('pickup'),
    start,
    end,
    destination: text('destination', 60),
  }
}

export function tripHref(path: string, values: Partial<TripSearch>) {
  const query = new URLSearchParams()
  for (const [key, value] of Object.entries(values)) if (value) query.set(key, value)
  return `${path}${query.size ? `?${query}` : ''}`
}
