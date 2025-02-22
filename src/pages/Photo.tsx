import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { pexelsService } from '../services/pexels'
import type { PexelsPhoto } from '../types/pexels'

export default function Photo() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [photo, setPhoto] = useState<PexelsPhoto | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadPhoto = async () => {
      if (!id) return
      try {
        setLoading(true)
        setError('')
        const photoData = await pexelsService.getPhotoById(Number(id))
        setPhoto(photoData)
      } catch (err) {
        setError('Failed to load photo. Please try again later.')
        console.error('Error loading photo:', err)
      } finally {
        setLoading(false)
      }
    }

    loadPhoto()
  }, [id])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error || !photo) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error || 'Photo not found'}</p>
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-hover transition-colors"
        >
          Back to Gallery
        </button>
      </div>
    )
  }

  return (
    <div className='md:container'>
      <Link
        to="/"
        className="inline-flex items-center mb-6 text-sm font-medium text-gray-900 hover:text-primary transition-colors"
      >
        <svg
          className="mr-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        Back to Gallery
      </Link>

      <div className="bg-white rounded-lg overflow-hidden shadow-lg">
        <div className="relative max-h-[80vh] overflow-hidden">
          <img
            src={photo.src.large2x}
            alt={photo.alt || `Photo by ${photo.photographer}`}
            className="w-full h-auto object-contain"
          />
        </div>
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Photo by {photo.photographer}
          </h1>
          <div className="flex flex-wrap gap-4 text-sm">
            <p className="text-gray-900">
              <span className="font-medium">Dimensions:</span>{' '}
              {photo.width} × {photo.height}
            </p>
            <a
              href={photo.photographer_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary-hover transition-colors"
            >
              View photographer's profile
            </a>
            <a
              href={photo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary-hover transition-colors"
            >
              View on Pexels
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}