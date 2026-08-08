import { ArrowUpDown } from 'lucide-react'
import type { AISortOption } from '../../api/ai.api'

type Props = {
  sort: AISortOption
  onChange: (sort: AISortOption) => void
  disabled?: boolean
}

const options: { value: AISortOption; label: string }[] = [
  { value: 'relevance', label: 'Most relevant' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'highest_rated', label: 'Highest rated' },
  { value: 'most_reviewed', label: 'Most reviewed' },
  { value: 'nearest', label: 'Nearest first' },
]

export default function AISortDropdown({ sort, onChange, disabled }: Props) {
  return (
    <div className="relative inline-flex items-center">
      <ArrowUpDown className="pointer-events-none absolute left-3 h-3.5 w-3.5 text-teal" />
      <select
        aria-label="Sort results"
        value={sort}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value as AISortOption)}
        className="cursor-pointer appearance-none rounded-xl border border-white/10 bg-ink-soft py-2 pl-9 pr-8 text-sm text-paper transition-colors focus:border-teal/50 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-ink text-paper">
            {o.label}
          </option>
        ))}
      </select>
      <svg
        className="pointer-events-none absolute right-2.5 h-3.5 w-3.5 text-mist"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </div>
  )
}
