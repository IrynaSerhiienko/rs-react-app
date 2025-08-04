import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { ThemeContext } from '../../context/theme-context';
import { THEMES } from '../../data/app-data';
import { ThemeSwitcher } from './theme-switcher';

describe('ThemeSwitcher', () => {
  it('renders Sun icon when theme is dark', () => {
    const toggleTheme = vi.fn();

    render(
      <ThemeContext.Provider
        value={{ theme: THEMES.DARK, toggleTheme, setTheme: () => {} }}
      >
        <ThemeSwitcher />
      </ThemeContext.Provider>
    );

    const button = screen.getByRole('button', { name: /toggle theme/i });
    expect(button).toBeInTheDocument();

    const svg = button.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('renders Moon icon when theme is light', () => {
    const toggleTheme = vi.fn();

    render(
      <ThemeContext.Provider
        value={{ theme: THEMES.LIGHT, toggleTheme, setTheme: () => {} }}
      >
        <ThemeSwitcher />
      </ThemeContext.Provider>
    );

    const button = screen.getByRole('button', { name: /toggle theme/i });
    expect(button).toBeInTheDocument();

    const svg = button.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('calls toggleTheme when button is clicked', () => {
    const toggleTheme = vi.fn();

    render(
      <ThemeContext.Provider
        value={{ theme: THEMES.LIGHT, toggleTheme, setTheme: () => {} }}
      >
        <ThemeSwitcher />
      </ThemeContext.Provider>
    );

    const button = screen.getByRole('button', { name: /toggle theme/i });
    fireEvent.click(button);

    expect(toggleTheme).toHaveBeenCalledTimes(1);
  });
});
