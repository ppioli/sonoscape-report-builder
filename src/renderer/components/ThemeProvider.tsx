'use client';

import { ThemeProvider as AppThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <AppThemesProvider {...props}>{children}</AppThemesProvider>;
}
