import { useEffect, useRef, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { pexelsService } from '../services/pexels'
import type { PexelsPhoto } from '../types/pexels'

export default function Home() {
  const [photos, setPhotos] = useState<PexelsPhoto[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [hasMore, setHasMore] = useState(true)
  const observer = useRef<IntersectionObserver | null>(null)

  const loadPhotos = useCallback(async () => {
    try {
      setLoading(true)
      setError('')
      const response = await pexelsService.getCuratedPhotos(page)
      setPhotos(prev => [...prev, ...response.photos])
      setHasMore(!!response.next_page)
    } catch (err) {
      setError('Failed to load photos. Please try again later.')
      console.error('Error loading photos:', err)
    } finally {
      setLoading(false)
    }
  }, [page])

  const lastPhotoRef = useCallback((node: HTMLDivElement | null) => {
    if (loading) return
    if (observer.current) observer.current.disconnect()

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1)
      }
    })

    if (node) observer.current.observe(node)
  }, [loading, hasMore])

  useEffect(() => {
    loadPhotos()
  }, [page, loadPhotos])

  if (error && !photos.length) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error}</p>
        <button
          onClick={() => setPage(1)}
          className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary-hover transition-colors"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Photo Gallery</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {photos.map((photo, index) => (
          <div
            key={photo.id}
            ref={index === photos.length - 1 ? lastPhotoRef : undefined}
          >
            <Link 
              to={`/photo/${photo.id}`}
              className="block group"
            >
              <div className="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden bg-gray-200">
                <img
                  src={photo.src.medium}
                  alt={photo.alt || `Photo by ${photo.photographer}`}
                  className="object-cover w-full h-full transition-transform duration-200 group-hover:scale-105"
                />
              </div>
              <div className="mt-2">
                <p className="text-sm text-gray-900 truncate">
                  Photo by {photo.photographer}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
      {loading && (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )}
      {!hasMore && photos.length > 0 && (
        <p className="text-center py-8 text-gray-900">
          No more photos to load
        </p>
      )}
    </div>
  )
}