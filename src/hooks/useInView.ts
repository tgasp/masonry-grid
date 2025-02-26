import { useState, useEffect, useRef } from 'react';

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

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