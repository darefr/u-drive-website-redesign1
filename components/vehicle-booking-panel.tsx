import { BookingFlow } from './booking-flow'
import { todayInNepal } from '@/lib/rental-request'
import type { Vehicle } from '@/lib/fleet'
import type { TripSearch } from '@/lib/trip-search'

export function VehicleBookingPanel({ vehicle, trip }: { vehicle: Vehicle; trip: TripSearch }) {
  return (
    <BookingFlow
      key={`${vehicle.slug}-${JSON.stringify(trip)}`}
      initialVehicle={vehicle.slug}
      initialMode={trip.mode}
      initialTrip={trip}
      today={todayInNepal()}
      embedded
    />
  )
}
