import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-coffee-50 flex flex-col items-center justify-center px-4 sm:px-6">
      <h1 className="font-display text-5xl sm:text-6xl md:text-8xl text-coffee-900 mb-3 sm:mb-4">
        404
      </h1>
      <p className="text-coffee-600 text-base sm:text-lg mb-6 sm:mb-8 text-center">
        Page not found.
      </p>
      <Link
        to="/"
        className="px-6 py-3 rounded-full bg-coffee-900 text-coffee-50 text-sm font-medium hover:bg-coffee-800 transition-colors"
      >
        Back to Home
      </Link>
    </div>
  )
}
