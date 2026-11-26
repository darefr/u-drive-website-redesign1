import { notFound, permanentRedirect } from 'next/navigation'
import { findVehicle } from '@/lib/fleet'

export default async function LegacyVehicle({ params }: { params: Promise<{ slug: string }> }) {
  const car = findVehicle((await params).slug)
  if (!car) notFound()
  permanentRedirect(`/fleet/${car.slug}`)
}
