import { useEffect, RefObject } from 'react';
import { isFocusable } from '../utils/accessibility';

/**
 * Hook that traps focus within a specified element
 * @param ref - React ref object for the element to trap focus within
 * @param isActive - Boolean to activate/deactivate the focus trap
 * @param initialFocusRef - Optional ref to the element that should receive initial focus
 */
export const useFocusTrap = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  isActive: boolean = true,
  initialFocusRef?: RefObject<HTMLElement>,
): void => {
  useEffect(() => {
    // If not active or ref is not set, do nothing
    if (!isActive || !ref.current) {
      return;
    }

    // Save the element that had focus before trapping
    const previouslyFocused = document.activeElement as HTMLElement;

    // Set initial focus
    if (initialFocusRef && initialFocusRef.current) {
      initialFocusRef.current.focus();
    } else {
      // Find the first focusable element and focus it
      const focusableElements = getFocusableElements(ref.current);
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      } else {
        // If no focusable elements, focus the container itself
        ref.current.setAttribute('tabindex', '-1');
        ref.current.focus();
      }
    }

    // Handle keyboard navigation
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab' || !ref.current) {
        return;
      }

      const focusableElements = getFocusableElements(ref.current);
      if (focusableElements.length === 0) {
        event.preventDefault();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      // Shift + Tab => backward navigation
      if (event.shiftKey) {
        // If focus is on first element, move to last element
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      }
      // Tab => forward navigation
      else {
        // If focus is on last element, move to first element
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    // Add event listener
    document.addEventListener('keydown', handleKeyDown);

    // Cleanup
    return () => {
      document.removeEventListener('keydown', handleKeyDown);

      // Restore focus to the previously focused element
      if (previouslyFocused && 'focus' in previouslyFocused) {
        previouslyFocused.focus();
      }
    };
  }, [ref, isActive, initialFocusRef]);
};

/**
 * Gets all focusable elements within a container
 * @param container - The container element
 * @returns Array of focusable elements
 */
const getFocusableElements = (container: HTMLElement): HTMLElement[] => {
  // Common selectors for focusable elements
  const selector = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
    'area[href]',
    'iframe',
    'object',
    'embed',
    '[contenteditable]',
  ].join(',');

  // Get all elements matching the selector
  const candidates = Array.from(
    container.querySelectorAll(selector),
  ) as HTMLElement[];

  // Filter out elements that are not visible or are otherwise not focusable
  return candidates.filter((element) => {
    // Check if the element is visible
    const style = window.getComputedStyle(element);
    const isVisible = style.display !== 'none' && style.visibility !== 'hidden';

    // Check if the element is focusable
    return isVisible && isFocusable(element);
  });
};

export default useFocusTrap;
