import { money } from '@/lib/fleet'

export function Price({ amount, className }: { amount: number; className?: string }) {
  const [currency, value] = money(amount).split(' ')
  return (
    <span className={className ? `price ${className}` : 'price'}>
      <small>{currency}</small>
      <strong>{value}</strong>
      <span>/ day</span>
    </span>
  )
}
