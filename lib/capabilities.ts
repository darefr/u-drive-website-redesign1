import { vehicles } from './fleet'

export const capabilities = [
  {
    id: 'cars',
    label: 'Fleet models',
    value: vehicles.length,
    prefix: '',
    detail: 'From hatchback to SUV',
  },
  {
    id: 'modes',
    label: 'Rental options',
    value: 2,
    prefix: '',
    detail: 'Self drive or with driver',
  },
  {
    id: 'price',
    label: 'Starting daily rate',
    value: Math.min(...vehicles.map((v) => v.rate)),
    prefix: 'NPR',
    detail: 'Vehicle rental per day',
  },
  {
    id: 'area',
    label: 'Service coverage',
    value: null,
    prefix: '',
    detail: 'Kathmandu & across Nepal',
  },
] as const
