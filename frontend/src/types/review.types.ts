export type Review = {
  id: string
  listingId: string
  tenantId: string
  rating: number
  comment: string
  createdAt: string
  tenant: {
    id: string
    name: string
  }
}