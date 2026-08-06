import { useQuery } from '@tanstack/react-query'
import { getFavorites } from '../../api/favorites.api'

export function useFavorites(page = 1, limit = 20) {
  return useQuery({
    queryKey: ['favorites', page, limit],
    queryFn: () => getFavorites(page, limit),
  })
}
