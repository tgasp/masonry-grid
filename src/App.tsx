import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { ErrorBoundary } from "./components/ErrorBoundary";
import LoadingFallback from "./components/LoadingFallback";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a new QueryClient with optimized settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

// Lazy load components with prefetch
const Layout = lazy(() => import("./components/Layout"));
const Home = lazy(() =>
  import("./pages/Home").then((module) => {
    // Prefetch the photo detail page component
    import("./pages/Photo");
    return module;
  })
);
const Photo = lazy(() => import("./pages/Photo"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route
                  index
                  element={
                    <Suspense fallback={<LoadingFallback />}>
                      <Home />
                    </Suspense>
                  }
                />
                <Route
                  path="photo/:id"
                  element={
                    <Suspense fallback={<LoadingFallback />}>
                      <Photo />
                    </Suspense>
                  }
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
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
