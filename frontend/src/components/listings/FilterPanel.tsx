import { useState, type FormEvent } from 'react'
import type { ListingFilters } from '../../types/listing.types'

type Props = {
  filters: ListingFilters
  onApply: (patch: Partial<ListingFilters>) => void
  onReset: () => void
}

const bedroomOptions = [
  { value: '', label: 'Any' },
  { value: '1', label: '1+' },
  { value: '2', label: '2+' },
  { value: '3', label: '3+' },
  { value: '4', label: '4+' },
]

const bathroomOptions = [
  { value: '', label: 'Any' },
  { value: '1', label: '1+' },
  { value: '2', label: '2+' },
  { value: '3', label: '3+' },
]

type Chip = { label: string; onRemove: () => void }

function ActiveChip({ label, onRemove }: Chip) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-xs text-white/80 backdrop-blur-sm">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-blue-500" />
      </span>
      {label}
      <button type="button" onClick={onRemove} className="ml-0.5 text-white/40 hover:text-white/80">&times;</button>
    </span>
  )
}

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
    <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-white/10 bg-black/50 p-5 backdrop-blur-3xl">
      <h2 className="text-sm font-semibold text-white">Filters</h2>

      <div>
        <label className="mb-1.5 block text-xs text-white/50">Price range</label>
        <div className="flex gap-2">
          <input
            id="filter-minPrice"
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm text-white placeholder-white/30 backdrop-blur-sm transition-colors focus:border-white/30 focus:outline-none"
          />
          <input
            id="filter-maxPrice"
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm text-white placeholder-white/30 backdrop-blur-sm transition-colors focus:border-white/30 focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label htmlFor="filter-bedrooms" className="mb-1.5 block text-xs text-white/50">Bedrooms</label>
        <select
          id="filter-bedrooms"
          value={bedrooms}
          onChange={(e) => setBedrooms(e.target.value)}
          className="w-full rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm text-white backdrop-blur-sm transition-colors focus:border-white/30 focus:outline-none"
        >
          {bedroomOptions.map((o) => (
            <option key={o.value} value={o.value} className="bg-gray-900 text-white">{o.label}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="filter-bathrooms" className="mb-1.5 block text-xs text-white/50">Bathrooms</label>
        <select
          id="filter-bathrooms"
          value={bathrooms}
          onChange={(e) => setBathrooms(e.target.value)}
          className="w-full rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm text-white backdrop-blur-sm transition-colors focus:border-white/30 focus:outline-none"
        >
          {bathroomOptions.map((o) => (
            <option key={o.value} value={o.value} className="bg-gray-900 text-white">{o.label}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="filter-area" className="mb-1.5 block text-xs text-white/50">Area</label>
        <input
          id="filter-area"
          type="text"
          placeholder="e.g. Gulshan"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          className="w-full rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm text-white placeholder-white/30 backdrop-blur-sm transition-colors focus:border-white/30 focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="filter-city" className="mb-1.5 block text-xs text-white/50">City</label>
        <input
          id="filter-city"
          type="text"
          placeholder="e.g. Dhaka"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm text-white placeholder-white/30 backdrop-blur-sm transition-colors focus:border-white/30 focus:outline-none"
        />
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
          className="flex-1 rounded-lg bg-white/10 px-3 py-2 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20"
        >
          Apply
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="rounded-lg border border-white/10 px-3 py-2 text-sm text-white/50 transition-colors hover:bg-white/10"
        >
          Reset
        </button>
      </div>
    </form>
  )
}
