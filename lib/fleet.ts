export type RentalMode = 'self-drive' | 'with-driver'
export type VehicleScene = {
  image: string
  alt: string
  // CSS object-position that keeps the car in frame when the photo is cropped.
  focus: string
  // Optional wide photograph, used full-bleed in the homepage hero.
  panorama?: { image: string; focus: string }
}
export type Vehicle = {
  slug: string
  name: string
  rate: number
  category: 'SUV' | 'Hatchback'
  label: string
  description: string
  introduction: string
  imageAlt: string
  scene: VehicleScene
}

export const vehicles: readonly Vehicle[] = [
  {
    slug: 'deepal-s05',
    name: 'Deepal S05',
    rate: 10000,
    category: 'SUV',
    label: 'Electric SUV',
    description: 'A refined electric SUV for the open road.',
    introduction:
      'A sculpted electric SUV for a journey beyond the everyday. Choose the Deepal S05 for your next drive from Kathmandu, with your route and rental mode confirmed by our team.',
    imageAlt: 'Silver Deepal S05 on a road overlooking green mountain ridges',
    scene: {
      image: '/images/nepal-drive-mobile.webp',
      alt: 'Silver Deepal S05 parked on a mountain road beneath snow-covered peaks',
      focus: '50% 88%',
      panorama: { image: '/images/nepal-drive-panorama.webp', focus: '72% 60%' },
    },
  },
  {
    slug: 'byd-atto-3',
    name: 'BYD Atto 3',
    rate: 9000,
    category: 'SUV',
    label: 'Electric SUV',
    description: 'Easygoing electric travel, in town and beyond.',
    introduction:
      'An electric SUV that feels at home on city streets and longer journeys. Plan your route in the BYD Atto 3 and ask the team about your preferred pickup and drop-off.',
    imageAlt: 'Blue BYD Atto 3 beside a hillside stone retaining wall',
    scene: {
      image: '/images/byd-atto-3-profile.webp',
      alt: 'Blue BYD Atto 3 in profile on a hillside road above green valleys',
      focus: '50% 72%',
    },
  },
  {
    slug: 'tata-nexon',
    name: 'Tata Nexon',
    rate: 7500,
    category: 'SUV',
    label: 'Compact SUV',
    description: 'Compact proportions. A confident SUV stance.',
    introduction:
      'The Nexon brings a compact SUV shape to your Kathmandu plans. Share your itinerary and our team will confirm the vehicle, rental arrangement, and final terms.',
    imageAlt: 'Deep teal Tata Nexon parked on a tree-lined roadside',
    scene: {
      image: '/images/tata-nexon-profile.webp',
      alt: 'Teal Tata Nexon on a winding village road in the green foothills',
      focus: '50% 68%',
    },
  },
  {
    slug: 'byd-atto-1',
    name: 'BYD Atto 1',
    rate: 6500,
    category: 'Hatchback',
    label: 'Electric hatchback',
    description: 'A compact electric companion for city days.',
    introduction:
      'A city-sized electric hatchback and the lowest daily rate in our fleet. Choose the BYD Atto 1 for a compact way to explore, with a rental arranged around your plans.',
    imageAlt: 'Ivory BYD Atto 1 hatchback outside a modern concrete building',
    scene: {
      image: '/images/byd-atto-1-profile.webp',
      alt: 'Ivory BYD Atto 1 in profile in a brick and concrete courtyard',
      focus: '50% 58%',
    },
  },
]

export const lowestRate = Math.min(...vehicles.map((vehicle) => vehicle.rate))

export const business = {
  name: 'U Drive Rental Car Kathmandu',
  phone: '+9779800899505',
  phoneDisplay: '+977 980-0899505',
  whatsapp: '9779800899505',
  email: 'udriverentalservice@gmail.com',
  facebook: 'https://www.facebook.com/people/U-Drive/61584871988112/',
} as const

export function findVehicle(slug: string | undefined) {
  return vehicles.find((vehicle) => vehicle.slug === slug)
}

export function money(amount: number) {
  return `NPR ${new Intl.NumberFormat('en-NP').format(amount)}`
}

export function modeName(mode: RentalMode) {
  return mode === 'self-drive' ? 'Self drive' : 'With driver'
}

export function bookingLink(slug?: string, mode?: RentalMode) {
  const query = new URLSearchParams()
  if (slug) query.set('vehicle', slug)
  if (mode) query.set('mode', mode)
  return `/booking${query.size ? `?${query}` : ''}`
}

export function whatsappLink(
  message = 'Hello U Drive! I would like to ask about a car rental in Nepal.',
) {
  return `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`
}
