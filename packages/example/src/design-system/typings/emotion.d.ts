import '@emotion/react';

import { type Theme as ThemeInterface } from '../theme/theme.types';
declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface  -- we do want an empty interface, it's indicated in the emotion docs
  export interface Theme extends ThemeInterface {}
}
