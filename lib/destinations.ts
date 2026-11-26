export type Destination = {
  slug: string
  name: string
  kind: 'Heritage' | 'Nature' | 'Mountains'
  caption: string
  description: string
  overview: string
  stops: string[]
  planning: string
  alt: string
  source: string
}

export const destinations: Destination[] = [
  {
    slug: 'kathmandu',
    name: 'Kathmandu',
    kind: 'Heritage',
    caption: 'The heritage valley',
    description: 'Pagoda rooftops, temple courtyards, and the living heart of the valley.',
    overview:
      'Start close to home. Link the valley’s historic squares with time on foot in old neighbourhoods. A car works best between sights; the courtyards themselves are best explored slowly.',
    stops: ['Kathmandu Durbar Square', 'Swayambhunath', 'Boudhanath'],
    planning:
      'Share your hotel and the places you want to visit. The team can agree meeting points outside pedestrian-only areas.',
    alt: 'Pagoda temples in Kathmandu Durbar Square',
    source: 'https://ntb.gov.np/kathmandu',
  },
  {
    slug: 'pokhara',
    name: 'Pokhara',
    kind: 'Nature',
    caption: 'Lakeside escapes',
    description: 'A slower pace beside Phewa Lake, with the Annapurnas on the horizon.',
    overview:
      'Make the lakeside city a base for unhurried walks, hilltop viewpoints, and mountain mornings. Allow room in your itinerary for the road from Kathmandu and for changing visibility.',
    stops: ['Phewa Lake', 'Lakeside neighbourhood', 'Sarangkot viewpoint'],
    planning:
      'Tell us whether you plan a return journey or a different drop-off. For an electric car, agree charging stops before departure.',
    alt: 'Phewa Lake and the hills surrounding Pokhara',
    source: 'https://ntb.gov.np/pokhara',
  },
  {
    slug: 'chitwan',
    name: 'Chitwan',
    kind: 'Nature',
    caption: 'Into the lowlands',
    description: 'Riverbank sunsets and forest-edge towns in Nepal’s southern lowlands.',
    overview:
      'Trade the hills for the plains of the Terai. Plan a road transfer to your accommodation and leave time for riverside walks and locally arranged nature activities.',
    stops: ['Sauraha', 'Rapti riverbank', 'Chitwan park gateway'],
    planning:
      'A rental transfer is separate from a national park excursion. Arrange park access, permits, and activities with the appropriate local operator.',
    alt: 'Visitors and an elephant at the forest edge in Chitwan',
    source: 'https://ntb.gov.np/chitwan',
  },
  {
    slug: 'mustang',
    name: 'Mustang',
    kind: 'Mountains',
    caption: 'Himalayan horizons',
    description: 'Wind-shaped valleys, mountain villages, and a very different side of Nepal.',
    overview:
      'Mustang is a high-country journey where the road matters as much as the destination. Build your plans around the season, current road conditions, and a suitable vehicle rather than a fixed driving time.',
    stops: ['Kali Gandaki valley', 'Jomsom area', 'Kagbeni village'],
    planning:
      'Not every rental vehicle or self-drive itinerary is suitable. Confirm road access, vehicle suitability, altitude planning, and any required permits before booking.',
    alt: 'An outdoor community gathering in Mustang, Nepal',
    source: 'https://ntb.gov.np/',
  },
  {
    slug: 'nagarkot',
    name: 'Nagarkot',
    kind: 'Mountains',
    caption: 'The valley rim',
    description: 'Ridge roads and wide mountain views just beyond the Kathmandu Valley.',
    overview:
      'Plan a hill-country break on the valley’s eastern rim. Nagarkot is a place for quiet viewpoints and an overnight stay, with mountain visibility depending on the weather.',
    stops: ['Nagarkot ridge', 'Sunrise viewpoints', 'Bhaktapur on the return'],
    planning:
      'Discuss an early pickup if sunrise is part of your plan. The team will confirm your meeting point and the roads for your dates.',
    alt: 'Mountain ridges at Nagarkot in the golden light',
    source: 'https://ntb.gov.np/en/nagarkot-sunrise-and-sunset',
  },
  {
    slug: 'lumbini',
    name: 'Lumbini',
    kind: 'Heritage',
    caption: 'A quieter pilgrimage',
    description: 'Peaceful monastery grounds and the sacred garden in the southern plains.',
    overview:
      'Take time to explore the sacred landscape of Lumbini. Plan vehicle drop-off near the visitor areas, then explore the garden and monastic zones by the permitted local means.',
    stops: ['Sacred Garden', 'Maya Devi Temple', 'Monastic zones'],
    planning:
      'Allow time on foot inside the heritage area. Share your preferred entry and collection points when you discuss the trip.',
    alt: 'The sacred heritage landscape of Lumbini',
    source: 'https://ntb.gov.np/en/lumbini-province',
  },
  {
    slug: 'everest-region',
    name: 'Everest Region',
    kind: 'Mountains',
    caption: 'Gateway to the high trails',
    description: 'Plan the road leg of a Himalayan trekking journey, not a drive to base camp.',
    overview:
      'The Everest region is a trekking destination. A car rental can support the accessible road portion of a wider journey, such as travel to an agreed departure point or trailhead.',
    stops: [
      'Kathmandu departure point',
      'An agreed road-accessible gateway',
      'Onward trek or flight',
    ],
    planning:
      'There is no rental-car route to Everest Base Camp. Flights, trekking logistics, and permits are separate; confirm the exact road endpoint with U Drive.',
    alt: 'Snow-covered Himalayan peaks in the Everest region',
    source: 'https://ntb.gov.np/everest',
  },
  {
    slug: 'bandipur',
    name: 'Bandipur',
    kind: 'Heritage',
    caption: 'A hilltop pause',
    description: 'Newari architecture, old trading streets, and a hillside stop between cities.',
    overview:
      'Break a longer journey with a stay in Bandipur. The old bazaar is the centrepiece: leave the car at an agreed parking point and explore its traditional buildings on foot.',
    stops: ['Bandipur old bazaar', 'Hilltop viewpoints', 'Tundikhel'],
    planning:
      'Confirm parking and the walk to your accommodation. Bandipur can be discussed as a stop between Kathmandu and Pokhara.',
    alt: 'Traditional architecture in the hill town of Bandipur',
    source: 'https://ntb.gov.np/bandipur',
  },
]

export function findDestination(slug: string) {
  return destinations.find((d) => d.slug === slug)
}
