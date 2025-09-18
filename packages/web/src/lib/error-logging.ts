// Server-side error logging utility
export function logServerError(error: Error, context?: Record<string, any>) {
  const errorInfo = {
    message: error.message,
    stack: error.stack,
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    context,
  };

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.error('Server Error:', errorInfo);
  }

  // In production, you would send this to a logging service
  // Example: Sentry, LogRocket, DataDog, etc.
  if (process.env.NODE_ENV === 'production') {
    // TODO: Integrate with your preferred error tracking service
    console.error(JSON.stringify(errorInfo));
  }
}

// Wrapper for async server components
export async function withErrorHandler<T>(
  fn: () => Promise<T>,
  componentName: string
): Promise<T | null> {
  try {
    return await fn();
  } catch (error) {
    logServerError(error as Error, { component: componentName });
    
    // Re-throw in development for debugging
    if (process.env.NODE_ENV === 'development') {
      throw error;
    }
    
    // Return null or default value in production
    return null;
  }
}