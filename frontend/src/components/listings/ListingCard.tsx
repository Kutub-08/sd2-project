import { Link } from 'react-router-dom'
import { Heart, Bed, Bath, Maximize, BadgeCheck, MapPin } from 'lucide-react'
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
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-ink-soft transition-all duration-300 hover:-translate-y-1 hover:border-teal/40 hover:shadow-[0_20px_60px_-25px_rgba(47,214,191,0.35)]">
      <Link to={`/listings/${listing.id}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden">
          {primaryImage ? (
            <img
              src={primaryImage.imageUrl}
              alt={listing.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-ink text-mist">
              No photos yet
            </div>
          )}

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink-deep/90 to-transparent" />

          {listing.status === 'AVAILABLE' && (
            <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full border border-teal/30 bg-ink-deep/70 px-2.5 py-1 text-xs font-medium text-teal backdrop-blur-md">
              <BadgeCheck className="h-3.5 w-3.5" />
              Verified
            </span>
          )}

          <div className="absolute bottom-3 left-3 z-10">
            <p className="text-xl font-semibold text-amberglow">
              {formatCurrency(listing.price)}
              <span className="text-sm font-normal text-paper/60">/mo</span>
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
          className="absolute right-2 top-2 z-20 rounded-full border border-white/10 bg-ink-deep/70 p-1.5 backdrop-blur-md transition-colors hover:border-white/30"
          aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart
            className={`h-4 w-4 transition-colors ${
              isFavorited ? 'fill-amberglow text-amberglow' : 'text-paper/70'
            }`}
          />
        </button>
      )}

      <Link to={`/listings/${listing.id}`} className="block space-y-2 p-3.5">
        <h3 className="truncate font-display text-sm font-semibold text-paper">{listing.title}</h3>

        <p className="flex items-center gap-1 text-xs text-mist">
          <MapPin className="h-3.5 w-3.5" />
          {listing.area}, {listing.city}
        </p>

        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-paper/80">
            <Bed className="h-3 w-3 text-teal" />
            {listing.bedrooms} bed
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-paper/80">
            <Bath className="h-3 w-3 text-teal" />
            {listing.bathrooms} bath
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-paper/80">
            <Maximize className="h-3 w-3 text-teal" />
            {listing.sizeSqft} sqft
          </span>
        </div>
      </Link>
    </div>
  )
}