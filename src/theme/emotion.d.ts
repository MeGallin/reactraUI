import '@emotion/react';
import { Theme as ReactraTheme } from './types';

declare module '@emotion/react' {
  export interface Theme extends ReactraTheme {}
}
