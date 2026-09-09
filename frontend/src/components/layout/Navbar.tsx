import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout as logoutApi } from '../../api/auth.api'
import { logout } from '../../features/auth/authSlice'
import type { RootState, AppDispatch } from '../../app/store'

function navLinkClass({ isActive }: { isActive: boolean }) {
  return `group relative inline-flex items-center text-sm font-medium transition-colors ${
    isActive ? 'text-paper' : 'text-mist hover:text-paper'
  }`
}

function Underline({ active }: { active: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute inset-x-0 bottom-0.5 h-0.5 origin-left bg-teal transition-transform duration-300 ease-out ${
        active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
      }`}
    />
  )
}

export default function Navbar() {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ease-out ${
        scrolled
          ? 'border-b border-white/10 bg-ink-deep/95 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.8)]'
          : 'border-b border-transparent bg-ink-deep/50 backdrop-blur-xl'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="group flex items-center gap-2.5">
          <span className="relative flex h-7 w-7 items-center justify-center transition-transform duration-300 ease-out group-hover:scale-105">
            <span className="absolute inset-0 rounded-md border border-teal/60 transition-colors group-hover:border-teal" />
            <span className="h-2 w-2 rounded-[2px] bg-amberglow" />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-paper">
            To-Let
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <NavLink to="/" end className={navLinkClass}>
            {({ isActive }) => (
              <>
                Home
                <Underline active={isActive} />
              </>
            )}
          </NavLink>
          <NavLink to="/listings" className={navLinkClass}>
            {({ isActive }) => (
              <>
                Browse Flats
                <Underline active={isActive} />
              </>
            )}
          </NavLink>
          <NavLink to="/ai-search" className={navLinkClass}>
            {({ isActive }) => (
              <>
                AI Search
                <Underline active={isActive} />
              </>
            )}
          </NavLink>
        </div>

        <div className="flex items-center gap-3">
          {isAuthenticated && user ? (
            <>
              <span className="hidden text-xs text-mist sm:block">
                {user.name}{' '}
                <span className="text-mist/60">
                  ({user.role === 'LANDLORD' ? 'Landlord' : user.role === 'ADMIN' ? 'Admin' : 'Tenant'})
                </span>
              </span>
              <Link
                to={user.role === 'LANDLORD' ? '/landlord/dashboard' : user.role === 'ADMIN' ? '/admin' : '/dashboard'}
                className="group/cta relative rounded-full border border-line px-4 py-1.5 text-sm text-paper transition-all duration-300 ease-out hover:border-teal/50 hover:text-teal focus-visible:ring-2 focus-visible:ring-teal/60 focus-visible:outline-none"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-full opacity-0 ring-1 ring-teal/60 group-hover/cta:opacity-100 [animation:navpulse_1.8s_ease-in-out_infinite]"
                />
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm text-mist transition-colors hover:text-paper"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm text-mist transition-colors hover:text-paper"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="rounded-full bg-teal px-4 py-1.5 text-sm font-semibold text-ink-deep transition-all duration-300 ease-out hover:scale-[1.03] hover:shadow-[0_8px_24px_-8px_rgba(45,214,191,0.7)] focus-visible:ring-2 focus-visible:ring-teal/60 focus-visible:outline-none"
              >
                List your flat
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}