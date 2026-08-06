import type { Listing } from '../../types/listing.types'
import ListingCard from './ListingCard'

type Props = {
  listings: Listing[]
}

export default function ListingGrid({ listings }: Props) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {listings.map((listing) => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </div>
  )
}
