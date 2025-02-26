import React from 'react';
import { Container, MasonryContainer } from './styles';
import MasonryItem from './components/MasonryItem';
import Spinner from './components/Spinner';
import EmptyMessage from './components/EmptyMessage';
import { useMasonryGrid } from './hooks/useMasonryGrid';
import { MasonryGridProps } from './types';

/**
 * Virtualized Masonry Grid component
 * Only renders items that are visible in the viewport
 */
const MasonryGrid: React.FC<MasonryGridProps> = ({
  photos,
  loading,
  hasMore,
  onIntersect,
  baseColumnWidth = 300,
  columnGap = 20,
  buffer = 5,
}) => {
  // Use the masonry grid hook for layout calculations and virtualization
  const { containerRef, containerHeight, visibleItems } = useMasonryGrid({
    photos,
    baseColumnWidth,
    columnGap,
    buffer,
    loading,
    hasMore,
    onIntersect,
  });

  return (
    <Container ref={containerRef}>
      <MasonryContainer $height={containerHeight}>
        {visibleItems.map(({ photo, top, left, width }) => (
          <MasonryItem
            key={photo.id}
            photo={photo}
            top={top}
            left={left}
            width={width}
          />
        ))}
      </MasonryContainer>
      
      {loading && <Spinner />}
      
      {!hasMore && <EmptyMessage hasItems={photos.length > 0} />}
    </Container>
  );
};

export default MasonryGrid;