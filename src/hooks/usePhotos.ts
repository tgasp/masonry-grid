import { useState, useCallback, useEffect, useMemo } from 'react';
import { pexelsService } from '@/services/pexels';
import { type PexelsPhoto, type PexelsResponse } from '@/types/pexels';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

interface UsePhotosParams {
  initialPage?: number;
  initialPerPage?: number;
  initialSearch?: string;
  staleTime?: number;
}

interface UsePhotosResult {
  photos: PexelsPhoto[];
  hasMore: boolean;
  search: string;
  setSearch: (query: string) => void;
  loadMore: () => Promise<void>;
  loading: boolean;
  error: Error | null;
  isRefetching: boolean;
}

/**
 * Custom hook to fetch and manage photos from the Pexels API.
 *
 * @param {Object} params - The parameters for the hook.
 * @param {number} [params.initialPage=1] - The initial page number for fetching photos.
 * @param {number} [params.initialPerPage=30] - The initial number of photos per page.
 * @param {string} [params.initialSearch=''] - The initial search query for fetching photos.
 * @param {number} [params.staleTime=300000] - The time in milliseconds for which the data is considered fresh.
 * 
 * @returns {Object} The result of the hook.
 * @returns {PexelsPhoto[]} photos - The array of photos fetched from the API.
 * @returns {boolean} hasMore - Indicates if there are more photos to load.
 * @returns {string} search - The current search query.
 * @returns {Function} setSearch - Function to update the search query.
 * @returns {Function} loadMore - Function to load more photos.
 * @returns {boolean} loading - Indicates if the photos are currently being loaded.
 * @returns {Error | null} error - The error object if an error occurred during fetching.
 * @returns {boolean} isRefetching - Indicates if the data is being refetched.
 */
export function usePhotos({
  initialPage = 1,
  initialPerPage = 30,
  initialSearch = '',
  staleTime = 5 * 60 * 1000, // 5 minutes by default
}: UsePhotosParams = {}): UsePhotosResult {
  const [photos, setPhotos] = useState<PexelsPhoto[]>([]);

  const [params, setParams] = useState({
    page: initialPage,
    perPage: initialPerPage,
    search: initialSearch,
  });

  // Memoize query parameters to prevent unnecessary re-renders
  const queryParams = useMemo(() => ({
    page: params.page,
    perPage: params.perPage,
    search: params.search
  }), [params.page, params.perPage, params.search]);

  const { 
    data: response, 
    isLoading: loading, 
    error,
    isRefetching
  } = useQuery({
    queryKey: ['photos', queryParams.page, queryParams.perPage, queryParams.search],
    queryFn: () => pexelsService.getPhotos(
      queryParams.page, 
      queryParams.perPage, 
      queryParams.search
    ),
    staleTime: staleTime,
    placeholderData: (previousData) => previousData, // Keep previous data while fetching new data
  } as UseQueryOptions<PexelsResponse, Error, PexelsResponse, (string | number)[]>);

  // Update photos when response changes
  useEffect(() => {
    if (!response) return;
    
    const loadedPhotos = response.photos || [];
    
    setPhotos(prev => {
      // If it's the first page, replace all photos
      if (params.page === 1) {
        return loadedPhotos;
      }
      
      // Otherwise, append new photos
      // Use a Map to ensure no duplicates (by ID)
      const photoMap = new Map(prev.map(photo => [photo.id, photo]));
      
      // Add new photos to the map
      loadedPhotos.forEach((photo: PexelsPhoto) => {
        photoMap.set(photo.id, photo);
      });
      
      // Convert map back to array
      return Array.from(photoMap.values());
    });
  }, [response, params.page]);

  // Memoized search handler to prevent unnecessary re-renders
  const setSearch = useCallback((q: string) => {
    setParams(prev => ({
      ...prev,
      search: q,
      page: initialPage, // Reset to first page on new search
    }));
  }, [initialPage]);

  // Determine if there are more photos to load
  const hasMore = Boolean((response as PexelsResponse)?.next_page || loading);

  // Memoized load more function to prevent unnecessary re-renders
  const loadMore = useCallback(async () => {
    if (loading || isRefetching || !hasMore) return;

    setParams(prev => ({
      ...prev,
      page: prev.page + 1,
    }));
  }, [hasMore, loading, isRefetching]);

  return {
    photos,
    hasMore,
    search: params.search,
    setSearch,
    loadMore,
    loading,
    error,
    isRefetching
  };
}