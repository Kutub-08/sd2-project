import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { RootState } from '../../app/store'

function SidebarLink({ to, end, label }: { to: string; end?: boolean; label: string }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
          isActive
            ? 'bg-white/10 text-white'
            : 'text-white/50 hover:bg-white/5 hover:text-white/80'
        }`
      }
    >
      {({ isActive }) => (
        <>
          <span className={`relative flex h-1.5 w-1.5 shrink-0 ${isActive ? '' : 'opacity-0'}`}>
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-blue-500" />
          </span>
          {label}
        </>
      )}
    </NavLink>
  )
}

export default function DashboardSidebar() {
  const role = useSelector((state: RootState) => state.auth.role)

  return (
    <aside className="w-full shrink-0 lg:w-56">
      <nav className="space-y-1 rounded-2xl border border-white/10 bg-black/50 p-3 backdrop-blur-3xl">
        {role === 'TENANT' && (
          <>
            <SidebarLink to="/dashboard" end label="Dashboard" />
            <SidebarLink to="/dashboard/favorites" label="Favorites" />
            <SidebarLink to="/dashboard/inquiries" label="Sent Inquiries" />
          </>
        )}
        {role === 'LANDLORD' && (
          <>
            <SidebarLink to="/landlord/dashboard" end label="Dashboard" />
            <SidebarLink to="/landlord/listings/new" label="New Listing" />
            <SidebarLink to="/landlord/inquiries" label="Received Inquiries" />
          </>
        )}
      </nav>
    </aside>
  )
}
