import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useFavorites } from './useFavorites'
import type { RootState } from '../../app/store'

export function useFavoriteIds() {
  const { isAuthenticated, role } = useSelector((state: RootState) => state.auth)
  const enabled = isAuthenticated && role === 'TENANT'
  const { data } = useFavorites(1, 100, enabled)

  const map = useMemo(() => {
    const m = new Map<string, string>()
    if (data?.items) {
      for (const fav of data.items) m.set(fav.listingId, fav.id)
    }
    return m
  }, [data])

  const ids = useMemo(() => new Set(map.keys()), [map])

  return { ids, map, enabled }
}