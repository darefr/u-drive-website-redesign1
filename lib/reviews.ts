import type { RentalMode } from './fleet'

export type TravellerReview = {
  id: string
  name: string
  avatar?: string
  rating: number
  text: string
  mode: RentalMode
  // Fleet slug of the car that was rented, when known.
  vehicle?: string
  route: string
  image: string
  imageAlt: string
  sample: boolean
}

// Entries with `sample: true` are placeholders that show how a review will look.
// They are labelled as sample content everywhere they render. Replace them with
// verified customer reviews and set `sample: false` before treating this as feedback.
export const reviews: TravellerReview[] = [
  {
    id: 'self-drive-example',
    name: 'Sample traveller',
    rating: 5,
    text: 'A car for the city days, and the freedom to stop when the mountain views opened up. That was the kind of trip we wanted.',
    mode: 'self-drive',
    vehicle: 'tata-nexon',
    route: 'Kathmandu Valley',
    image: '/images/destinations/kathmandu.webp',
    imageAlt: 'Temple rooftops in the Kathmandu Valley',
    sample: true,
  },
  {
    id: 'driver-example',
    name: 'Sample traveller',
    rating: 5,
    text: 'With a driver at the wheel, our lakeside journey was about the scenery and the people we travelled with.',
    mode: 'with-driver',
    vehicle: 'byd-atto-3',
    route: 'Pokhara itinerary',
    image: '/images/destinations/pokhara.webp',
    imageAlt: 'The lakeside landscape of Pokhara',
    sample: true,
  },
  {
    id: 'city-example',
    name: 'Sample traveller',
    rating: 4,
    text: 'Comparing the daily rates helped shape our budget. We could choose a smaller car and leave room for another day in the valley.',
    mode: 'self-drive',
    vehicle: 'byd-atto-1',
    route: 'City itinerary',
    image: '/images/destinations/bandipur.webp',
    imageAlt: 'Historic hill-town architecture in Nepal',
    sample: true,
  },
]
