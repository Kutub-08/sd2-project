import { Star, MessageSquare } from 'lucide-react'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { useReviews } from '../../hooks/queries/useReviews'
import type { RootState } from '../../app/store'
import type { Review } from '../../types/review.types'
import RatingStars from './RatingStars'
import ReviewForm from './ReviewForm'
import Skeleton from '../ui/Skeleton'
import { formatDate } from '../../utils/formatDate'

type Props = {
  listingId: string
  landlordId: string
}

function averageRating(reviews: Review[]) {
  if (reviews.length === 0) return 0
  const total = reviews.reduce((sum, r) => sum + r.rating, 0)
  return Math.round((total / reviews.length) * 10) / 10
}

export default function ReviewSection({ listingId, landlordId }: Props) {
  const { data: reviews, isLoading, isError } = useReviews(listingId)
  const user = useSelector((state: RootState) => state.auth.user)

  const myReview = reviews?.find((r) => r.tenant.id === user?.id)
  const avg = averageRating(reviews ?? [])

  return (
    <motion.section
      variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } } }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      id="reviews-section"
      className="space-y-5"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-amberglow/30 bg-amberglow/10 text-amberglow">
          <MessageSquare className="h-5 w-5" />
        </div>
        <div>
          <h2 className="font-display text-lg font-semibold text-paper">Reviews &amp; Ratings</h2>
          {!isLoading && reviews && reviews.length > 0 ? (
            <p className="text-xs text-mist">
              <span className="font-semibold text-amberglow">{avg.toFixed(1)}</span> average from{' '}
              {reviews.length} review{reviews.length > 1 ? 's' : ''}
            </p>
          ) : (
            <p className="text-xs text-mist">No ratings yet</p>
          )}
        </div>
        {!isLoading && reviews && reviews.length > 0 && (
          <span className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-amberglow/30 bg-amberglow/10 px-3 py-1 text-xs font-semibold text-amberglow">
            <Star className="h-3.5 w-3.5 fill-amberglow" />
            {avg.toFixed(1)}
          </span>
        )}
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-white/10 bg-ink-soft/60 p-5">
              <Skeleton className="mb-3 h-4 w-32" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="mt-2 h-4 w-2/3" />
            </div>
          ))}
        </div>
      ) : isError || !reviews ? (
        <p className="rounded-2xl border border-white/10 p-5 text-sm text-mist">
          Couldn&#39;t load reviews. Please try again later.
        </p>
      ) : reviews.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/15 py-12 text-center">
          <Star className="mx-auto h-8 w-8 text-mist/40" />
          <p className="mt-3 font-display text-sm font-semibold text-paper">No reviews yet</p>
          <p className="mt-1 text-xs text-mist">Be the first to rate and comment on this listing</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {reviews.map((review) => (
            <li
              key={review.id}
              className="rounded-2xl border border-white/10 bg-ink-soft/60 p-5 backdrop-blur-sm"
            >
              <div className="mb-2 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-teal/30 bg-teal/10 text-sm font-semibold text-teal">
                  {review.tenant.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-paper">
                    {review.tenant.name}
                    {review.tenant.id === user?.id && <span className="ml-1.5 text-xs text-teal">(you)</span>}
                  </p>
                  <p className="text-xs text-mist">{formatDate(review.createdAt)}</p>
                </div>
                <span className="ml-auto">
                  <RatingStars value={review.rating} size="sm" />
                </span>
              </div>
              <p className="text-sm leading-relaxed text-paper/75">{review.comment}</p>
            </li>
          ))}
        </ul>
      )}

      <ReviewForm listingId={listingId} landlordId={landlordId} existingReview={myReview} />
    </motion.section>
  )
}