import { z } from 'zod'

export const reviewSchema = z.object({
  rating: z
    .number({ message: 'Please select a rating' })
    .int('Rating must be a whole number')
    .min(1, 'Rating must be at least 1')
    .max(5, 'Rating must be at most 5'),
  comment: z
    .string()
    .min(5, 'Comment must be at least 5 characters')
    .max(1000, 'Comment too long'),
})

export type ReviewInput = z.infer<typeof reviewSchema>
