import { theme } from '@styles/theme.default';
import 'styled-components';

declare module 'styled-components' {
  type ThemeType = typeof theme;

  export interface DefaultTheme extends ThemeType {}
}
