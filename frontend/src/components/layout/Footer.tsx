import { Link } from 'react-router-dom'

const columns = [
  {
    title: 'Marketplace',
    links: [
      { label: 'Browse flats', to: '/listings' },
      { label: 'AI Search', to: '/ai-search' },
      { label: 'Favorites', to: '/dashboard/favorites' },
    ],
  },
  {
    title: 'Account',
    links: [
      { label: 'Log in', to: '/login' },
      { label: 'Create account', to: '/register' },
      { label: 'Tenant dashboard', to: '/dashboard' },
      { label: 'Landlord dashboard', to: '/landlord/dashboard' },
    ],
  },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/10 bg-ink">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="sm:col-span-2 lg:col-span-2">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-7 w-7 items-center justify-center">
              <span className="absolute inset-0 rounded-md border border-teal/60" />
              <span className="h-2 w-2 rounded-sm bg-amberglow" />
            </span>
            <span className="font-display text-lg font-semibold tracking-tight text-paper">
              To-Let
            </span>
          </div>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-mist">
            A flat-rental marketplace for Bangladesh. Rent verified flats direct
            from landlords across Dhaka, Chattogram and 10 more cities — no
            brokers, no brokerage.
          </p>
          <p className="mt-4 font-mono text-xs text-mist/70">
            Dhaka · Chattogram · Sylhet · Rajshahi · Khulna
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-paper">
              {col.title}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-mist transition-colors hover:text-teal"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h3 className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-paper">
            Landlord?
          </h3>
          <p className="mt-4 text-sm text-mist">
            List your flat for free and reach active tenants today.
          </p>
          <Link
            to="/register"
            className="mt-4 inline-block rounded-full bg-teal px-5 py-2 text-sm font-semibold text-ink-deep transition-transform hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-teal/60 focus-visible:outline-none"
          >
            Start listing
          </Link>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 font-mono text-xs text-mist sm:flex-row sm:px-6 lg:px-8">
          <span>&copy; {year} To-Let. All rights reserved.</span>
          <span>Flat rental marketplace · Bangladesh</span>
        </div>
      </div>
    </footer>
  )
}