import { LoaderCircle } from 'lucide-react'

export default function Loading() {
  return (
    <main id="main-content" className="shell route-loading" aria-busy="true">
      <span role="status">
        <LoaderCircle size={21} className="animate-spin" />
        Preparing your rental options…
      </span>
    </main>
  )
}
