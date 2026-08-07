import type { ListingFilters } from '../../types/listing.types'

type Props = {
  sort: ListingFilters['sort']
  onChange: (sort: ListingFilters['sort']) => void
}

const options: { value: NonNullable<ListingFilters['sort']>; label: string }[] = [
  { value: 'newest', label: 'Newest first' },
  { value: 'oldest', label: 'Oldest first' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
]

export default function SortDropdown({ sort, onChange }: Props) {
  return (
    <select
      aria-label="Sort by"
      value={sort ?? 'newest'}
      onChange={(e) => onChange(e.target.value as ListingFilters['sort'])}
      className="rounded-lg border border-white/10 bg-ink-soft px-3 py-2 text-sm text-paper transition-colors focus:border-teal/50 focus:outline-none"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value} className="bg-ink text-paper">
          {o.label}
        </option>
      ))}
    </select>
  )
}