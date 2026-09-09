import { motion, useReducedMotion } from 'framer-motion'
import { Star } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useReviews } from '../../hooks/queries/useReviews'
import StarRating from './StarRating'
import ReviewCard from './ReviewCard'
import ReviewForm from './ReviewForm'
import Skeleton from '../ui/Skeleton'
import type { RootState } from '../../app/store'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

export default function ReviewsSection({ listingId }: { listingId: string }) {
  const { data, isLoading } = useReviews(listingId)
  const user = useSelector((state: RootState) => state.auth.user)
  const reduceMotion = useReducedMotion()

  const reviews = data ?? []
  const count = reviews.length
  const avg = count > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / count : 0
  const tiers = [5, 4, 3, 2, 1].map((n) => ({ n, count: reviews.filter((r) => r.rating === n).length }))
  const maxCount = Math.max(0, ...tiers.map((t) => t.count))
  const alreadyReviewed = !!user && count > 0 && reviews.some((r) => r.tenant.id === user.id)

  const skeleton = (
    <div className="mt-3 space-y-3">
      {Array.from({ length: 2 }).map((_, i) => (
        <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="mt-3 h-3 w-full" />
          <Skeleton className="mt-2 h-3 w-2/3" />
        </div>
      ))}
    </div>
  )

  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="rounded-2xl border border-white/10 bg-ink-soft/60 p-6 backdrop-blur-sm"
    >
      <div className="mb-1 flex items-baseline gap-3">
        <h2 className="font-display text-lg font-semibold text-paper">Reviews</h2>
        {count > 0 && <span className="text-xs text-mist">{count} tenant{count === 1 ? '' : 's'}</span>}
      </div>

      {typeof data === 'undefined' && isLoading ? skeleton : null}

      {!isLoading && count > 0 && (
        <div className="mt-3 grid gap-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:grid-cols-[auto_1fr] md:items-center md:gap-10">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-6xl font-semibold leading-none tabular-nums text-paper">
                {avg.toFixed(1)}
              </span>
              <span className="text-base text-mist">/ 5</span>
            </div>
            <StarRating value={avg} size={16} className="mt-2.5" />
            <p className="mt-2 text-xs text-mist">
              {count} tenant{count === 1 ? '' : 's'} weighed in
            </p>
          </div>

          <dl className="space-y-2.5">
            {tiers.map(({ n, count: c }) => {
              const pct = maxCount > 0 ? (c / maxCount) * 100 : 0
              return (
                <div key={n} className="flex items-center gap-3">
                  <dt className="flex w-10 shrink-0 items-center gap-1 text-xs tabular-nums text-mist">
                    {n}
                    <Star className="h-3 w-3 fill-amberglow text-amberglow" />
                  </dt>
                  <dd className="flex flex-1 items-center gap-3">
                    <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        className="absolute inset-y-0 left-0 rounded-full bg-amberglow/80"
                        style={{ width: `${pct}%`, transformOrigin: 'left' }}
                        initial={reduceMotion ? undefined : { scaleX: 0 }}
                        whileInView={reduceMotion ? undefined : { scaleX: 1 }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                      />
                    </div>
                    <span className="w-8 shrink-0 text-right text-xs tabular-nums text-mist">{c}</span>
                  </dd>
                </div>
              )
            })}
          </dl>
        </div>
      )}

      {!isLoading && count === 0 && (
        <div className="mt-3 rounded-2xl border border-dashed border-white/15 p-6 text-sm text-paper/60">
          No tenant has judged this flat yet.
        </div>
      )}

      {count > 0 && (
        <div className="mt-5 space-y-3">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      )}

      <ReviewForm listingId={listingId} alreadyReviewed={alreadyReviewed} />
    </motion.section>
  )
}