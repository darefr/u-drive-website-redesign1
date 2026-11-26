import { MapPin } from 'lucide-react'
import { Field, FieldLabel, FieldError, FieldGroup } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ModePicker } from '@/components/mode-picker'
import { DateField } from '@/components/date-field'
import { money, vehicles } from '@/lib/fleet'
import { nextDate, type RentalRequest, type RequestErrors } from '@/lib/rental-request'

const pickupTimes = Array.from(
  { length: 48 },
  (_, i) => `${String(Math.floor(i / 2)).padStart(2, '0')}:${i % 2 ? '30' : '00'}`,
)

export type FieldsProps = {
  request: RentalRequest
  errors: RequestErrors
  update: (patch: Partial<RentalRequest>) => void
}

export function TextField({
  label,
  error,
  ...props
}: React.ComponentProps<'input'> & { id: string; label: string; error?: string }) {
  return (
    <Field data-invalid={Boolean(error)}>
      <FieldLabel htmlFor={props.id}>
        {label}
        {props.required && (
          <span className="required-star" aria-hidden="true">
            *
          </span>
        )}
      </FieldLabel>
      <Input
        {...props}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${props.id}-error` : undefined}
      />
      <FieldError id={`${props.id}-error`}>{error}</FieldError>
    </Field>
  )
}

export function TripFields({
  request,
  errors,
  update,
  today,
  lockedVehicle = false,
}: FieldsProps & { today: string; lockedVehicle?: boolean }) {
  return (
    <FieldGroup className="booking-fields">
      <Field>
        <FieldLabel htmlFor="vehicle">Your vehicle</FieldLabel>
        <select
          id="vehicle"
          disabled={lockedVehicle}
          value={request.vehicle}
          onChange={(e) => update({ vehicle: e.target.value })}
        >
          {vehicles.map((v) => (
            <option key={v.slug} value={v.slug}>
              {v.name} — {money(v.rate)}/day
            </option>
          ))}
        </select>
      </Field>
      <ModePicker value={request.mode} onChange={(mode) => update({ mode })} />
      <div className="form-two-col">
        <DateField
          id="pickupDate"
          label="Pickup date"
          minimum={today}
          value={request.pickupDate}
          error={errors.pickupDate}
          onChange={(pickupDate) =>
            update({
              pickupDate,
              ...(!request.returnDate || request.returnDate < pickupDate
                ? { returnDate: nextDate(pickupDate) }
                : {}),
            })
          }
        />
        <DateField
          id="returnDate"
          label="Return date"
          minimum={request.pickupDate || today}
          value={request.returnDate}
          error={errors.returnDate}
          onChange={(returnDate) => update({ returnDate })}
        />
      </div>
      <div className="form-two-col">
        <Field>
          <FieldLabel htmlFor="handover">Handover preference</FieldLabel>
          <select
            id="handover"
            value={request.handover}
            onChange={(e) =>
              update({ handover: e.target.value === 'delivery' ? 'delivery' : 'pickup' })
            }
          >
            <option value="pickup">Collect the vehicle</option>
            <option value="delivery">Request delivery</option>
          </select>
        </Field>
        <Field data-invalid={Boolean(errors.pickupTime)}>
          <FieldLabel htmlFor="pickupTime">Preferred time (Nepal)</FieldLabel>
          <select
            id="pickupTime"
            value={request.pickupTime}
            onChange={(e) => update({ pickupTime: e.target.value })}
            aria-invalid={Boolean(errors.pickupTime)}
            aria-describedby={errors.pickupTime ? 'pickupTime-error' : undefined}
          >
            <option value="">Arrange with U Drive</option>
            {pickupTimes.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
          <FieldError id="pickupTime-error">{errors.pickupTime}</FieldError>
        </Field>
      </div>
      <TextField
        id="pickupLocation"
        label={
          request.handover === 'delivery'
            ? 'Preferred delivery location'
            : 'Preferred pickup location'
        }
        type="text"
        placeholder="Hotel, neighbourhood, or meeting point"
        required
        maxLength={160}
        autoComplete="off"
        value={request.pickupLocation}
        error={errors.pickupLocation}
        onChange={(e) => update({ pickupLocation: e.target.value })}
      />
      <label className="checkbox-line">
        <input
          type="checkbox"
          checked={request.sameReturn}
          onChange={(e) => update({ sameReturn: e.target.checked })}
        />
        Return to the same location
      </label>
      {!request.sameReturn && (
        <TextField
          id="returnLocation"
          label="Preferred drop-off location"
          type="text"
          placeholder="Where would you like to end your trip?"
          required
          maxLength={160}
          value={request.returnLocation}
          error={errors.returnLocation}
          onChange={(e) => update({ returnLocation: e.target.value })}
        />
      )}
      <p className="field-hint">
        <MapPin size={15} />
        Pickup and drop-off arrangements are confirmed with the team.
      </p>
    </FieldGroup>
  )
}

export function ContactFields({ request, errors, update }: FieldsProps) {
  return (
    <FieldGroup className="booking-fields">
      <TextField
        id="name"
        label="Full name"
        type="text"
        required
        autoComplete="name"
        maxLength={80}
        placeholder="Your name"
        value={request.name}
        error={errors.name}
        onChange={(e) => update({ name: e.target.value })}
      />
      <TextField
        id="phone"
        label="Phone number"
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        maxLength={25}
        required
        placeholder="Include your country code"
        value={request.phone}
        error={errors.phone}
        onChange={(e) => update({ phone: e.target.value })}
      />
      <TextField
        id="email"
        label="Email address"
        type="email"
        inputMode="email"
        autoComplete="email"
        required
        maxLength={254}
        placeholder="you@example.com"
        value={request.email}
        error={errors.email}
        onChange={(e) => update({ email: e.target.value })}
      />
      <Field data-invalid={Boolean(errors.notes)}>
        <FieldLabel htmlFor="notes">
          Additional message <span className="optional-label">Optional</span>
        </FieldLabel>
        <Textarea
          id="notes"
          rows={3}
          maxLength={600}
          placeholder="Your route, preferred pickup time, or anything we should know…"
          value={request.notes}
          aria-invalid={Boolean(errors.notes)}
          aria-describedby={errors.notes ? 'notes-error' : undefined}
          onChange={(e) => update({ notes: e.target.value })}
        />
        <FieldError id="notes-error">{errors.notes}</FieldError>
      </Field>
      <p className="field-hint">
        Your contact details are only handed to your chosen messaging service when you open your
        reviewed inquiry.
      </p>
    </FieldGroup>
  )
}
