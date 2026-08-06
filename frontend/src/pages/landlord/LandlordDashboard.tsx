import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import type { RootState } from '../../app/store'
import { useLandlordListings } from '../../hooks/queries/useLandlordListings'
import { useDeleteListing } from '../../hooks/mutations/useDeleteListing'
import Skeleton from '../../components/ui/Skeleton'
import Badge from '../../components/ui/Badge'
import { formatCurrency } from '../../utils/formatCurrency'

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

const statusVariant = {
  AVAILABLE: 'success' as const,
  RENTED: 'danger' as const,
  INACTIVE: 'warning' as const,
}

export default function LandlordDashboard() {
  const user = useSelector((state: RootState) => state.auth.user)
  const { data: listings, isLoading } = useLandlordListings(user?.id ?? '')
  const deleteListing = useDeleteListing()

  function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this listing?')) return
    deleteListing.mutate(id, {
      onSuccess: () => toast.success('Listing deleted'),
      onError: () => toast.error('Failed to delete listing'),
    })
  }

  const totalListings = listings?.length ?? 0
  const availableListings = listings?.filter((l) => l.status === 'AVAILABLE').length ?? 0
  const rentedListings = listings?.filter((l) => l.status === 'RENTED').length ?? 0

  return (
    <div className="min-h-full bg-black">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <motion.div variants={itemVariants} className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">My Listings</h1>
          <Link
            to="/landlord/listings/new"
            className="rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20"
          >
            + New Listing
          </Link>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="grid grid-cols-2 gap-4 sm:grid-cols-3"
        >
          <motion.div
            variants={itemVariants}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
          >
            <p className="text-2xl font-bold text-white">{totalListings}</p>
            <p className="mt-1 text-xs text-white/50">Total Listings</p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
          >
            <p className="text-2xl font-bold text-green-400">{availableListings}</p>
            <p className="mt-1 text-xs text-white/50">Available</p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
          >
            <p className="text-2xl font-bold text-yellow-400">{rentedListings}</p>
            <p className="mt-1 text-xs text-white/50">Rented</p>
          </motion.div>
        </motion.div>

        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-24 w-full rounded-2xl" />
            ))}
          </div>
        ) : !listings || listings.length === 0 ? (
          <motion.div
            variants={itemVariants}
            className="rounded-2xl border border-white/10 bg-white/5 py-20 text-center backdrop-blur-sm"
          >
            <p className="text-lg font-medium text-white/50">No listings yet</p>
            <Link
              to="/landlord/listings/new"
              className="mt-2 inline-block text-sm text-blue-400 underline hover:text-blue-300"
            >
              Create your first listing
            </Link>
          </motion.div>
        ) : (
          <motion.div variants={containerVariants} className="space-y-4">
            {listings.map((listing) => (
              <motion.div
                key={listing.id}
                variants={itemVariants}
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-colors hover:bg-white/10"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="truncate text-sm font-semibold text-white">{listing.title}</h3>
                    <Badge variant={statusVariant[listing.status]}>{listing.status}</Badge>
                  </div>
                  <p className="mt-1 text-sm text-white/50">
                    {formatCurrency(listing.price)}/mo &middot; {listing.area}, {listing.city}
                  </p>
                </div>
                <div className="flex shrink-0 gap-2 pl-4">
                  <Link
                    to={`/landlord/listings/${listing.id}/edit`}
                    className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(listing.id)}
                    disabled={deleteListing.isPending}
                    className="rounded-lg border border-red-500/30 px-3 py-1.5 text-xs text-red-400 transition-colors hover:bg-red-500/10 disabled:opacity-50"
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
