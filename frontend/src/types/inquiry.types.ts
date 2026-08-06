import type { Listing } from './listing.types'

export type InquiryStatus = 'PENDING' | 'RESPONDED' | 'CLOSED'

export type Inquiry = {
  id: string
  listingId: string
  tenantId: string
  message: string
  status: InquiryStatus
  createdAt: string
  listing?: Pick<Listing, 'id' | 'title' | 'price' | 'area' | 'city'>
  tenant?: { id: string; name: string; email: string; phone: string }
}
