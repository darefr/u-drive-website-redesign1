import { Check, UserRoundCheck } from 'lucide-react'
import { WheelIcon } from '@/components/brand'
import type { RentalMode } from '@/lib/fleet'

export function ModePicker({
  value,
  onChange,
}: {
  value: RentalMode
  onChange: (mode: RentalMode) => void
}) {
  return (
    <fieldset className="mode-picker">
      <legend>Rental preference</legend>
      <div className="mode-choices">
        {(
          [
            {
              id: 'self-drive',
              name: 'Self Drive',
              description: 'I’ll take the wheel',
              Icon: WheelIcon,
            },
            {
              id: 'with-driver',
              name: 'With Driver',
              description: 'I’d like a driver',
              Icon: UserRoundCheck,
            },
          ] as const
        ).map(({ id, name, description, Icon }) => (
          <label key={id} className="mode-choice">
            <input
              type="radio"
              className="sr-only"
              name="rental-mode"
              value={id}
              checked={value === id}
              onChange={() => onChange(id)}
            />
            <span className="mode-choice-inner">
              <span className="mode-choice-heading">
                <Icon />
                <strong>{name}</strong>
                <span className="mode-indicator">{value === id && <Check size={10} />}</span>
              </span>
              <span className="mode-choice-description">{description}</span>
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}
