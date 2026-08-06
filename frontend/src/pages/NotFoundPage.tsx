import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center text-gray-500">
      <p className="text-6xl font-bold text-gray-200">404</p>
      <p className="mt-4 text-lg font-medium text-gray-900">Page not found</p>
      <p className="mt-1 text-sm">The page you're looking for doesn't exist or has been moved</p>
      <Link
        to="/"
        className="mt-6 rounded bg-blue-600 px-6 py-2 text-sm text-white hover:bg-blue-700"
      >
        Go Home
      </Link>
    </div>
  )
}
