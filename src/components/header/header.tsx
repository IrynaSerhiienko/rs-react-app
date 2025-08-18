'use client';

import { ThemeProvider } from '../../context/theme-provider';
import { HeaderContent } from './header-content/header-content';

export function Header() {
  return (
    <ThemeProvider>
      <HeaderContent />
    </ThemeProvider>
  );
}
