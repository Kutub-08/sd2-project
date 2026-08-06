import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addFavorite, removeFavorite } from '../../api/favorites.api'

type ToggleVars = {
  listingId: string
  isFavorited: boolean
  favoriteId?: string
}

export function useToggleFavorite() {
  const queryClient = useQueryClient()

  return useMutation<unknown, Error, ToggleVars, { previous: unknown }>({
    mutationFn: (vars: ToggleVars) => {
      if (vars.isFavorited && vars.favoriteId) {
        return removeFavorite(vars.favoriteId)
      }
      return addFavorite(vars.listingId)
    },

    onMutate: async (_vars: ToggleVars) => {
      await queryClient.cancelQueries({ queryKey: ['favorites'] })
      const previous = queryClient.getQueryData(['favorites'])
      return { previous }
    },

    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(['favorites'], context.previous)
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] })
    },
  })
}
