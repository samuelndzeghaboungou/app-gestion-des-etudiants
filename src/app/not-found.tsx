export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="text-center p-8">
        <h2 className="text-6xl font-bold text-purple-600 mb-4">404</h2>
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Page Not Found</h3>
        <p className="text-gray-600 mb-6">The page you&apos;re looking for doesn&apos;t exist.</p>
        <a
          href="/"
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all inline-block"
        >
          Go Home
        </a>
      </div>
    </div>
  )
}
