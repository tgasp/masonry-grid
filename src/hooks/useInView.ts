import { useState, useEffect, useRef } from 'react';

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

/**
 * Custom hook to track the visibility of an element within the viewport using the Intersection Observer API.
 *
 * @template T - The type of the HTML element to observe. Defaults to `HTMLElement`.
 * @param {UseInViewOptions} [options={}] - Configuration options for the Intersection Observer.
 * @param {number} [options.threshold=0.1] - A number or array of numbers which indicate at what percentage of the target's visibility the observer's callback should be executed. Defaults to `0.1`.
 * @param {string} [options.rootMargin='0px'] - A string which specifies a set of offsets to add to the root's bounding box when calculating intersections. Defaults to `'0px'`.
 * @param {boolean} [options.once=false] - If `true`, the observer will stop observing the target after it has intersected once. Defaults to `false`.
 * @returns {[(node: T | null) => void, boolean]} - A tuple containing a callback ref function to be assigned to the target element and a boolean indicating whether the element is in view.
 *
 * @example
 * ```tsx
 * const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.5, rootMargin: '10px', once: true });
 *
 * return <div ref={ref}>Content</div>;
 * ```
 */
export function useInView<T extends HTMLElement = HTMLElement>(
  options: UseInViewOptions = {}
): [(node: T | null) => void, boolean] {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    once = false
  } = options;

  const ref = useRef<T>(null);
  const [node, setNode] = useState<T | null>(null);
  const [isInView, setIsInView] = useState(false);

  const callbackRef = (element: T | null) => {
    ref.current = element;
    setNode(element);
  };

  useEffect(() => {
    if (!node) return;

    const element = node;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update state when intersection status changes
        const isVisible = entry.isIntersecting;
        setIsInView(isVisible);

        // If element has been viewed and "once" option is true,
        // unobserve the element
        if (isVisible && once && element) {
          observer.unobserve(element);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [node, threshold, rootMargin, once]);

  return [callbackRef, isInView];
}