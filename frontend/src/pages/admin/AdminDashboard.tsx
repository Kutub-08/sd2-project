import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { isAxiosError } from 'axios'
import { toast } from 'sonner'
import { Users, Building2, ShieldCheck, Ban } from 'lucide-react'
import { getAdminUsers, updateUserRole, toggleUserBan, getAdminListings, updateListingStatus } from '../../api/admin.api'
import type { ListingStatus } from '../../types/listing.types'
import type { UserRole } from '../../types/user.types'
import type { ApiError } from '../../types/api.types'
import type { RootState } from '../../app/store'
import Pagination from '../../components/ui/Pagination'
import Skeleton from '../../components/ui/Skeleton'
import Badge from '../../components/ui/Badge'
import EmptyState from '../../components/ui/EmptyState'
import { formatCurrency } from '../../utils/formatCurrency'
import { formatDate } from '../../utils/formatDate'

type Tab = 'users' | 'listings'

function ToLetBoard({ status }: { status: ListingStatus }) {
  if (status === 'AVAILABLE') {
    return (
      <span className="inline-flex items-center rounded-[3px] bg-amberglow px-1.5 py-0.5 font-mono text-[10px] font-semibold tracking-[0.18em] text-ink-deep shadow-[0_0_12px_rgba(255,180,94,0.3)]">
        TO LET
      </span>
    )
  }
  if (status === 'RENTED') {
    return (
      <span className="inline-flex items-center rounded-[3px] bg-teal/15 px-1.5 py-0.5 font-mono text-[10px] font-semibold tracking-[0.18em] text-teal ring-1 ring-inset ring-teal/30">
        LET
      </span>
    )
  }
  return (
    <span className="inline-flex items-center rounded-[3px] border border-dashed border-amberglow/40 px-1.5 py-0.5 font-mono text-[10px] font-semibold tracking-[0.18em] text-amberglow/60 line-through decoration-amberglow/40">
      TO LET
    </span>
  )
}

function reportError(err: unknown, fallback: string) {
  if (isAxiosError<ApiError>(err) && err.response?.data?.error) {
    toast.error(err.response.data.error.message)
    return
  }
  toast.error(fallback)
}

function UsersSkeletons() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-12 w-full" />
      ))}
    </div>
  )
}

function ListingsSkeletons() {
  return <UsersSkeletons />
}

export default function AdminDashboard() {
  const queryClient = useQueryClient()
  const currentAdminId = useSelector((state: RootState) => state.auth.user?.id)

  const [tab, setTab] = useState<Tab>('users')
  const [userPage, setUserPage] = useState(1)
  const [roleFilter, setRoleFilter] = useState<UserRole | ''>('')
  const [listingPage, setListingPage] = useState(1)
  const [statusFilter, setStatusFilter] = useState<ListingStatus | ''>('')
  const [busyUserId, setBusyUserId] = useState<string | null>(null)
  const [busyListingId, setBusyListingId] = useState<string | null>(null)

  const usersQuery = useQuery({
    queryKey: ['admin', 'users', userPage, roleFilter],
    queryFn: () => getAdminUsers({ page: userPage, limit: 20, ...(roleFilter ? { role: roleFilter } : {}) }),
  })

  const listingsQuery = useQuery({
    queryKey: ['admin', 'listings', listingPage, statusFilter],
    queryFn: () => getAdminListings({ page: listingPage, limit: 20, ...(statusFilter ? { status: statusFilter } : {}) }),
  })

  const roleMutation = useMutation({
    mutationFn: ({ id, role }: { id: string; role: UserRole }) => updateUserRole(id, role),
    onMutate: ({ id }) => setBusyUserId(id),
    onSuccess: () => {
      toast.success('Role updated')
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] })
    },
    onError: (err: unknown) => reportError(err, 'Failed to update role'),
    onSettled: () => setBusyUserId(null),
  })

  const banMutation = useMutation({
    mutationFn: ({ id, banned }: { id: string; banned: boolean }) => toggleUserBan(id, banned),
    onMutate: ({ id }) => setBusyUserId(id),
    onSuccess: (updated) => {
      toast.success(updated.isBanned ? 'User banned' : 'User unbanned')
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] })
    },
    onError: (err: unknown) => reportError(err, 'Failed to update ban status'),
    onSettled: () => setBusyUserId(null),
  })

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: ListingStatus }) => updateListingStatus(id, status),
    onMutate: ({ id }) => setBusyListingId(id),
    onSuccess: (updated) => {
      toast.success(updated.status === 'INACTIVE' ? 'Listing taken down' : 'Listing restored')
      queryClient.invalidateQueries({ queryKey: ['admin', 'listings'] })
    },
    onError: (err: unknown) => reportError(err, 'Failed to update listing status'),
    onSettled: () => setBusyListingId(null),
  })

  const users = usersQuery.data?.items ?? []
  const listings = listingsQuery.data?.items ?? []

  const tabClass = (active: boolean) =>
    `inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm transition-colors ${
      active ? 'bg-teal font-semibold text-ink-deep' : 'text-mist hover:bg-white/5 hover:text-paper'
    }`

  const selectClass =
    'rounded-lg border border-white/10 bg-ink-soft px-3 py-2 text-sm text-paper transition-colors focus:border-teal/50 focus:outline-none'
  const cellClass = 'px-4 py-3'

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex items-center gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[5px] bg-amberglow font-mono text-[9px] font-bold leading-[1.1] tracking-tight text-ink-deep shadow-[0_0_20px_rgba(255,180,94,0.25)]">
          TO
          <br />
          LET
        </span>
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight text-paper">Admin Console</h1>
          <p className="mt-0.5 text-sm text-mist">Keep the rental board true</p>
        </div>
      </div>

      <div className="mb-6 flex items-center gap-2">
        <div className="flex rounded-xl border border-white/10 bg-ink-soft p-1">
          <button onClick={() => setTab('users')} className={tabClass(tab === 'users')} aria-pressed={tab === 'users'}>
            <Users className="h-4 w-4" />
            Users
          </button>
          <button onClick={() => setTab('listings')} className={tabClass(tab === 'listings')} aria-pressed={tab === 'listings'}>
            <Building2 className="h-4 w-4" />
            Listings
          </button>
        </div>
        {tab === 'users' ? (
          <select
            aria-label="Filter users by role"
            value={roleFilter}
            onChange={(e) => {
              setRoleFilter(e.target.value as UserRole | '')
              setUserPage(1)
            }}
            className={`${selectClass} ml-auto`}
          >
            <option value="">All roles</option>
            <option value="TENANT">Tenant</option>
            <option value="LANDLORD">Landlord</option>
            <option value="ADMIN">Admin</option>
          </select>
        ) : (
          <select
            aria-label="Filter listings by status"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value as ListingStatus | '')
              setListingPage(1)
            }}
            className={`${selectClass} ml-auto`}
          >
            <option value="">All statuses</option>
            <option value="AVAILABLE">Available</option>
            <option value="RENTED">Rented</option>
            <option value="INACTIVE">Inactive</option>
          </select>
        )}
      </div>

      {tab === 'users' ? (
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-ink-soft/60">
          {usersQuery.isLoading ? (
            <div className="p-4">
              <UsersSkeletons />
            </div>
          ) : users.length === 0 ? (
            <EmptyState
              icon={<Users className="h-10 w-10" />}
              title="No users found"
              description="Try clearing the role filter"
            />
          ) : (
            <>
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-mist">
                    <th className={cellClass}>Name</th>
                    <th className={cellClass}>Email</th>
                    <th className={cellClass}>Role</th>
                    <th className={cellClass}>Status</th>
                    <th className={cellClass}>Joined</th>
                    <th className={`${cellClass} text-right`}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => {
                    const isSelf = user.id === currentAdminId
                    const busy = busyUserId === user.id
                    return (
                      <tr key={user.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                        <td className={cellClass}>
                          <p className="font-medium text-paper">{user.name}</p>
                          {isSelf && <span className="text-xs text-teal">You</span>}
                        </td>
                        <td className={`${cellClass} text-mist`}>{user.email}</td>
                        <td className={cellClass}>
                          <select
                            aria-label={`Change role for ${user.name}`}
                            value={user.role}
                            disabled={isSelf || busy}
                            onChange={(e) => roleMutation.mutate({ id: user.id, role: e.target.value as UserRole })}
                            className={selectClass}
                          >
                            <option value="TENANT">Tenant</option>
                            <option value="LANDLORD">Landlord</option>
                            <option value="ADMIN">Admin</option>
                          </select>
                        </td>
                        <td className={cellClass}>
                          <div className="flex flex-wrap items-center gap-1.5">
                            <Badge variant={user.isVerified ? 'success' : 'warning'}>
                              {user.isVerified ? 'Verified' : 'Unverified'}
                            </Badge>
                            {user.isBanned && <Badge variant="danger">Banned</Badge>}
                          </div>
                        </td>
                        <td className={`${cellClass} text-mist`}>{formatDate(user.createdAt)}</td>
                        <td className={`${cellClass} text-right`}>
                          {isSelf ? (
                            <span className="inline-flex items-center gap-1 text-xs text-mist">
                              <ShieldCheck className="h-3.5 w-3.5 text-teal" />
                              Self
                            </span>
                          ) : (
                            <button
                              type="button"
                              disabled={busy}
                              onClick={() => banMutation.mutate({ id: user.id, banned: !user.isBanned })}
                              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
                                user.isBanned
                                  ? 'border-teal/40 bg-teal/10 text-teal hover:bg-teal/20'
                                  : 'border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20'
                              }`}
                            >
                              <Ban className="h-3.5 w-3.5" />
                              {user.isBanned ? 'Unban' : 'Ban'}
                            </button>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              <div className="border-t border-white/10 p-4">
                <Pagination currentPage={usersQuery.data?.page ?? 1} totalPages={usersQuery.data?.totalPages ?? 1} onPageChange={setUserPage} />
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-ink-soft/60">
          {listingsQuery.isLoading ? (
            <div className="p-4">
              <ListingsSkeletons />
            </div>
          ) : listings.length === 0 ? (
            <EmptyState
              icon={<Building2 className="h-10 w-10" />}
              title="No listings found"
              description="Try clearing the status filter"
            />
          ) : (
            <>
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-mist">
                    <th className={cellClass}>Title</th>
                    <th className={cellClass}>Landlord</th>
                    <th className={cellClass}>Rent</th>
                    <th className={cellClass}>Location</th>
                    <th className={cellClass}>Status</th>
                    <th className={`${cellClass} text-right`}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {listings.map((listing) => {
                    const busy = busyListingId === listing.id
                    const inactive = listing.status === 'INACTIVE'
                    return (
                      <tr key={listing.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                        <td className={`${cellClass} max-w-[220px]`}>
                          <p className="truncate font-medium text-paper">{listing.title}</p>
                        </td>
                        <td className={`${cellClass} text-mist`}>{listing.landlord?.name ?? 'Unknown'}</td>
                        <td className={cellClass}>
                          <p className="font-medium text-amberglow">{formatCurrency(Number(listing.price))}</p>
                        </td>
                        <td className={`${cellClass} text-mist`}>
                          {listing.area}, {listing.city}
                        </td>
                        <td className={cellClass}>
                          <ToLetBoard status={listing.status} />
                        </td>
                        <td className={`${cellClass} text-right`}>
                          <button
                            type="button"
                            disabled={busy}
                            onClick={() =>
                              statusMutation.mutate({ id: listing.id, status: inactive ? 'AVAILABLE' : 'INACTIVE' })
                            }
                            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
                              inactive
                                ? 'border-teal/40 bg-teal/10 text-teal hover:bg-teal/20'
                                : 'border-amberglow/30 bg-amberglow/10 text-amberglow hover:bg-amberglow/20'
                            }`}
                          >
                            <ShieldCheck className="h-3.5 w-3.5" />
                            {inactive ? 'Restore' : 'Take down'}
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              <div className="border-t border-white/10 p-4">
                <Pagination
                  currentPage={listingsQuery.data?.page ?? 1}
                  totalPages={listingsQuery.data?.totalPages ?? 1}
                  onPageChange={setListingPage}
                />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}