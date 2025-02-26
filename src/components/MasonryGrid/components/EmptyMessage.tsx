import React from 'react';
import { EndMessage } from '../styles';

interface EmptyMessageProps {
  hasItems: boolean;
}

/**
 * Message displayed when there are no more items to load
 * or when there are no items at all
 */
const EmptyMessage: React.FC<EmptyMessageProps> = ({ hasItems }) => {
  return (
    <EndMessage>
      {hasItems ? "No more photos to load" : "No photos"}
    </EndMessage>
  );
};

export default EmptyMessage;