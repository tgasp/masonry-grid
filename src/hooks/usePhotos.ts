import { useState, useCallback, useEffect } from 'react';
import { pexelsService } from '@/services/pexels';
import { type PexelsPhoto } from '@/types/pexels';
import { useQuery } from '@tanstack/react-query';

interface UsePhotosResult {
  photos: PexelsPhoto[];
  hasMore: boolean;
  search: string;
  setSearch: (query: string) => void;
  loadMore: () => Promise<void>;
  loading: boolean;
  error: Error | null
}

export function usePhotos(
  initialPage: number = 1,
  initialPerPage: number = 30,
  initialSearch: string = ''
): UsePhotosResult {
  const [photos, setPhotos] = useState<PexelsPhoto[]>([]);

  const [params, setParams] = useState({
    page: initialPage,
    perPage: initialPerPage,
    search: initialSearch,
  });

  const { data: response, isLoading: loading, error } = useQuery({
    queryKey: ['photos', params.page, params.perPage, params.search],
    queryFn: () => pexelsService.getPhotos(params.page, params.perPage, params.search),
  });

  useEffect(() => {
    const loadedPhotos = response?.photos || [];

    setPhotos(prev => [...prev, ...loadedPhotos])
  }, [response]);

  const setSearch = (q: string) => {
    setPhotos([]);

    setParams(prev => ({
      ...prev,
      search: q,
      page: initialPage,
    }));
  };

  const hasMore = Boolean(response?.next_page);

  // Function to load more photos
  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    setParams(prev => ({
      ...prev,
      page: prev.page + 1,
    }));
  }, [hasMore, loading]);

  return {
    photos,
    hasMore,
    search: params.search,
    setSearch,
    loadMore,
    loading,
    error
  };
}