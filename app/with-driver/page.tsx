import { ModeExperience } from '@/components/mode-experience'
import { pageMeta } from '@/lib/site'

export const metadata = pageMeta(
  'Car Rental With Driver in Nepal',
  'Arrange a car with a professional driver from Kathmandu. Choose your vehicle, share an itinerary, and confirm your driver-assisted rental with U Drive.',
  '/with-driver',
  '/images/driver-view.webp',
)
export default function WithDriverPage() {
  return <ModeExperience mode="with-driver" />
}
