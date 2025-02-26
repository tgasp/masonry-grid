import { useState, useEffect } from 'react';

/**
 * A hook that returns a debounced value after a specified delay.
 * Useful for delaying API calls or expensive operations until user input has stopped.
 * 
 * @param value The value to debounce
 * @param delay The delay in milliseconds (default: 500ms)
 * @returns The debounced value
 * 
 * @example
 * const [searchTerm, setSearchTerm] = useState('');
 * const debouncedSearchTerm = useDebounce(searchTerm, 500);
 * 
 * // Use debouncedSearchTerm for API calls
 * useEffect(() => {
 *   if (debouncedSearchTerm) {
 *     fetchResults(debouncedSearchTerm);
 *   }
 * }, [debouncedSearchTerm]);
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  
  useEffect(() => {
    // Set a timeout to update the debounced value after the specified delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    // Clean up the timeout if the value changes before the delay has passed
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  
  return debouncedValue;
}