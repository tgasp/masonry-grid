import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import { ErrorBoundary } from './components/ErrorBoundary'
import LoadingFallback from './components/LoadingFallback'
import RouteErrorBoundary from './components/RouteErrorBoundary'

// Lazy load components
const Layout = lazy(() => import('./components/Layout'))
const Home = lazy(() => import('./pages/Home'))
const Photo = lazy(() => import('./pages/Photo'))
const NotFound = lazy(() => import('./pages/NotFound'))

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route
              path="/"
              element={<Layout />}
              errorElement={<RouteErrorBoundary />}
            >
              <Route
                index
                element={
                  <Suspense fallback={<LoadingFallback />}>
                    <Home />
                  </Suspense>
                }
                errorElement={<RouteErrorBoundary />}
              />
              <Route
                path="photo/:id"
                element={
                  <Suspense fallback={<LoadingFallback />}>
                    <Photo />
                  </Suspense>
                }
                errorElement={<RouteErrorBoundary />}
              />
              {/* Catch-all route for 404 */}
              <Route
                path="*"
                element={
                  <Suspense fallback={<LoadingFallback />}>
                    <NotFound />
                  </Suspense>
                }
              />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
