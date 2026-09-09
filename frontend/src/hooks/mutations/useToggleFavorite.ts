import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addFavorite, removeFavorite } from '../../api/favorites.api'

type ToggleVars = {
  listingId: string
  isFavorited: boolean
  favoriteId?: string
}

type FavoritesSnapshot = Array<[readonly unknown[], unknown]>

export function useToggleFavorite() {
  const queryClient = useQueryClient()

  return useMutation<unknown, Error, ToggleVars, { previous: FavoritesSnapshot }>({
    mutationFn: (vars: ToggleVars) => {
      if (vars.isFavorited && vars.favoriteId) {
        return removeFavorite(vars.favoriteId)
      }
      return addFavorite(vars.listingId)
    },

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['favorites'] })
      const previous: FavoritesSnapshot = queryClient.getQueriesData({ queryKey: ['favorites'] })
      return { previous }
    },

    onError: (_err, _vars, context) => {
      if (context?.previous?.length) {
        for (const [key, value] of context.previous) {
          queryClient.setQueryData(key, value)
        }
      }
    },

    onSettled: (_data, _err, vars) => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] })
      queryClient.invalidateQueries({ queryKey: ['listings'] })
      if (vars.listingId) {
        queryClient.invalidateQueries({ queryKey: ['listing', vars.listingId] })
      }
    },
  })
}