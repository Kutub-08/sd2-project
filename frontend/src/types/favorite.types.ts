import type { Listing } from './listing.types'

export type Favorite = {
  id: string
  listingId: string
  userId: string
  listing: Listing
  createdAt: string
}
