import test from 'node:test'
import assert from 'node:assert/strict'
import {
  nextDate,
  rentalDays,
  todayInNepal,
  validateContact,
  validateTrip,
} from '../lib/rental-request.ts'
import { bookingLink, findVehicle, money, vehicles, whatsappLink } from '../lib/fleet.ts'

import { readTripSearch, tripHref } from '../lib/trip-search.ts'

test('search choices survive the fleet, model and booking handoff', () => {
  const values = {
    vehicle: 'byd-atto-3',
    mode: 'with-driver',
    pickup: 'Kathmandu',
    start: '2027-02-01',
    end: '2027-02-04',
    destination: 'Pokhara',
  }
  const trip = readTripSearch(values, '2027-01-01')
  assert.deepEqual(trip, values)
  const href = tripHref('/booking', trip)
  assert.deepEqual(Object.fromEntries(new URL(href, 'https://example.com').searchParams), values)
  assert.equal(
    money(findVehicle(trip.vehicle).rate * rentalDays(trip.start, trip.end)),
    'NPR 27,000',
  )
})
test('untrusted query values cannot introduce a price, invalid model, or reversed rental', () => {
  const trip = readTripSearch(
    {
      vehicle: 'unknown',
      mode: ['bad'],
      start: '2027-10-02',
      end: '2027-10-01',
      rate: '1',
      pickup: ' A & B ',
      destination: 'x'.repeat(80),
    },
    '2027-01-01',
  )
  assert.equal(trip.vehicle, '')
  assert.equal(trip.mode, 'self-drive')
  assert.equal(trip.end, '')
  assert.equal(trip.pickup, 'A & B')
  assert.equal(trip.destination.length, 60)
  assert.equal('rate' in trip, false)
  assert.equal(readTripSearch({ start: '2025-01-01', end: '2025-02-01' }, '2026-01-01').start, '')
  assert.equal(tripHref('/fleet', {}), '/fleet')
})

const draft = {
  vehicle: 'deepal-s05',
  mode: 'self-drive',
  pickupDate: '2027-02-01',
  returnDate: '2027-02-04',
  pickupLocation: 'Kathmandu',
  sameReturn: true,
  returnLocation: '',
  name: 'Test Driver',
  phone: '+977 9800000000',
  email: 'driver@example.com',
  notes: '',
}

test('the fleet preserves every client-provided daily rate', () => {
  assert.deepEqual(
    vehicles.map(({ name, rate }) => [name, rate]),
    [
      ['Deepal S05', 10000],
      ['BYD Atto 3', 9000],
      ['Tata Nexon', 7500],
      ['BYD Atto 1', 6500],
    ],
  )
})
test('three days in the Deepal gives NPR 30,000', () => {
  assert.equal(
    money(findVehicle('deepal-s05').rate * rentalDays(draft.pickupDate, draft.returnDate)),
    'NPR 30,000',
  )
})
test('date estimates support same-day trips, leap days and month boundaries', () => {
  assert.equal(rentalDays('2028-02-29', '2028-02-29'), 1)
  assert.equal(rentalDays('2028-02-28', '2028-03-01'), 2)
  assert.equal(nextDate('2026-12-31'), '2027-01-01')
})
test('missing, reversed, and impossible dates have no estimate', () => {
  for (const [start, end] of [
    ['', ''],
    ['2027-02-30', '2027-03-01'],
    ['2027-02-03', '2027-02-02'],
    ['invalid', '2027-02-01'],
  ])
    assert.equal(rentalDays(start, end), null)
})
test('pickup date uses Kathmandu local midnight', () => {
  assert.equal(todayInNepal(new Date('2026-11-25T18:14:59Z')), '2026-11-25')
  assert.equal(todayInNepal(new Date('2026-11-25T18:15:00Z')), '2026-11-26')
})
test('trip validation checks pickup, return, and separate drop-off', () => {
  assert.deepEqual(validateTrip(draft, '2027-02-01'), {})
  assert.ok(validateTrip(draft, '2027-02-02').pickupDate)
  assert.ok(validateTrip({ ...draft, returnDate: '2027-01-31' }, '2027-01-01').returnDate)
  assert.ok(validateTrip({ ...draft, pickupLocation: ' ' }, '2027-01-01').pickupLocation)
  assert.ok(validateTrip({ ...draft, sameReturn: false }, '2027-01-01').returnLocation)
})
test('pickup timing is optional, uses local time, and rejects impossible hours', () => {
  assert.deepEqual(validateTrip({ ...draft, pickupTime: '08:30' }, '2027-01-01'), {})
  assert.ok(validateTrip({ ...draft, pickupTime: '25:99' }, '2027-01-01').pickupTime)
})
test('contact validation accepts international numbers and rejects incomplete requests', () => {
  assert.deepEqual(validateContact(draft), {})
  assert.deepEqual(validateContact({ ...draft, phone: '+44 (20) 1234 5678' }), {})
  for (const phone of ['abc12345', '123', '+1234567890123456'])
    assert.ok(validateContact({ ...draft, phone }).phone)
  assert.ok(validateContact({ ...draft, name: '  ' }).name)
  for (const email of ['', 'not-an-email', 'a@', 'a@a .com'])
    assert.ok(validateContact({ ...draft, email }).email)
  assert.ok(validateContact({ ...draft, notes: 'n'.repeat(601) }).notes)
})
test('inquiry links preserve mode and safely encode message contents', () => {
  assert.equal(
    bookingLink('byd-atto-1', 'with-driver'),
    '/booking?vehicle=byd-atto-1&mode=with-driver',
  )
  assert.equal(findVehicle('missing'), undefined)
  const message = 'Pickup: A & B\nName: नेपाल'
  const url = new URL(whatsappLink(message))
  assert.equal(url.hostname, 'wa.me')
  assert.equal(url.pathname, '/9779800899505')
  assert.equal(url.searchParams.get('text'), message)
  assert.equal(url.searchParams.size, 1)
})
