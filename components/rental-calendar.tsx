import { DayPicker } from 'react-day-picker'
import 'react-day-picker/style.css'
import { todayInNepal } from '@/lib/rental-request'

function localDay(value: string) {
  const [year, month, day] = value.split('-').map(Number)
  return new Date(year, month - 1, day, 12)
}

export default function RentalCalendar({
  value,
  minimum,
  onSelect,
}: {
  value: string
  minimum: string
  onSelect: (value: string) => void
}) {
  const first = localDay(minimum)
  return (
    <DayPicker
      mode="single"
      required
      autoFocus
      selected={value ? localDay(value) : undefined}
      today={localDay(todayInNepal())}
      defaultMonth={value && value >= minimum ? localDay(value) : first}
      startMonth={first}
      disabled={{ before: first }}
      showOutsideDays
      navLayout="after"
      onSelect={(date) => {
        if (!date) return
        const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
        if (key >= minimum) onSelect(key)
      }}
    />
  )
}
