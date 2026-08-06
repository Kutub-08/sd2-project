import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import type { RootState } from '../../app/store'
import { useFavorites } from '../../hooks/queries/useFavorites'
import { useInquiriesSent } from '../../hooks/queries/useInquiries'
import Skeleton from '../../components/ui/Skeleton'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
}

export default function TenantDashboard() {
  const user = useSelector((state: RootState) => state.auth.user)
  const { data: favData, isLoading: favLoading } = useFavorites(1, 4)
  const { data: inqData, isLoading: inqLoading } = useInquiriesSent(1, 4)

  const savedFavorites = favData?.total ?? 0
  const inquiriesSent = inqData?.total ?? 0

  return (
    <div className="min-h-full bg-black">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <motion.h1
          variants={itemVariants}
          className="text-2xl font-bold text-white"
        >
          Welcome, {user?.name ?? 'Tenant'}
        </motion.h1>

        <motion.div
          variants={containerVariants}
          className="grid grid-cols-2 gap-4 sm:grid-cols-3"
        >
          <motion.div
            variants={itemVariants}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
          >
            <p className="text-2xl font-bold text-white">{savedFavorites}</p>
            <p className="mt-1 text-xs text-white/50">Saved Favorites</p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
          >
            <p className="text-2xl font-bold text-white">{inquiriesSent}</p>
            <p className="mt-1 text-xs text-white/50">Inquiries Sent</p>
          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="grid gap-6 sm:grid-cols-2"
        >
          <motion.div
            variants={itemVariants}
            className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
          >
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-white">Recent Favorites</h2>
              <Link to="/dashboard/favorites" className="text-xs text-blue-400 hover:text-blue-300">
                View all
              </Link>
            </div>

            {favLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            ) : !favData || favData.items.length === 0 ? (
              <p className="py-6 text-center text-sm text-white/40">
                No favorites yet.{' '}
                <Link to="/listings" className="text-blue-400 underline hover:text-blue-300">
                  Browse listings
                </Link>
              </p>
            ) : (
              <div className="space-y-2">
                {favData.items.map((fav) => (
                  <Link
                    key={fav.id}
                    to={`/listings/${fav.listingId}`}
                    className="block truncate rounded-lg bg-white/5 px-3 py-2 text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    {fav.listing.title}
                  </Link>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
          >
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-white">Recent Inquiries</h2>
              <Link to="/dashboard/inquiries" className="text-xs text-blue-400 hover:text-blue-300">
                View all
              </Link>
            </div>

            {inqLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            ) : !inqData || inqData.items.length === 0 ? (
              <p className="py-6 text-center text-sm text-white/40">
                No inquiries sent yet.{' '}
                <Link to="/listings" className="text-blue-400 underline hover:text-blue-300">
                  Browse listings
                </Link>
              </p>
            ) : (
              <div className="space-y-2">
                {inqData.items.map((inq) => (
                  <div
                    key={inq.id}
                    className="rounded-lg bg-white/5 px-3 py-2 text-sm text-white/70"
                  >
                    <p className="truncate">{inq.listing?.title ?? 'Listing'}</p>
                    <p className="mt-0.5 text-xs text-white/40">{inq.status}</p>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}
