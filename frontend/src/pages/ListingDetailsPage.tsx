import { useState, useEffect, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ChevronLeft,
  ChevronRight,
  X,
  MapPin,
  Building2,
  Bed,
  Bath,
  Maximize,
  ShieldCheck,
  Expand,
  Heart,
} from 'lucide-react'
import { useSelector } from 'react-redux'
import { useListing } from '../hooks/queries/useListing'
import { useListings } from '../hooks/queries/useListings'
import { useFavoriteIds } from '../hooks/queries/useFavoriteIds'
import { useToggleFavorite } from '../hooks/mutations/useToggleFavorite'
import InquiryForm from '../components/forms/InquiryForm'
import ReviewsSection from '../components/reviews/ReviewsSection'
import ListingCard from '../components/listings/ListingCard'
import Skeleton from '../components/ui/Skeleton'
import Badge from '../components/ui/Badge'
import { formatCurrency } from '../utils/formatCurrency'
import { formatDate } from '../utils/formatDate'
import type { RootState } from '../app/store'
import type { ListingImage } from '../types/listing.types'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

function StatCard({ label, value, sub, icon }: { label: string; value: string | number; sub?: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-ink-soft/60 p-5 backdrop-blur-sm transition-colors hover:border-teal/30">
      <p className="flex items-center gap-1.5 text-xs text-mist">
        <span className="text-teal">{icon}</span>
        {label}
      </p>
      <p className="mt-1.5 text-lg font-bold text-paper">
        {value}
        {sub ? <span className="text-sm font-normal text-mist"> {sub}</span> : null}
      </p>
    </div>
  )
}

function ImageLightbox({
  images,
  initialIdx,
  onClose,
}: {
  images: ListingImage[]
  initialIdx: number
  onClose: () => void
}) {
  const [idx, setIdx] = useState(initialIdx)

  const prev = useCallback(() => setIdx((p) => (p === 0 ? images.length - 1 : p - 1)), [images.length])
  const next = useCallback(() => setIdx((p) => (p + 1) % images.length), [images.length])

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [prev, next, onClose])

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-ink-deep/95 p-4" role="dialog" aria-modal="true" aria-label="Image viewer">
      <button
        onClick={onClose}
        className="absolute right-4 top-4 rounded-full bg-white/10 p-2.5 text-paper transition-colors hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal/50"
        aria-label="Close image viewer"
      >
        <X className="h-5 w-5" />
      </button>

      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-teal p-2.5 text-ink-950 transition-colors hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal/60"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={next}
            className="absolute right-[4.5rem] top-1/2 -translate-y-1/2 rounded-full bg-teal p-2.5 text-ink-950 transition-colors hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal/60"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      <img src={images[idx].imageUrl} alt={`Photo ${idx + 1} of ${images.length}`} className="max-h-[85vh] max-w-full rounded-2xl object-contain" />

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
        <p className="rounded-full bg-white/10 px-4 py-1.5 text-sm text-paper backdrop-blur-md">
          {idx + 1} / {images.length}
        </p>
      </div>
    </div>
  )
}

function ListingHeroGallery({
  images,
  title,
  price,
  area,
  city,
}: {
  images: ListingImage[]
  title: string
  price: number
  area: string
  city: string
}) {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)

  if (images.length === 0) {
    return (
      <div className="relative flex h-[50vh] w-full items-center justify-center bg-ink-soft md:h-[70vh]">
        <div className="text-center">
          <Building2 className="mx-auto h-12 w-12 text-mist/40" />
          <p className="mt-3 text-lg text-mist">No images available</p>
        </div>
      </div>
    )
  }

  const main = images[0]

  return (
    <>
      <div className="relative grid h-[50vh] grid-cols-1 gap-2 p-2 md:h-[70vh] md:grid-cols-[1.6fr_1fr]">
        <button
          type="button"
          onClick={() => setLightboxIdx(0)}
          className="group relative w-full overflow-hidden rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-teal/50"
          aria-label="Open image viewer"
        >
          <img src={main.imageUrl} alt={title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-deep/85 via-ink-deep/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5 text-left md:p-8">
            <h1 className="font-display text-2xl font-semibold tracking-tight text-paper md:text-4xl">{title}</h1>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-paper/80 md:text-base">
              <MapPin className="h-4 w-4 text-teal" /> {area}, {city}
            </p>
            <p className="mt-2 font-display text-xl font-semibold text-amberglow md:text-2xl">
              {formatCurrency(price)}
              <span className="text-sm font-normal text-mist">/mo</span>
            </p>
          </div>
          <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-ink-deep/70 px-3 py-1.5 text-xs text-paper/80 backdrop-blur-md">
            <Expand className="h-3.5 w-3.5" />
            View gallery
          </span>
        </button>

        <div className="hidden grid-cols-1 gap-2 md:grid">
          {images.slice(1, 3).map((img, i) => (
            <button
              key={img.id}
              type="button"
              onClick={() => setLightboxIdx(i + 1)}
              className="w-full overflow-hidden rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-teal/50"
              aria-label={`View image ${i + 2}`}
            >
              <img src={img.imageUrl} alt={`Photo ${i + 2}`} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
            </button>
          ))}
        </div>
      </div>

      {lightboxIdx !== null && (
        <ImageLightbox images={images} initialIdx={lightboxIdx} onClose={() => setLightboxIdx(null)} />
      )}
    </>
  )
}

function LoadingSkeleton() {
  return (
    <div className="bg-ink">
      <div className="h-[50vh] w-full animate-pulse bg-ink-soft md:h-[70vh]" />
      <div className="mx-auto max-w-7xl px-4 pb-10">
        <div className="relative z-10 -mt-12 mb-6">
          <Skeleton className="h-9 w-32 rounded-full" />
        </div>
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="rounded-2xl border border-white/10 bg-ink-soft p-5">
                  <Skeleton className="mb-2 h-3 w-16" />
                  <Skeleton className="h-6 w-20" />
                </div>
              ))}
            </div>
            <div className="rounded-2xl border border-white/10 bg-ink-soft/60 p-6">
              <Skeleton className="mb-3 h-5 w-24" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="mt-2 h-4 w-3/4" />
            </div>
          </div>
          <div className="hidden lg:block">
            <Skeleton className="h-72 w-full rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ListingDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const { data: listing, isLoading, isError } = useListing(id!)
  const similar = useListings({ area: listing?.area })
  const role = useSelector((state: RootState) => state.auth.role)
  const { ids: favoriteIds, map: favoriteMap, enabled: favoritesEnabled } = useFavoriteIds()
  const toggleFavorite = useToggleFavorite()

  const similarListings = (similar.data?.items ?? []).filter((l) => l.id !== listing?.id).slice(0, 3)

  function handleToggleFavorite(listingId: string) {
    toggleFavorite.mutate({
      listingId,
      isFavorited: favoriteIds.has(listingId),
      favoriteId: favoriteMap.get(listingId),
    })
  }

  if (isLoading) return <LoadingSkeleton />

  if (isError || !listing) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-ink px-4 text-center">
        <Building2 className="h-16 w-16 text-mist/40" />
        <p className="mt-4 font-display text-xl font-semibold text-paper">Listing not found</p>
        <p className="mt-1 text-sm text-mist">The listing you&#39;re looking for doesn&#39;t exist or has been removed</p>
        <Link
          to="/listings"
          className="mt-6 rounded-full bg-teal px-6 py-2 text-sm font-semibold text-ink-950 transition-colors hover:brightness-110"
        >
          Browse listings
        </Link>
      </div>
    )
  }

  const statusVariant = listing.status === 'AVAILABLE' ? 'success' : listing.status === 'RENTED' ? 'danger' : 'warning'
  const canInquire = role !== 'LANDLORD'

  return (
    <main className="bg-ink">
      <ListingHeroGallery
        images={listing.images ?? []}
        title={listing.title}
        price={listing.price}
        area={listing.area}
        city={listing.city}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="-mt-4 mb-8 flex items-center gap-3">
          <Link
            to="/listings"
            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-ink-soft px-4 py-2 text-sm text-paper/80 transition-colors hover:border-teal/40 hover:text-paper"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to listings
          </Link>
          <Badge variant={statusVariant}>{listing.status}</Badge>
          {favoritesEnabled && (
            <button
              type="button"
              onClick={() => handleToggleFavorite(listing.id)}
              aria-label={favoriteIds.has(listing.id) ? 'Remove from favorites' : 'Add to favorites'}
              className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-ink-soft px-4 py-2 text-sm text-paper/80 transition-colors hover:border-amberglow/40 hover:text-paper"
            >
              <Heart
                className={`h-4 w-4 ${favoriteIds.has(listing.id) ? 'fill-amberglow text-amberglow' : 'text-paper/70'}`}
              />
              {favoriteIds.has(listing.id) ? 'Saved' : 'Save'}
            </button>
          )}
        </div>

        <div className="grid gap-8 pb-24 lg:grid-cols-3 lg:pb-10">
          <div className="space-y-6 lg:col-span-2">
            <motion.section
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="grid grid-cols-2 gap-4 md:grid-cols-4"
            >
              <StatCard icon={<Maximize className="h-4 w-4" />} label="Size" value={listing.sizeSqft} sub="sqft" />
              <StatCard icon={<Bed className="h-4 w-4" />} label="Bedrooms" value={listing.bedrooms} />
              <StatCard icon={<Bath className="h-4 w-4" />} label="Bathrooms" value={listing.bathrooms} />
              <StatCard icon={<ShieldCheck className="h-4 w-4" />} label="Monthly rent" value={formatCurrency(listing.price)} sub="/mo" />
            </motion.section>

            <motion.section
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="rounded-2xl border border-white/10 bg-ink-soft/60 p-6 backdrop-blur-sm"
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-display text-lg font-semibold text-paper">Description</h2>
                  <p className="mt-1 text-xs text-mist">Listed on {formatDate(listing.createdAt)}</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-paper/70">{listing.description}</p>
            </motion.section>

            <ReviewsSection listingId={listing.id} />

            {listing.amenities.length > 0 && (
              <motion.section
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="rounded-2xl border border-white/10 bg-ink-soft/60 p-6 backdrop-blur-sm"
              >
                <h2 className="mb-4 font-display text-lg font-semibold text-paper">Amenities</h2>
                <div className="flex flex-wrap gap-2">
                  {listing.amenities.map((a) => (
                    <span
                      key={a}
                      className="inline-flex items-center rounded-full border border-line bg-white/5 px-3 py-1 text-xs text-paper/80"
                    >
                      <span className="relative mr-1.5 flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-60" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-teal" />
                      </span>
                      {a}
                    </span>
                  ))}
                </div>
              </motion.section>
            )}

            {listing.landlord && (
              <motion.section
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="rounded-2xl border border-white/10 bg-ink-soft/60 p-6 backdrop-blur-sm"
              >
                <h2 className="mb-3 font-display text-lg font-semibold text-paper">Listed by</h2>
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-teal/30 bg-teal/10 font-display text-sm font-semibold text-teal">
                    {listing.landlord.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-paper">{listing.landlord.name}</p>
                    <p className="text-xs text-mist">{listing.landlord.email}</p>
                  </div>
                </div>
              </motion.section>
            )}

            {canInquire && similarListings.length > 0 && (
              <motion.section
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <h2 className="mb-4 font-display text-lg font-semibold text-paper">Similar flats in {listing.area}</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {similarListings.map((s) => (
                    <ListingCard
                      key={s.id}
                      listing={s}
                      isFavorited={favoriteIds.has(s.id)}
                      onToggleFavorite={favoritesEnabled ? handleToggleFavorite : undefined}
                    />
                  ))}
                </div>
              </motion.section>
            )}

            {canInquire && (
              <motion.section
                id="inquiry-section"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="lg:hidden"
              >
                <div className="rounded-2xl border border-teal/20 bg-ink-soft p-6">
                  <h3 className="mb-4 font-display text-sm font-semibold text-paper">Contact Landlord</h3>
                  <InquiryForm listingId={listing.id} />
                </div>
              </motion.section>
            )}
          </div>

          {canInquire && (
            <aside className="lg:col-span-1">
              <div className="lg:sticky lg:top-6">
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  className="rounded-2xl border border-teal/20 bg-ink-soft p-6"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="font-display text-sm font-semibold text-paper">Contact Landlord</h3>
                    <Badge variant={statusVariant}>{listing.status}</Badge>
                  </div>
                  <InquiryForm listingId={listing.id} />
                </motion.div>
              </div>
            </aside>
          )}
        </div>
      </div>

      {canInquire && (
        <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-ink-soft/90 backdrop-blur-xl lg:hidden">
          <div className="flex items-center justify-between px-4 py-3">
            <div>
              <p className="font-display text-lg font-semibold text-amberglow">
                {formatCurrency(listing.price)}
                <span className="text-sm font-normal text-mist">/mo</span>
              </p>
            </div>
            <a
              href="#inquiry-section"
              className="rounded-lg bg-teal px-6 py-2 text-sm font-semibold text-ink-950 transition-colors hover:brightness-110"
            >
              Send Inquiry
            </a>
          </div>
        </div>
      )}
    </main>
  )
}