import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { Building2, CircleCheckBig, Lock, Pencil, Trash2, Eye, Plus } from 'lucide-react'
import type { RootState } from '../../app/store'
import type { ListingStatus } from '../../types/listing.types'
import { useLandlordListings } from '../../hooks/queries/useLandlordListings'
import { useDeleteListing } from '../../hooks/mutations/useDeleteListing'
import { useUpdateListing } from '../../hooks/mutations/useUpdateListing'
import Skeleton from '../../components/ui/Skeleton'
import Badge from '../../components/ui/Badge'
import { formatCurrency } from '../../utils/formatCurrency'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
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

const statusOptions: ListingStatus[] = ['AVAILABLE', 'INACTIVE', 'RENTED']

function StatCard({ icon, value, label, tone }: { icon: React.ReactNode; value: number; label: string; tone: string }) {
  return (
    <motion.div
      variants={itemVariants}
      className="rounded-2xl border border-white/10 bg-ink-soft/60 p-5 backdrop-blur-sm transition-colors hover:border-teal/30"
    >
      <p className={`flex items-center gap-1.5 text-sm font-semibold ${tone}`}>
        {icon}
        {value}
      </p>
      <p className="mt-1 text-xs text-mist">{label}</p>
    </motion.div>
  )
}

export default function LandlordDashboard() {
  const user = useSelector((state: RootState) => state.auth.user)
  const { data: listings, isLoading } = useLandlordListings(user?.id ?? '')
  const deleteListing = useDeleteListing()
  const updateListing = useUpdateListing()

  function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this listing?')) return
    deleteListing.mutate(id, {
      onSuccess: () => toast.success('Listing deleted'),
      onError: () => toast.error('Failed to delete listing'),
    })
  }

  function handleStatusChange(id: string, status: ListingStatus) {
    updateListing.mutate(
      { id, data: { status } },
      {
        onSuccess: () => toast.success('Listing status updated'),
        onError: () => toast.error('Failed to update status'),
      }
    )
  }

  const totalListings = listings?.length ?? 0
  const availableListings = listings?.filter((l) => l.status === 'AVAILABLE').length ?? 0
  const rentedListings = listings?.filter((l) => l.status === 'RENTED').length ?? 0
  const activeListings = listings?.filter((l) => l.status === 'INACTIVE').length ?? 0

  return (
    <div className="min-h-full bg-ink">
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
        <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-teal">Landlord</p>
            <h1 className="mt-1 font-display text-2xl font-semibold tracking-tight text-paper">My Listings</h1>
          </div>
          <Link
            to="/landlord/listings/new"
            className="inline-flex items-center gap-1.5 rounded-full bg-teal px-4 py-2 text-sm font-semibold text-ink-950 transition-colors hover:brightness-110"
          >
            <Plus className="h-4 w-4" />
            New Listing
          </Link>
        </motion.div>

        <motion.div variants={containerVariants} className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard icon={<Building2 className="h-4 w-4" />} value={totalListings} label="Total Listings" tone="text-paper" />
          <StatCard icon={<CircleCheckBig className="h-4 w-4" />} value={availableListings} label="Available" tone="text-teal" />
          <StatCard icon={<Lock className="h-4 w-4" />} value={rentedListings} label="Rented" tone="text-amberglow" />
          <StatCard icon={<Eye className="h-4 w-4" />} value={activeListings} label="Inactive" tone="text-mist" />
        </motion.div>

        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-20 w-full rounded-2xl" />
            ))}
          </div>
        ) : !listings || listings.length === 0 ? (
          <motion.div
            variants={itemVariants}
            className="rounded-2xl border border-dashed border-white/15 py-20 text-center"
          >
            <Building2 className="mx-auto h-12 w-12 text-mist/40" />
            <p className="mt-3 font-display text-lg font-medium text-paper/70">No listings yet</p>
            <Link
              to="/landlord/listings/new"
              className="mt-2 inline-flex items-center gap-1 text-sm text-teal underline-offset-4 hover:underline"
            >
              <Plus className="h-4 w-4" />
              Create your first listing
            </Link>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            className="overflow-hidden rounded-2xl border border-white/10 bg-ink-soft/60"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10 font-mono text-[11px] uppercase tracking-[0.2em] text-mist">
                    <th className="px-4 py-3 font-medium">Listing</th>
                    <th className="px-4 py-3 font-medium">Price</th>
                    <th className="px-4 py-3 font-medium">Location</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {listings.map((listing) => (
                    <motion.tr
                      key={listing.id}
                      variants={itemVariants}
                      className="border-b border-white/5 transition-colors last:border-0 hover:bg-white/[0.03]"
                    >
                      <td className="px-4 py-3">
                        <p className="max-w-[220px] truncate font-medium text-paper">{listing.title}</p>
                        <p className="mt-0.5 text-xs text-mist">
                          {listing.bedrooms} bed &middot; {listing.bathrooms} bath &middot; {listing.sizeSqft} sqft
                        </p>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 font-semibold text-amberglow">{formatCurrency(listing.price)}/mo</td>
                      <td className="whitespace-nowrap px-4 py-3 text-mist">
                        {listing.area}, {listing.city}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Badge variant={statusVariant[listing.status]}>{listing.status}</Badge>
                          <select
                            value={listing.status}
                            onChange={(e) => handleStatusChange(listing.id, e.target.value as ListingStatus)}
                            aria-label={`Change status for ${listing.title}`}
                            className="rounded-lg border border-line bg-ink px-2 py-1 text-xs text-paper focus:border-teal/50 focus:outline-none"
                          >
                            {statusOptions.map((s) => (
                              <option key={s} value={s} className="bg-ink text-paper">
                                {s}
                              </option>
                            ))}
                          </select>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-2">
                          <Link
                            to={`/listings/${listing.id}`}
                            className="rounded-lg border border-white/10 p-2 text-mist transition-colors hover:border-teal/40 hover:text-teal"
                            aria-label={`View ${listing.title}`}
                          >
                            <Eye className="h-4 w-4" />
                          </Link>
                          <Link
                            to={`/landlord/listings/${listing.id}/edit`}
                            className="rounded-lg border border-white/10 p-2 text-mist transition-colors hover:border-teal/40 hover:text-teal"
                            aria-label={`Edit ${listing.title}`}
                          >
                            <Pencil className="h-4 w-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(listing.id)}
                            disabled={deleteListing.isPending}
                            className="rounded-lg border border-red-500/30 p-2 text-red-400 transition-colors hover:bg-red-500/10 disabled:opacity-50"
                            aria-label={`Delete ${listing.title}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}