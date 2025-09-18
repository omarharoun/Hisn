'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-8 h-8 text-red-600" />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Something went wrong!
        </h2>
        
        <p className="text-gray-600 mb-6">
          We encountered an unexpected error. Please try refreshing the page or contact support if the problem persists.
        </p>
        
        {error.digest && (
          <p className="text-sm text-gray-500 mb-6 font-mono">
            Error ID: {error.digest}
          </p>
        )}
        
        <div className="space-y-3">
          <Button
            onClick={() => reset()}
            className="w-full"
          >
            Try again
          </Button>
          
          <Button
            variant="outline"
            onClick={() => window.location.href = '/'}
            className="w-full"
          >
            Go to homepage
          </Button>
        </div>
      </div>
    </div>
  )
}