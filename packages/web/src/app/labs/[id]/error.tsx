'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { AlertCircle, Home, RefreshCw } from 'lucide-react'
import Link from 'next/link'

export default function LabError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to console for debugging
    console.error('Lab Error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="max-w-md w-full">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Lab Error
            </h2>
            
            <p className="text-gray-600 mb-2">
              We encountered an error while loading this lab.
            </p>
            
            {error.digest && (
              <p className="text-sm text-gray-500 mb-4 font-mono">
                Error ID: {error.digest}
              </p>
            )}
            
            <p className="text-sm text-gray-500 mb-6 bg-gray-100 p-3 rounded-md font-mono">
              {error.message || 'An unexpected error occurred'}
            </p>
            
            <div className="flex gap-3 w-full">
              <Button
                onClick={() => reset()}
                className="flex-1"
                variant="outline"
              >
                <RefreshCw className="w-4 h-4 mr-1" />
                Try Again
              </Button>
              
              <Link href="/labs" className="flex-1">
                <Button className="w-full">
                  <Home className="w-4 h-4 mr-1" />
                  Back to Labs
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}