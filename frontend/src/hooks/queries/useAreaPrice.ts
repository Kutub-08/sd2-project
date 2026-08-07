import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { areaPrice } from '../../api/ai.api'
import type { AreaPriceResult } from '../../api/ai.api'

export function useAreaPrice() {
  const [data, setData] = useState<AreaPriceResult | null>(null)

  const mutation = useMutation({
    mutationFn: (query: string) => areaPrice(query),
    onSuccess: (res) => setData(res),
  })

  return {
    ...mutation,
    data,
  }
}
