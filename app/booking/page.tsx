import { BookingFlow } from '@/components/booking-flow'
import { vehicles } from '@/lib/fleet'
import { todayInNepal } from '@/lib/rental-request'
import { pageMeta } from '@/lib/site'
import { readTripSearch, type QueryValues } from '@/lib/trip-search'

export const metadata = pageMeta(
  'Book a Car — Plan Your Rental',
  'Choose a vehicle, a rental type, and your dates. Review your live NPR estimate and send a rental enquiry to the U Drive Kathmandu team.',
  '/booking',
)
export default async function BookingPage({
  searchParams,
}: {
  searchParams: Promise<QueryValues>
}) {
  const today = todayInNepal()
  const trip = readTripSearch(await searchParams, today)
  return (
    <main id="main-content">
      <BookingFlow
        key={JSON.stringify(trip)}
        initialVehicle={trip.vehicle || vehicles[0].slug}
        initialMode={trip.mode}
        initialTrip={trip}
        today={today}
      />
    </main>
  )
}
