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
      className="rounded-lg border border-white/10 bg-white/10 px-3 py-1.5 text-sm text-white backdrop-blur-sm transition-colors focus:border-white/30 focus:outline-none"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value} className="bg-gray-900 text-white">{o.label}</option>
      ))}
    </select>
  )
}
