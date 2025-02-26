import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { 
  UseMasonryGridOptions, 
  UseMasonryGridResult 
} from '../types';

/**
 * Custom hook for managing masonry grid layout with virtualization
 * Calculates positions for all items but only returns visible ones based on scroll position
 */
export function useMasonryGrid({
  photos,
  baseColumnWidth = 300,
  columnGap = 20,
  buffer = 5,
  loading = false,
  hasMore = false,
  onIntersect = () => {}
}: UseMasonryGridOptions): UseMasonryGridResult {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [visibleHeight, setVisibleHeight] = useState(window.innerHeight);

  const columnWidth = useMemo(() => {
    const columnsCount = Math.floor(containerWidth / baseColumnWidth);

    const gapsWidth = (columnsCount - 1) * columnGap;

    return (containerWidth - gapsWidth) / columnsCount;
  }, [baseColumnWidth, containerWidth, columnGap]);
  
  // Calculate positions for all items
  const { positions, containerHeight } = useMemo(() => {
    if (!containerWidth) return { positions: [], containerHeight: 0 };
    
    // Calculate number of columns based on container width
    const columnsCount = Math.floor((containerWidth + columnGap) / (columnWidth + columnGap));
    
    // Initialize column heights
    const columnHeights = Array(Math.max(1, columnsCount)).fill(0);
    
    // Calculate position for each item
    const positions = photos.map((photo) => {
      // Find shortest column
      const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));
      
      // Calculate aspect ratio for the photo
      const aspectRatio = photo.width / photo.height;
      
      // Calculate item height based on column width and aspect ratio
      const itemHeight = columnWidth / aspectRatio;
      
      // Calculate position
      const left = shortestColumnIndex * (columnWidth + columnGap);
      const top = columnHeights[shortestColumnIndex];
      
      // Update column height
      columnHeights[shortestColumnIndex] += itemHeight + 20; // 20px for margin bottom
      
      return { photo, top, left, height: itemHeight, width: columnWidth };
    });
    
    // Get container height from tallest column
    const containerHeight = Math.max(...columnHeights, 0);
    
    return { positions, containerHeight };
  }, [photos, containerWidth, columnWidth, columnGap]);
  
  // Calculate visible items based on scroll position
  const visibleItems = useMemo(() => {
    if (!positions.length) return [];
    
    // Default height estimation if no photos are available
    const defaultHeight = columnWidth / 1.5; // Assuming 1.5 as a default aspect ratio
    
    // Define visible range with buffer
    const bufferHeight = buffer * (photos[0] ? columnWidth / (photos[0].width / photos[0].height) : defaultHeight);
    const startPosition = Math.max(0, scrollPosition - bufferHeight);
    const endPosition = scrollPosition + visibleHeight + bufferHeight;
    
    // Filter positions to only include visible items
    return positions.filter(
      item => (item.top < endPosition && item.top + item.height > startPosition)
    );
  }, [positions, scrollPosition, visibleHeight, buffer, columnWidth, photos]);
  
  // Handle scroll events
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    
    const scrollTop = window.scrollY;
    setScrollPosition(scrollTop);
    
    // Check if we're near the bottom to load more
    const bottom = scrollTop + window.innerHeight;
    const containerBottom = containerRef.current.offsetTop + containerHeight;
    
    if (bottom >= containerBottom - 600 && !loading && hasMore) {
      onIntersect();
    }
  }, [containerHeight, loading, hasMore, onIntersect]);
  
  // Handle resize events
  const handleResize = useCallback(() => {
    if (!containerRef.current) return;
    
    setContainerWidth(containerRef.current.clientWidth);
    setVisibleHeight(window.innerHeight);
  }, []);
  
  // Setup event listeners
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    // Initial measurements
    handleResize();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [handleScroll, handleResize]);

  return {
    containerRef,
    containerHeight,
    visibleItems,
    positions
  };
}