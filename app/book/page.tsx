import { permanentRedirect } from 'next/navigation'
import { bookingLink, findVehicle } from '@/lib/fleet'

export default async function LegacyBooking({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const query = await searchParams
  const car = findVehicle(typeof query.vehicle === 'string' ? query.vehicle : undefined)
  const mode = query.mode === 'with-driver' || query.mode === 'self-drive' ? query.mode : undefined
  permanentRedirect(bookingLink(car?.slug, mode))
}
