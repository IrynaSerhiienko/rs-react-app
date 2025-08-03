import { type ReactNode, useEffect } from 'react';

import { THEMES } from '../data/app-data';
import { useLocalStorage } from '../hooks/use-local-storage';
import type { Theme } from '../types/types';
import { ThemeContext } from './theme-context';

const LOCAL_STORAGE_KEY = 'SIA_RS_React-app-theme';

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const { value: theme, setValue: setTheme } = useLocalStorage(
    LOCAL_STORAGE_KEY,
    THEMES.LIGHT
  );

  useEffect(() => {
    const root = window.document.documentElement;
    return theme === THEMES.DARK
      ? root.classList.add('dark')
      : root.classList.remove('dark');
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK);
  };

  return (
    <ThemeContext.Provider
      value={{ theme: theme as Theme, setTheme, toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
