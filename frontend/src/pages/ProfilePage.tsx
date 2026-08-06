import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import type { RootState } from '../app/store'
import Badge from '../components/ui/Badge'

export default function ProfilePage() {
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth)

  if (!isAuthenticated || !user) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500">
        <p className="text-lg font-medium">Please sign in to view your profile</p>
        <Link to="/login" className="mt-4 text-sm text-blue-600 underline">Sign in</Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-6">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Profile</h1>

      <div className="space-y-4 rounded-lg border bg-white p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs text-gray-500">Name</p>
            <p className="text-sm font-medium text-gray-900">{user.name}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Email</p>
            <p className="text-sm font-medium text-gray-900">{user.email}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Phone</p>
            <p className="text-sm font-medium text-gray-900">{user.phone}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Role</p>
            <Badge variant={user.role === 'LANDLORD' ? 'info' : 'default'}>{user.role}</Badge>
          </div>
        </div>
      </div>
    </div>
  )
}
