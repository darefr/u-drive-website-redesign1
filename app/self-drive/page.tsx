import { ModeExperience } from '@/components/mode-experience'
import { pageMeta } from '@/lib/site'

export const metadata = pageMeta(
  'Self Drive Car Rental Kathmandu',
  'Take the wheel with U Drive. Compare self-drive vehicle rates, plan pickup or delivery, and request a rental in Kathmandu or across Nepal.',
  '/self-drive',
  '/images/nepal-road.webp',
)
export default function SelfDrivePage() {
  return <ModeExperience mode="self-drive" />
}
