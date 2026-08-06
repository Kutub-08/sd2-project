import { Link } from 'react-router-dom'
import { Heart, Bed, Bath, Maximize } from 'lucide-react'
import type { Listing } from '../../types/listing.types'
import { formatCurrency } from '../../utils/formatCurrency'

type Props = {
  listing: Listing
  isFavorited?: boolean
  onToggleFavorite?: (listingId: string) => void
}

export default function ListingCard({ listing, isFavorited, onToggleFavorite }: Props) {
  const primaryImage = listing.images?.find((img) => img.isPrimary) || listing.images?.[0]

  return (
    <div className="group relative overflow-hidden rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:scale-[1.03] hover:bg-white/10">
      <Link to={`/listings/${listing.id}`}>
        <div className="relative aspect-[4/3] overflow-hidden">
          {primaryImage ? (
            <img
              src={primaryImage.imageUrl}
              alt={listing.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-white/5 text-white/40">
              No image
            </div>
          )}

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 to-transparent" />

          <div className="absolute bottom-3 left-3 z-10">
            <p className="text-xl font-bold text-white">
              {formatCurrency(listing.price)}
              <span className="text-sm font-normal text-white/60">/mo</span>
            </p>
          </div>
        </div>
      </Link>

      {onToggleFavorite && (
        <button
          onClick={(e) => {
            e.preventDefault()
            onToggleFavorite(listing.id)
          }}
          className="absolute right-2 top-2 z-20 rounded-full bg-white/10 p-1.5 backdrop-blur-md transition-colors hover:bg-white/20"
          aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart
            className={`h-4 w-4 transition-colors ${
              isFavorited ? 'fill-red-500 text-red-500' : 'text-white/70'
            }`}
          />
        </button>
      )}

      <Link to={`/listings/${listing.id}`} className="block space-y-2 p-3">
        <h3 className="truncate text-sm font-medium text-white">
          {listing.title}
        </h3>

        <p className="text-xs text-white/60">
          {listing.area}, {listing.city}
        </p>

        <div className="flex flex-wrap items-center gap-1.5">
          <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-0.5 text-xs text-white/80 backdrop-blur-sm">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-blue-500" />
            </span>
            <Bed className="h-3 w-3" />
            {listing.bedrooms}
          </span>

          <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-0.5 text-xs text-white/80 backdrop-blur-sm">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-blue-500" />
            </span>
            <Bath className="h-3 w-3" />
            {listing.bathrooms}
          </span>

          <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-0.5 text-xs text-white/80 backdrop-blur-sm">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-blue-500" />
            </span>
            <Maximize className="h-3 w-3" />
            {listing.sizeSqft} sqft
          </span>
        </div>
      </Link>
    </div>
  )
}
