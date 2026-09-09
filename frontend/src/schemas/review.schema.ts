import { z } from 'zod'

export const reviewSchema = z.object({
  rating: z.number().int().min(1, 'Pick a rating between 1 and 5').max(5, 'Pick a rating between 1 and 5'),
  comment: z
    .string()
    .min(5, 'Say a little more — at least 5 characters')
    .max(1000, 'Keep it under 1000 characters'),
})

export type ReviewInput = z.infer<typeof reviewSchema>