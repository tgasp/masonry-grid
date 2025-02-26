import { useEffect, useRef } from 'react';

/**
 * Hook for observing size changes of an element using ResizeObserver
 * 
 * @param target - React ref object containing the element to observe
 * @param callback - Function to call when the element resizes
 */
export function useResizeObserver<T extends HTMLElement>(
  target: React.RefObject<T>,
  callback: (entry: ResizeObserverEntry) => void
): void {
  const observerRef = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    // Clean up previous observer if it exists
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Create new ResizeObserver
    observerRef.current = new ResizeObserver((entries) => {
      // We only observe one element, so we can just use the first entry
      if (entries[0]) {
        callback(entries[0]);
      }
    });

    // Start observing the target element if it exists
    if (target.current) {
      observerRef.current.observe(target.current);
    }

    // Clean up on unmount
    return () => {
      observerRef.current?.disconnect();
      observerRef.current = null;
    };
  }, [target, callback]);
}