import { Armchair, CarFront, Check, Gauge, Zap } from 'lucide-react'
import { modelDetails } from '@/lib/vehicle-specs'
import type { Vehicle } from '@/lib/fleet'

export function VehicleSpecs({ vehicle }: { vehicle: Vehicle }) {
  const model = modelDetails[vehicle.slug]
  const specs = [
    { label: 'Body style', value: vehicle.category, Icon: CarFront },
    { label: 'Seating', value: model.seats, Icon: Armchair },
    { label: 'Transmission', value: model.transmission, Icon: Gauge },
    { label: 'Powertrain', value: model.power, Icon: Zap },
  ]
  return (
    <section className="model-specification" aria-labelledby="spec-heading">
      <div>
        <p className="drive-eyebrow">Vehicle guide</p>
        <h2 id="spec-heading" className="drive-section-title">
          Inside the {vehicle.name}.
        </h2>
        <p className="body-copy">{model.notes}</p>
      </div>
      <div>
        <dl className="model-spec-grid">
          {specs.map(({ label, value, Icon }) => (
            <div key={label}>
              <Icon size={19} />
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
        <ul className="model-highlights">
          {model.highlights.map((item) => (
            <li key={item}>
              <Check size={14} />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
