import { useState, useEffect, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, MapPin, Building2 } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useListing } from '../hooks/queries/useListing'
import InquiryForm from '../components/forms/InquiryForm'
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

function StatCard({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
      <p className="text-xs text-white/50">{label}</p>
      <p className="mt-1 text-lg font-bold text-white">
        {value}{sub ? <span className="text-sm font-normal text-white/40"> {sub}</span> : null}
      </p>
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
  const [idx, setIdx] = useState(0)
  const [hovering, setHovering] = useState(false)

  const prev = useCallback(() => setIdx((p) => (p === 0 ? images.length - 1 : p - 1)), [images.length])
  const next = useCallback(() => setIdx((p) => (p + 1) % images.length), [images.length])

  useEffect(() => {
    if (images.length <= 1 || hovering) return
    const t = setInterval(next, 5000)
    return () => clearInterval(t)
  }, [images.length, hovering, next])

  if (images.length === 0) {
    return (
      <div className="relative flex h-[50vh] w-full items-center justify-center bg-gradient-to-br from-gray-900 to-black md:h-[70vh]">
        <div className="text-center">
          <Building2 className="mx-auto h-12 w-12 text-white/20" />
          <p className="mt-3 text-lg text-white/30">No images available</p>
        </div>
      </div>
    )
  }

  return (
    <div
      className="relative h-[50vh] w-full overflow-hidden bg-black md:h-[70vh]"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {images.map((img, i) => (
        <img
          key={img.id}
          src={img.imageUrl}
          alt={`Photo ${i + 1}`}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            i === idx ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/60 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="mb-1 text-3xl font-bold text-white md:text-5xl">{title}</h1>
          <p className="flex items-center gap-1.5 text-lg text-white/80 md:text-xl">
            <MapPin className="h-4 w-4" /> {area}, {city}
          </p>
          <p className="mt-3 text-2xl font-bold text-white md:text-4xl">
            {formatCurrency(price)}
            <span className="text-lg font-normal text-white/60 md:text-xl">/mo</span>
          </p>
        </motion.div>
      </div>

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2.5 backdrop-blur-md transition-colors hover:bg-white/20 md:p-3"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-5 w-5 text-white md:h-6 md:w-6" />
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2.5 backdrop-blur-md transition-colors hover:bg-white/20 md:p-3"
            aria-label="Next image"
          >
            <ChevronRight className="h-5 w-5 text-white md:h-6 md:w-6" />
          </button>

          <div className="absolute bottom-4 right-4 flex gap-2 md:bottom-6 md:right-10">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIdx(i)}
                className={`h-2 rounded-full transition-all ${
                  i === idx ? 'w-6 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'
                }`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

function LoadingSkeleton() {
  return (
    <div className="bg-black">
      <div className="h-[50vh] w-full animate-pulse bg-gradient-to-br from-gray-900 to-black md:h-[70vh]" />
      <div className="mx-auto max-w-7xl px-4 pb-10">
        <div className="relative z-10 -mt-12 mb-6">
          <Skeleton className="h-9 w-28 rounded-full" />
        </div>
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <Skeleton className="mb-2 h-3 w-16" />
                  <Skeleton className="h-6 w-20" />
                </div>
              ))}
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <Skeleton className="mb-3 h-5 w-24" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="mt-2 h-4 w-3/4" />
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <Skeleton className="mb-3 h-5 w-28" />
              <div className="flex gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-7 w-20 rounded-full" />
                ))}
              </div>
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
  const role = useSelector((state: RootState) => state.auth.role)

  if (isLoading) return <LoadingSkeleton />

  if (isError || !listing) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white/50">
        <Building2 className="h-16 w-16 text-white/20" />
        <p className="mt-4 text-xl font-medium">Listing not found</p>
        <p className="mt-1 text-sm text-white/30">The listing you&#39;re looking for doesn&#39;t exist or has been removed</p>
        <Link
          to="/listings"
          className="mt-6 rounded-full bg-white/10 px-6 py-2 text-sm text-white/80 backdrop-blur-sm transition-colors hover:bg-white/20"
        >
          Browse listings
        </Link>
      </div>
    )
  }

  const statusVariant = listing.status === 'AVAILABLE' ? 'success' : listing.status === 'RENTED' ? 'danger' : 'warning'
  const canInquire = role !== 'LANDLORD'

  return (
    <main className="bg-black">
      <ListingHeroGallery
        images={listing.images ?? []}
        title={listing.title}
        price={listing.price}
        area={listing.area}
        city={listing.city}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="-mt-12 mb-6">
          <Link
            to="/listings"
            className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-sm text-white/80 backdrop-blur-md transition-colors hover:bg-white/20"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to listings
          </Link>
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
              <StatCard label="Price" value={formatCurrency(listing.price)} sub="/mo" />
              <StatCard label="Size" value={listing.sizeSqft} sub="sqft" />
              <StatCard label="Bedrooms" value={listing.bedrooms} />
              <StatCard label="Bathrooms" value={listing.bathrooms} />
            </motion.section>

            <motion.section
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-white">Description</h2>
                  <p className="mt-1 text-xs text-white/40">Listed on {formatDate(listing.createdAt)}</p>
                </div>
                <Badge variant={statusVariant}>{listing.status}</Badge>
              </div>
              <p className="text-sm leading-relaxed text-white/70">{listing.description}</p>
            </motion.section>

            {listing.amenities.length > 0 && (
              <motion.section
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
              >
                <h2 className="mb-4 text-lg font-semibold text-white">Amenities</h2>
                <div className="flex flex-wrap gap-2">
                  {listing.amenities.map((a) => (
                    <span
                      key={a}
                      className="inline-flex items-center rounded-full bg-white/10 px-2.5 py-0.5 text-xs text-white/80 backdrop-blur-sm"
                    >
                      <span className="relative mr-1.5 flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-blue-500" />
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
                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
              >
                <h2 className="mb-3 text-lg font-semibold text-white">Listed by</h2>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-sm font-medium text-white">
                    {listing.landlord.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{listing.landlord.name}</p>
                    <p className="text-xs text-white/40">{listing.landlord.email}</p>
                  </div>
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
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                  <h3 className="mb-4 text-sm font-semibold text-white">Contact Landlord</h3>
                  <InquiryForm listingId={listing.id} />
                </div>
              </motion.section>
            )}
          </div>

          {canInquire && (
            <aside className="hidden lg:col-span-1 lg:block">
              <div className="sticky top-6">
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
                >
                  <h3 className="mb-4 text-sm font-semibold text-white">Contact Landlord</h3>
                  <InquiryForm listingId={listing.id} />
                </motion.div>
              </div>
            </aside>
          )}
        </div>
      </div>

      {canInquire && (
        <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-black/80 backdrop-blur-xl lg:hidden">
          <div className="flex items-center justify-between px-4 py-3">
            <div>
              <p className="text-lg font-bold text-white">
                {formatCurrency(listing.price)}
                <span className="text-sm font-normal text-white/50">/mo</span>
              </p>
            </div>
            <a
              href="#inquiry-section"
              className="rounded-lg bg-white/10 px-6 py-2 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              Send Inquiry
            </a>
          </div>
        </div>
      )}
    </main>
  )
}
