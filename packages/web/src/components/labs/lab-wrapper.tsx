'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { AlertCircle } from 'lucide-react'

interface LabWrapperProps {
  children: React.ReactNode
  labId: string
}

export function LabWrapper({ children, labId }: LabWrapperProps) {
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Add global error handler for this lab session
    const handleError = (event: ErrorEvent) => {
      console.error('Lab runtime error:', event.error)
      setError(event.error?.message || 'An unexpected error occurred')
    }

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('Unhandled promise rejection:', event.reason)
      setError(event.reason?.message || 'An unexpected error occurred')
    }

    window.addEventListener('error', handleError)
    window.addEventListener('unhandledrejection', handleUnhandledRejection)

    return () => {
      window.removeEventListener('error', handleError)
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
    }
  }, [])

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-medium text-red-900 mb-1">
                  Error in Lab Environment
                </h3>
                <p className="text-sm text-red-700">
                  {error}
                </p>
                <button
                  onClick={() => setError(null)}
                  className="mt-2 text-sm text-red-600 underline hover:text-red-800"
                >
                  Dismiss and continue
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return <>{children}</>
}