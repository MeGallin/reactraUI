/**
 * Accessibility utility functions for ReactraUI
 */

/**
 * Creates an ID that is unique within the document
 * @param prefix - Optional prefix for the ID
 * @returns A unique ID string
 */
export const generateUniqueId = (prefix = 'reactra'): string => {
  return `${prefix}-${Math.random().toString(36).substring(2, 9)}`;
};

/**
 * Determines if an element should be focusable
 * @param element - The DOM element to check
 * @returns Boolean indicating if the element should receive focus
 */
export const isFocusable = (element: HTMLElement): boolean => {
  const nodeName = element.nodeName.toLowerCase();
  const tabIndex = element.getAttribute('tabindex');
  const hasTabIndex = tabIndex !== null && tabIndex !== '-1';

  // Elements that are naturally focusable if not disabled
  if (
    (nodeName === 'button' ||
      nodeName === 'input' ||
      nodeName === 'select' ||
      nodeName === 'textarea' ||
      (nodeName === 'a' && element.hasAttribute('href'))) &&
    !element.hasAttribute('disabled')
  ) {
    return true;
  }

  // Elements with tabIndex >= 0 are focusable
  return hasTabIndex && parseInt(tabIndex as string, 10) >= 0;
};

/**
 * Handles keyboard navigation for components like menus, dialogs, etc.
 * @param event - The keyboard event
 * @param options - Configuration options
 */
export const handleKeyboardNavigation = (
  event: React.KeyboardEvent,
  options: {
    onEscape?: () => void;
    onArrowUp?: () => void;
    onArrowDown?: () => void;
    onArrowLeft?: () => void;
    onArrowRight?: () => void;
    onEnter?: () => void;
    onTab?: () => void;
    onSpace?: () => void;
    onHome?: () => void;
    onEnd?: () => void;
    preventDefault?: boolean;
  },
): void => {
  const { key } = event;
  const {
    onEscape,
    onArrowUp,
    onArrowDown,
    onArrowLeft,
    onArrowRight,
    onEnter,
    onTab,
    onSpace,
    onHome,
    onEnd,
    preventDefault = true,
  } = options;

  let handled = false;

  switch (key) {
    case 'Escape':
      if (onEscape) {
        onEscape();
        handled = true;
      }
      break;
    case 'ArrowUp':
      if (onArrowUp) {
        onArrowUp();
        handled = true;
      }
      break;
    case 'ArrowDown':
      if (onArrowDown) {
        onArrowDown();
        handled = true;
      }
      break;
    case 'ArrowLeft':
      if (onArrowLeft) {
        onArrowLeft();
        handled = true;
      }
      break;
    case 'ArrowRight':
      if (onArrowRight) {
        onArrowRight();
        handled = true;
      }
      break;
    case 'Enter':
      if (onEnter) {
        onEnter();
        handled = true;
      }
      break;
    case 'Tab':
      if (onTab) {
        onTab();
        handled = true;
      }
      break;
    case ' ':
      if (onSpace) {
        onSpace();
        handled = true;
      }
      break;
    case 'Home':
      if (onHome) {
        onHome();
        handled = true;
      }
      break;
    case 'End':
      if (onEnd) {
        onEnd();
        handled = true;
      }
      break;
    default:
      break;
  }

  if (handled && preventDefault) {
    event.preventDefault();
    event.stopPropagation();
  }
};

/**
 * Provides ARIA attributes for various component types
 */
export const ariaAttributes = {
  /**
   * Get ARIA attributes for a button
   */
  button: (options: {
    isDisabled?: boolean;
    isExpanded?: boolean;
    controls?: string;
    label?: string;
  }) => {
    const { isDisabled, isExpanded, controls, label } = options;
    return {
      role: 'button',
      'aria-disabled': isDisabled ? true : undefined,
      'aria-expanded': isExpanded !== undefined ? isExpanded : undefined,
      'aria-controls': controls,
      'aria-label': label,
    };
  },

  /**
   * Get ARIA attributes for a menu
   */
  menu: (options: { id?: string; labelledBy?: string; expanded?: boolean }) => {
    const { id, labelledBy, expanded } = options;
    return {
      role: 'menu',
      id,
      'aria-labelledby': labelledBy,
      'aria-expanded': expanded !== undefined ? expanded : undefined,
    };
  },

  /**
   * Get ARIA attributes for a modal dialog
   */
  dialog: (options: {
    id?: string;
    labelledBy?: string;
    describedBy?: string;
  }) => {
    const { id, labelledBy, describedBy } = options;
    return {
      role: 'dialog',
      'aria-modal': true,
      id,
      'aria-labelledby': labelledBy,
      'aria-describedby': describedBy,
    };
  },
};
