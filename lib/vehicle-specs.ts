export type ModelDetails = {
  seats: string
  transmission: string
  power: string
  feature: string
  notes: string
  highlights: string[]
}

// Shown for any specification that depends on the exact car supplied for a rental.
export const onRequest = 'Confirmed on request'

export const modelDetails: Record<string, ModelDetails> = {
  'deepal-s05': {
    seats: '5 seats',
    transmission: 'Automatic',
    power: 'Electric',
    feature: 'A longer way home',
    notes:
      'An electric SUV with a spacious five-seat layout. Tell the team about your passengers, luggage, and planned stops so they can help plan charging along your route.',
    highlights: ['Five-seat SUV layout', 'All-electric drive', 'Town and touring itineraries'],
  },
  'byd-atto-3': {
    seats: '5 seats',
    transmission: 'Automatic',
    power: 'Electric',
    feature: 'City to lakeside',
    notes:
      'The Atto 3 pairs an electric drivetrain with a five-seat cabin. For a multi-day journey, discuss the charging stops and luggage space you need before confirming.',
    highlights: ['Five-seat passenger cabin', 'Electric SUV body style', 'Automatic transmission'],
  },
  'tata-nexon': {
    seats: '5 seats',
    transmission: onRequest,
    power: onRequest,
    feature: 'A versatile city SUV',
    notes:
      'The Nexon is a compact, five-seat SUV. This model comes in different powertrain and transmission configurations; check the exact rental variant with U Drive.',
    highlights: [
      'Compact SUV proportions',
      'Five-seat cabin',
      'Vehicle variant confirmed on request',
    ],
  },
  'byd-atto-1': {
    seats: onRequest,
    transmission: 'Automatic',
    power: 'Electric',
    feature: 'Made for city days',
    notes:
      'A compact electric hatchback for a Kathmandu itinerary. Ask about the exact seating configuration and luggage capacity for your group before booking.',
    highlights: [
      'Compact hatchback format',
      'All-electric powertrain',
      'The lowest daily rate in this fleet',
    ],
  },
}
