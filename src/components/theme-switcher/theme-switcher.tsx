import { Moon, Sun } from 'lucide-react';

import { THEMES } from '../../data/app-data';
import { useTheme } from '../../hooks/use-theme';

export function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      aria-label="Toggle theme"
      className="rounded-lg p-2 transition-colors cursor-pointer"
      onClick={toggleTheme}
      type="button"
    >
      {theme === THEMES.DARK ? (
        <Sun className="h-6 w-6" />
      ) : (
        <Moon className="h-6 w-6" />
      )}
    </button>
  );
}
