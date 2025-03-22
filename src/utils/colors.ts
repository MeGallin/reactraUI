/**
 * Color utility functions for ReactraUI
 */

/**
 * Converts a hex color to RGB values
 * @param hex - The hex color string (e.g., "#ff0000" or "#f00")
 * @returns An object with r, g, b values
 */
export const hexToRgb = (
  hex: string,
): { r: number; g: number; b: number } | null => {
  // Remove the hash if it exists
  hex = hex.replace(/^#/, '');

  // Parse the hex values
  let r, g, b;
  if (hex.length === 3) {
    // Short notation (#rgb)
    r = parseInt(hex.charAt(0) + hex.charAt(0), 16);
    g = parseInt(hex.charAt(1) + hex.charAt(1), 16);
    b = parseInt(hex.charAt(2) + hex.charAt(2), 16);
  } else if (hex.length === 6) {
    // Full notation (#rrggbb)
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);
  } else {
    return null; // Invalid hex color
  }

  return { r, g, b };
};

/**
 * Converts RGB values to a hex color string
 * @param r - Red value (0-255)
 * @param g - Green value (0-255)
 * @param b - Blue value (0-255)
 * @returns A hex color string
 */
export const rgbToHex = (r: number, g: number, b: number): string => {
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
};

/**
 * Converts RGB values to an rgba color string
 * @param r - Red value (0-255)
 * @param g - Green value (0-255)
 * @param b - Blue value (0-255)
 * @param a - Alpha value (0-1)
 * @returns An rgba color string
 */
export const rgba = (r: number, g: number, b: number, a: number): string => {
  return `rgba(${r}, ${g}, ${b}, ${a})`;
};

/**
 * Converts a hex color to an rgba color string
 * @param hex - The hex color string
 * @param alpha - The alpha value (0-1)
 * @returns An rgba color string
 */
export const hexToRgba = (hex: string, alpha: number): string => {
  const rgb = hexToRgb(hex);
  if (!rgb) {
    return '';
  }
  return rgba(rgb.r, rgb.g, rgb.b, alpha);
};

/**
 * Lightens a color by a percentage
 * @param color - The hex color string
 * @param amount - The amount to lighten (0-1)
 * @returns A lightened hex color string
 */
export const lighten = (color: string, amount: number): string => {
  const rgb = hexToRgb(color);
  if (!rgb) {
    return color;
  }

  const { r, g, b } = rgb;
  const lightenValue = (value: number) =>
    Math.round(value + (255 - value) * amount);

  return rgbToHex(lightenValue(r), lightenValue(g), lightenValue(b));
};

/**
 * Darkens a color by a percentage
 * @param color - The hex color string
 * @param amount - The amount to darken (0-1)
 * @returns A darkened hex color string
 */
export const darken = (color: string, amount: number): string => {
  const rgb = hexToRgb(color);
  if (!rgb) {
    return color;
  }

  const { r, g, b } = rgb;
  const darkenValue = (value: number) => Math.round(value * (1 - amount));

  return rgbToHex(darkenValue(r), darkenValue(g), darkenValue(b));
};

/**
 * Calculates a contrasting text color (black or white) based on background color
 * @param backgroundColor - The background hex color
 * @returns "#ffffff" or "#000000" depending on which provides better contrast
 */
export const getContrastText = (backgroundColor: string): string => {
  const rgb = hexToRgb(backgroundColor);
  if (!rgb) {
    return '#000000';
  }

  // Calculate relative luminance using the formula from WCAG 2.0
  const { r, g, b } = rgb;
  const luminance =
    0.2126 * (r / 255) + 0.7152 * (g / 255) + 0.0722 * (b / 255);

  // Return white for dark backgrounds, black for light backgrounds
  return luminance > 0.5 ? '#000000' : '#ffffff';
};

/**
 * Creates a color palette from a main color
 * @param mainColor - The main hex color
 * @returns A color palette object
 */
export const createColorPalette = (mainColor: string) => {
  return {
    main: mainColor,
    light: lighten(mainColor, 0.2),
    dark: darken(mainColor, 0.2),
    contrastText: getContrastText(mainColor),
  };
};
