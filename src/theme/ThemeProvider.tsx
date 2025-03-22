import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  ReactNode,
} from 'react';
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import { defaultTheme, darkTheme } from './defaultTheme';
import { Theme } from './types';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: 'light' | 'dark';
  customTheme?: Partial<Theme>;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  initialTheme = 'light',
  customTheme,
}) => {
  const [mode, setMode] = useState<'light' | 'dark'>(initialTheme);

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const setTheme = (newTheme: 'light' | 'dark') => {
    setMode(newTheme);
  };

  // Merge the selected theme with any custom theme props
  const theme = useMemo(() => {
    const baseTheme = mode === 'light' ? defaultTheme : darkTheme;

    if (!customTheme) {
      return baseTheme;
    }

    // Deep merge the base theme with custom theme
    return {
      ...baseTheme,
      ...customTheme,
      colors: {
        ...baseTheme.colors,
        ...(customTheme.colors || {}),
      },
      typography: {
        ...baseTheme.typography,
        ...(customTheme.typography || {}),
      },
      spacing: {
        ...baseTheme.spacing,
        ...(customTheme.spacing || {}),
      },
      breakpoints: {
        ...baseTheme.breakpoints,
        ...(customTheme.breakpoints || {}),
      },
      shadows: {
        ...baseTheme.shadows,
        ...(customTheme.shadows || {}),
      },
      borderRadius: {
        ...baseTheme.borderRadius,
        ...(customTheme.borderRadius || {}),
      },
      zIndex: {
        ...baseTheme.zIndex,
        ...(customTheme.zIndex || {}),
      },
    };
  }, [mode, customTheme]);

  const contextValue = useMemo(
    () => ({
      theme,
      toggleTheme,
      setTheme,
    }),
    [theme],
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      <EmotionThemeProvider theme={theme}>{children}</EmotionThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
