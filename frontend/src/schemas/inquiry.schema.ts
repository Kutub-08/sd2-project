import { z } from 'zod'

export const inquirySchema = z.object({
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message too long'),
})

export type InquiryInput = z.infer<typeof inquirySchema>
