import { useState } from 'react'
import SearchBar from './SearchBar'
import { pexelsService } from '../services/pexels'
import type { PexelsResponse } from '../types/pexels'

interface PhotoFilterProps {
  onFilterChange: (response: PexelsResponse) => void
  onError: (error: string) => void
  onLoadingChange: (isLoading: boolean) => void
}

export default function PhotoFilter({ 
  onFilterChange, 
  onError,
  onLoadingChange 
}: PhotoFilterProps) {
  const [currentQuery, setCurrentQuery] = useState('')

  const handleSearch = async (query: string) => {
    // If query is empty, load curated photos
    if (!query.trim()) {
      try {
        onLoadingChange(true)
        const response = await pexelsService.getCuratedPhotos(1)
        onFilterChange(response)
        setCurrentQuery('')
      } catch (err) {
        console.error('Error loading curated photos:', err)
        onError('Failed to load curated photos')
      } finally {
        onLoadingChange(false)
      }
      return
    }

    // Search photos with query
    try {
      onLoadingChange(true)
      const response = await pexelsService.searchPhotos(query, 1)
      onFilterChange(response)
      setCurrentQuery(query)
    } catch (err) {
      console.error('Error searching photos:', err)
      onError('Failed to search photos')
    } finally {
      onLoadingChange(false)
    }
  }

  return (
    <div>
      <SearchBar 
        onSearch={handleSearch}
        initialValue={currentQuery}
      />
    </div>
  )
}

// Utility hook for managing photo filter state
export function usePhotoFilter() {
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [currentQuery, setCurrentQuery] = useState('')

  const loadMorePhotos = async () => {
    const nextPage = page + 1
    try {
      const response = currentQuery
        ? await pexelsService.searchPhotos(currentQuery, nextPage)
        : await pexelsService.getCuratedPhotos(nextPage)
      
      setHasMore(!!response.next_page)
      setPage(nextPage)
      return response
    } catch (err) {
      console.error('Error loading more photos:', err)
      throw new Error('Failed to load more photos')
    }
  }

  const resetFilter = () => {
    setPage(1)
    setHasMore(true)
    setCurrentQuery('')
  }

  return {
    page,
    hasMore,
    currentQuery,
    setCurrentQuery,
    loadMorePhotos,
    resetFilter
  }
}