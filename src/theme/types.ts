export interface ColorPalette {
  main: string;
  light: string;
  dark: string;
  contrastText: string;
}

export interface Colors {
  primary: ColorPalette;
  secondary: ColorPalette;
  error: ColorPalette;
  warning: ColorPalette;
  info: ColorPalette;
  success: ColorPalette;
  grey: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };
  common: {
    black: string;
    white: string;
  };
  text: {
    primary: string;
    secondary: string;
    disabled: string;
  };
  background: {
    default: string;
    paper: string;
  };
  divider: string;
}

export interface Typography {
  fontFamily: string;
  fontWeightLight: number;
  fontWeightRegular: number;
  fontWeightMedium: number;
  fontWeightBold: number;
  h1: {
    fontSize: string;
    fontWeight: number;
    lineHeight: number;
    letterSpacing: string;
  };
  h2: {
    fontSize: string;
    fontWeight: number;
    lineHeight: number;
    letterSpacing: string;
  };
  h3: {
    fontSize: string;
    fontWeight: number;
    lineHeight: number;
    letterSpacing: string;
  };
  h4: {
    fontSize: string;
    fontWeight: number;
    lineHeight: number;
    letterSpacing: string;
  };
  h5: {
    fontSize: string;
    fontWeight: number;
    lineHeight: number;
    letterSpacing: string;
  };
  h6: {
    fontSize: string;
    fontWeight: number;
    lineHeight: number;
    letterSpacing: string;
  };
  subtitle1: {
    fontSize: string;
    fontWeight: number;
    lineHeight: number;
    letterSpacing: string;
  };
  subtitle2: {
    fontSize: string;
    fontWeight: number;
    lineHeight: number;
    letterSpacing: string;
  };
  body1: {
    fontSize: string;
    fontWeight: number;
    lineHeight: number;
    letterSpacing: string;
  };
  body2: {
    fontSize: string;
    fontWeight: number;
    lineHeight: number;
    letterSpacing: string;
  };
  button: {
    fontSize: string;
    fontWeight: number;
    lineHeight: number;
    letterSpacing: string;
    textTransform: string;
  };
  caption: {
    fontSize: string;
    fontWeight: number;
    lineHeight: number;
    letterSpacing: string;
  };
  overline: {
    fontSize: string;
    fontWeight: number;
    lineHeight: number;
    letterSpacing: string;
    textTransform: string;
  };
}

export interface Spacing {
  unit: number;
}

export interface Breakpoints {
  values: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
}

export interface Shadows {
  0: string;
  1: string;
  2: string;
  3: string;
  4: string;
  6: string;
  8: string;
  12: string;
  16: string;
  24: string;
}

export interface BorderRadius {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  round: string;
}

export interface ZIndex {
  mobileStepper: number;
  appBar: number;
  drawer: number;
  modal: number;
  snackbar: number;
  tooltip: number;
}

export interface Theme {
  colors: Colors;
  typography: Typography;
  spacing: Spacing;
  breakpoints: Breakpoints;
  shadows: Shadows;
  borderRadius: BorderRadius;
  zIndex: ZIndex;
  mode: 'light' | 'dark';
}
