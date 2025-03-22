import { useEffect, RefObject } from 'react';

/**
 * Hook that triggers a callback when a click occurs outside of the specified element
 * @param ref - React ref object for the element to detect clicks outside of
 * @param callback - Function to call when a click outside occurs
 * @param excludeRefs - Optional array of refs to exclude from triggering the callback
 */
export const useClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  callback: (event: MouseEvent | TouchEvent) => void,
  excludeRefs: RefObject<HTMLElement>[] = [],
): void => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      // Get the target element
      const target = event.target as Node;

      // Check if the click was outside the ref element
      const isOutside = ref.current && !ref.current.contains(target);

      // Check if the click was inside any of the excluded elements
      const isInsideExcluded = excludeRefs.some(
        (excludeRef) =>
          excludeRef.current && excludeRef.current.contains(target),
      );

      // If the click was outside and not inside any excluded elements, call the callback
      if (isOutside && !isInsideExcluded) {
        callback(event);
      }
    };

    // Add event listeners
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    // Cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [ref, callback, excludeRefs]);
};

export default useClickOutside;
