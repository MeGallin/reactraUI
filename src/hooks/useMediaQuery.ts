import { useEffect, useState } from 'react';
import { Theme } from '../theme/types';
import { Breakpoint, createMediaQuery } from '../utils/responsive';

/**
 * Hook that returns true if the current viewport matches the media query
 * @param query - The media query to match
 * @returns Boolean indicating if the media query matches
 */
export const useMediaQuery = (query: string): boolean => {
  // Initialize with the current match state if in browser
  const getMatches = (): boolean => {
    // Check if window is defined (for SSR)
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  };

  const [matches, setMatches] = useState<boolean>(getMatches());

  useEffect(() => {
    // If not in browser, do nothing
    if (typeof window === 'undefined') {
      return undefined;
    }

    const mediaQuery = window.matchMedia(query);
    const updateMatches = (): void => setMatches(mediaQuery.matches);

    // Initial check
    updateMatches();

    // Add listener
    mediaQuery.addEventListener('change', updateMatches);

    // Cleanup
    return () => {
      mediaQuery.removeEventListener('change', updateMatches);
    };
  }, [query]);

  return matches;
};

/**
 * Hook that returns true if the current viewport is at least the specified breakpoint
 * @param theme - The current theme
 * @param breakpoint - The breakpoint to check
 * @returns Boolean indicating if the viewport is at least the specified breakpoint
 */
export const useBreakpointUp = (
  theme: Theme,
  breakpoint: Breakpoint,
): boolean => {
  const query = createMediaQuery(theme, breakpoint, 'up');
  return useMediaQuery(query);
};

/**
 * Hook that returns true if the current viewport is at most the specified breakpoint
 * @param theme - The current theme
 * @param breakpoint - The breakpoint to check
 * @returns Boolean indicating if the viewport is at most the specified breakpoint
 */
export const useBreakpointDown = (
  theme: Theme,
  breakpoint: Breakpoint,
): boolean => {
  const query = createMediaQuery(theme, breakpoint, 'down');
  return useMediaQuery(query);
};

/**
 * Hook that returns true if the current viewport is exactly the specified breakpoint
 * @param theme - The current theme
 * @param breakpoint - The breakpoint to check
 * @returns Boolean indicating if the viewport is exactly the specified breakpoint
 */
export const useBreakpointOnly = (
  theme: Theme,
  breakpoint: Breakpoint,
): boolean => {
  const query = createMediaQuery(theme, breakpoint, 'only');
  return useMediaQuery(query);
};

/**
 * Hook that returns the current breakpoint
 * @param theme - The current theme
 * @returns The current breakpoint
 */
export const useBreakpoint = (theme: Theme): Breakpoint => {
  const isXs = useBreakpointOnly(theme, 'xs');
  const isSm = useBreakpointOnly(theme, 'sm');
  const isMd = useBreakpointOnly(theme, 'md');
  const isLg = useBreakpointOnly(theme, 'lg');
  const isXl = useBreakpointOnly(theme, 'xl');

  if (isXl) return 'xl';
  if (isLg) return 'lg';
  if (isMd) return 'md';
  if (isSm) return 'sm';
  if (isXs) return 'xs';
  return 'xs';
};
