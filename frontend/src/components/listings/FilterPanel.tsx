import { useState, type FormEvent } from 'react'
import { SlidersHorizontal, X } from 'lucide-react'
import type { ListingFilters } from '../../types/listing.types'

type Props = {
  filters: ListingFilters
  onApply: (patch: Partial<ListingFilters>) => void
  onReset: () => void
}

const bedroomOptions = [
  { value: '', label: 'Any' },
  { value: '1', label: '1+ Beds' },
  { value: '2', label: '2+ Beds' },
  { value: '3', label: '3+ Beds' },
  { value: '4', label: '4+ Beds' },
]

const bathroomOptions = [
  { value: '', label: 'Any' },
  { value: '1', label: '1+ Baths' },
  { value: '2', label: '2+ Baths' },
  { value: '3', label: '3+ Baths' },
]

type Chip = { label: string; onRemove: () => void }

function ActiveChip({ label, onRemove }: Chip) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-teal/30 bg-teal/10 px-2.5 py-1 text-xs text-teal">
      {label}
      <button
        type="button"
        onClick={onRemove}
        className="text-teal/60 transition-colors hover:text-teal"
        aria-label={`Remove ${label}`}
      >
        <X className="h-3 w-3" />
      </button>
    </span>
  )
}

const fieldClass =
  'w-full rounded-lg border border-line bg-ink-soft px-3 py-2 text-sm text-paper placeholder-mist/50 transition-colors focus:border-teal/50 focus:outline-none'

export default function FilterPanel({ filters, onApply, onReset }: Props) {
  const [minPrice, setMinPrice] = useState(filters.minPrice?.toString() ?? '')
  const [maxPrice, setMaxPrice] = useState(filters.maxPrice?.toString() ?? '')
  const [bedrooms, setBedrooms] = useState(filters.minBedrooms?.toString() ?? '')
  const [bathrooms, setBathrooms] = useState(filters.minBathrooms?.toString() ?? '')
  const [area, setArea] = useState(filters.area ?? '')
  const [city, setCity] = useState(filters.city ?? '')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const patch: Partial<ListingFilters> = {}
    if (minPrice) patch.minPrice = Number(minPrice)
    if (maxPrice) patch.maxPrice = Number(maxPrice)
    if (bedrooms) patch.minBedrooms = Number(bedrooms)
    if (bathrooms) patch.minBathrooms = Number(bathrooms)
    if (area) patch.area = area
    if (city) patch.city = city
    onApply(patch)
  }

  function handleReset() {
    setMinPrice('')
    setMaxPrice('')
    setBedrooms('')
    setBathrooms('')
    setArea('')
    setCity('')
    onReset()
  }

  const chips: Chip[] = []
  if (filters.minPrice) chips.push({ label: `Min ৳${filters.minPrice}`, onRemove: () => onApply({ minPrice: undefined }) })
  if (filters.maxPrice) chips.push({ label: `Max ৳${filters.maxPrice}`, onRemove: () => onApply({ maxPrice: undefined }) })
  if (filters.minBedrooms) chips.push({ label: `${filters.minBedrooms}+ Beds`, onRemove: () => onApply({ minBedrooms: undefined }) })
  if (filters.minBathrooms) chips.push({ label: `${filters.minBathrooms}+ Baths`, onRemove: () => onApply({ minBathrooms: undefined }) })
  if (filters.area) chips.push({ label: `Area: ${filters.area}`, onRemove: () => onApply({ area: undefined }) })
  if (filters.city) chips.push({ label: `City: ${filters.city}`, onRemove: () => onApply({ city: undefined }) })

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-white/10 bg-ink-soft/60 p-5 backdrop-blur-3xl">
      <div className="flex items-center gap-2">
        <SlidersHorizontal className="h-4 w-4 text-teal" />
        <h2 className="font-display text-sm font-semibold text-paper">Filters</h2>
      </div>

      <div>
        <label className="mb-1.5 block text-xs text-mist">Price range (৳/mo)</label>
        <div className="flex gap-2">
          <input
            id="filter-minPrice"
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className={fieldClass}
          />
          <input
            id="filter-maxPrice"
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="filter-bedrooms" className="mb-1.5 block text-xs text-mist">
          Bedrooms
        </label>
        <select id="filter-bedrooms" value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} className={fieldClass}>
          {bedroomOptions.map((o) => (
            <option key={o.value} value={o.value} className="bg-ink text-paper">
              {o.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="filter-bathrooms" className="mb-1.5 block text-xs text-mist">
          Bathrooms
        </label>
        <select id="filter-bathrooms" value={bathrooms} onChange={(e) => setBathrooms(e.target.value)} className={fieldClass}>
          {bathroomOptions.map((o) => (
            <option key={o.value} value={o.value} className="bg-ink text-paper">
              {o.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="filter-area" className="mb-1.5 block text-xs text-mist">
          Area
        </label>
        <input id="filter-area" type="text" placeholder="e.g. Bashundhara" value={area} onChange={(e) => setArea(e.target.value)} className={fieldClass} />
      </div>

      <div>
        <label htmlFor="filter-city" className="mb-1.5 block text-xs text-mist">
          City
        </label>
        <input id="filter-city" type="text" placeholder="e.g. Dhaka" value={city} onChange={(e) => setCity(e.target.value)} className={fieldClass} />
      </div>

      {chips.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {chips.map((chip, i) => (
            <ActiveChip key={i} label={chip.label} onRemove={chip.onRemove} />
          ))}
        </div>
      )}

      <div className="flex gap-2 pt-1">
        <button
          type="submit"
          className="flex-1 rounded-lg bg-teal px-3 py-2 text-sm font-semibold text-ink-deep transition-colors hover:brightness-110 focus-visible:ring-2 focus-visible:ring-teal/60 focus-visible:outline-none"
        >
          Apply
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="rounded-lg border border-line px-3 py-2 text-sm text-mist transition-colors hover:bg-white/5 hover:text-paper"
        >
          Reset
        </button>
      </div>
    </form>
  )
}