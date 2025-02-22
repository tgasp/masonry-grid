import { useRouteError, isRouteErrorResponse, useNavigate } from 'react-router-dom'

export default function RouteErrorBoundary() {
  const error = useRouteError()
  const navigate = useNavigate()

  let errorMessage = 'An unexpected error occurred'

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      errorMessage = 'Page not found'
    } else {
      errorMessage = error.statusText || error.data?.message || 'Something went wrong'
    }
  } else if (error instanceof Error) {
    errorMessage = error.message
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Oops! {errorMessage}
        </h1>
        <div className="space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-200 text-gray-900 rounded hover:bg-gray-300 transition-colors"
          >
            Go Back
          </button>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-hover transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  )
}