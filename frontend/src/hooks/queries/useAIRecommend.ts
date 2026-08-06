import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { recommendListings } from '../../api/ai.api'
import type { RecommendResult } from '../../api/ai.api'

export function useAIRecommend() {
  const [data, setData] = useState<RecommendResult | null>(null)

  const mutation = useMutation({
    mutationFn: (query: string) => recommendListings(query),
    onSuccess: (res) => setData(res),
  })

  return {
    ...mutation,
    data,
  }
}
