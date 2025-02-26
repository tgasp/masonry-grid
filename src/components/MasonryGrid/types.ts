import { PexelsPhoto } from '@/types/pexels';

/**
 * Represents a position in the masonry grid
 */
export interface MasonryPosition {
  photo: PexelsPhoto;
  top: number;
  left: number;
  height: number;
  width: number;
}

/**
 * Props for the MasonryGrid component
 */
export interface MasonryGridProps {
  photos: PexelsPhoto[];
  loading: boolean;
  hasMore: boolean;
  onIntersect: () => void;
  baseColumnWidth?: number;
  columnGap?: number;
  buffer?: number;
}

/**
 * Options for the useMasonryGrid hook
 */
export interface UseMasonryGridOptions {
  photos: PexelsPhoto[];
  baseColumnWidth?: number;
  columnGap?: number;
  buffer?: number;
  loading?: boolean;
  hasMore?: boolean;
  onIntersect?: () => void;
}

/**
 * Result returned by the useMasonryGrid hook
 */
export interface UseMasonryGridResult {
  containerRef: React.RefObject<HTMLDivElement | null>;
  containerHeight: number;
  visibleItems: MasonryPosition[];
  positions: MasonryPosition[];
}