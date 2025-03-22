import { Theme } from '../theme/types';

/**
 * Responsive utility functions for ReactraUI
 */

/**
 * Breakpoint values in pixels
 */
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Creates a media query string for the specified breakpoint
 * @param theme - The current theme
 * @param breakpoint - The breakpoint to create a media query for
 * @param type - The type of media query (up, down, only)
 * @returns A media query string
 */
export const createMediaQuery = (
  theme: Theme,
  breakpoint: Breakpoint,
  type: 'up' | 'down' | 'only' = 'up',
): string => {
  const values = theme.breakpoints.values;

  switch (type) {
    case 'up':
      return `@media (min-width: ${values[breakpoint]}px)`;
    case 'down':
      // For 'down' queries, we use the next breakpoint - 0.05px
      // If it's the largest breakpoint (xl), we use a max-width query
      if (breakpoint === 'xl') {
        return `@media (max-width: ${values.xl}px)`;
      }

      const nextBreakpoint = getNextBreakpoint(breakpoint);
      return `@media (max-width: ${values[nextBreakpoint] - 0.05}px)`;
    case 'only':
      if (breakpoint === 'xl') {
        return `@media (min-width: ${values.xl}px)`;
      }

      const next = getNextBreakpoint(breakpoint);
      return `@media (min-width: ${values[breakpoint]}px) and (max-width: ${
        values[next] - 0.05
      }px)`;
    default:
      return `@media (min-width: ${values[breakpoint]}px)`;
  }
};

/**
 * Gets the next larger breakpoint
 * @param breakpoint - The current breakpoint
 * @returns The next larger breakpoint
 */
const getNextBreakpoint = (breakpoint: Breakpoint): Breakpoint => {
  const breakpoints: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl'];
  const index = breakpoints.indexOf(breakpoint);

  if (index === -1 || index === breakpoints.length - 1) {
    return 'xl';
  }

  return breakpoints[index + 1];
};

/**
 * Converts a spacing value to pixels
 * @param theme - The current theme
 * @param value - The spacing value (1 = 1 * theme.spacing.unit)
 * @returns A pixel value as a string
 */
export const spacing = (theme: Theme, value: number): string => {
  return `${value * theme.spacing.unit}px`;
};

/**
 * Creates a responsive value based on breakpoints
 * @param values - An object with breakpoint keys and values
 * @returns A function that accepts a theme and returns the appropriate value
 */
export const responsive = <T>(values: Partial<Record<Breakpoint, T>>) => {
  return (theme: Theme): T => {
    // Find the appropriate value based on the current viewport
    // This is a client-side utility, so it will return the largest matching breakpoint
    // For server-side rendering, it will use the smallest defined breakpoint

    // Default to the smallest defined breakpoint
    const breakpoints: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl'];
    let result: T | undefined;

    for (const bp of breakpoints) {
      if (values[bp] !== undefined) {
        result = values[bp];
      }
    }

    if (result === undefined) {
      throw new Error(
        'No valid breakpoint value provided to responsive utility',
      );
    }

    return result;
  };
};
