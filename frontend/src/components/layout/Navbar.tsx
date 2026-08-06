import { Link, NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout as logoutApi } from '../../api/auth.api'
import { logout } from '../../features/auth/authSlice'
import type { RootState, AppDispatch } from '../../app/store'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `text-sm font-medium transition-colors ${isActive ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`

export default function Navbar() {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  async function handleLogout() {
    try {
      await logoutApi()
    } catch {
      // swallow — we clear local state regardless
    }
    dispatch(logout())
    navigate('/')
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        <Link to="/" className="text-lg font-bold text-blue-600">
          To-Let
        </Link>

        <div className="flex items-center gap-6">
          <NavLink to="/" className={linkClass} end>Home</NavLink>
          <NavLink to="/listings" className={linkClass}>Browse Listings</NavLink>
          <NavLink to="/ai-search" className={linkClass}>AI Search</NavLink>

          {isAuthenticated && user ? (
            <div className="flex items-center gap-4">
              <span className="text-xs text-gray-500">
                {user.name} ({user.role === 'LANDLORD' ? 'Landlord' : 'Tenant'})
              </span>
              <NavLink
                to={user.role === 'LANDLORD' ? '/landlord/dashboard' : '/dashboard'}
                className={linkClass}
              >
                Dashboard
              </NavLink>
              <button onClick={handleLogout} className="text-sm text-gray-600 hover:text-red-600">
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <NavLink to="/login" className={linkClass}>Login</NavLink>
              <Link
                to="/register"
                className="rounded bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
