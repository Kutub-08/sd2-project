import { useSearchParams } from 'react-router-dom'
import { useMemo, useCallback } from 'react'
import type { ListingFilters } from '../types/listing.types'

const DEFAULT_LIMIT = 12

export function useListingFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const filters: ListingFilters = useMemo(() => {
    const f: ListingFilters = {}

    const minPrice = searchParams.get('minPrice')
    if (minPrice) f.minPrice = Number(minPrice)

    const maxPrice = searchParams.get('maxPrice')
    if (maxPrice) f.maxPrice = Number(maxPrice)

    const bedrooms = searchParams.get('bedrooms')
    if (bedrooms) f.minBedrooms = Number(bedrooms)

    const bathrooms = searchParams.get('bathrooms')
    if (bathrooms) f.minBathrooms = Number(bathrooms)

    const area = searchParams.get('area')
    if (area) f.area = area

    const city = searchParams.get('city')
    if (city) f.city = city

    const sort = searchParams.get('sort')
    if (sort) f.sort = sort as ListingFilters['sort']

    const page = searchParams.get('page')
    f.page = page ? Number(page) : 1
    f.limit = DEFAULT_LIMIT

    return f
  }, [searchParams])

  const setFilters = useCallback(
    (patch: Partial<ListingFilters>) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev)
        const entries: [string, string | undefined][] = [
          ['minPrice', patch.minPrice?.toString()],
          ['maxPrice', patch.maxPrice?.toString()],
          ['bedrooms', patch.minBedrooms?.toString()],
          ['bathrooms', patch.minBathrooms?.toString()],
          ['area', patch.area],
          ['city', patch.city],
          ['sort', patch.sort],
        ]
        for (const [key, value] of entries) {
          if (value) {
            next.set(key, value)
          } else {
            next.delete(key)
          }
        }
        if (patch.page) {
          next.set('page', patch.page.toString())
        } else if (patch.page === undefined && !patch.minPrice && !patch.maxPrice && !patch.minBedrooms && !patch.minBathrooms && !patch.area && !patch.city && !patch.sort) {
        } else {
          next.set('page', '1')
        }
        return next
      }, { replace: true })
    },
    [setSearchParams],
  )

  return { filters, setFilters }
}
