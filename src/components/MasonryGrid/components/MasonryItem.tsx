import React from 'react';
import { ItemWrapper } from '../styles';
import PhotoCard from '../../PhotoCard';
import { MasonryPosition } from '../types';

interface MasonryItemProps {
  photo: MasonryPosition['photo'];
  top: number;
  left: number;
  width: number;
}

/**
 * Individual item in the masonry grid
 * Positioned absolutely based on calculated coordinates
 */
const MasonryItem: React.FC<MasonryItemProps> = ({ 
  photo, 
  top, 
  left, 
  width 
}) => {
  return (
    <ItemWrapper 
      key={photo.id} 
      $top={top} 
      $left={left} 
      $width={width}
    >
      <PhotoCard photo={photo} />
    </ItemWrapper>
  );
};

export default React.memo(MasonryItem);