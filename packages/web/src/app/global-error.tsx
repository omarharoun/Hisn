'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              Application Error
            </h2>
            <p className="text-gray-600 mb-6">
              A critical error occurred. Our team has been notified.
            </p>
            {error.digest && (
              <p className="text-sm text-gray-500 mb-4">
                Error ID: {error.digest}
              </p>
            )}
            <button
              onClick={() => reset()}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}