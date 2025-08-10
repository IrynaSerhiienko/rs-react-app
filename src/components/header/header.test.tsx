import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ThemeProvider } from '../../context/theme-provider';
import { preloadAboutPage } from '../../utils/preload';
import { Header } from './header';

vi.mock('../../utils/preload', () => ({
  preloadAboutPage: vi.fn(),
}));

function renderWithProviders(ui: React.ReactNode, initialPath = '/') {
  return render(
    <ThemeProvider>
      <MemoryRouter initialEntries={[initialPath]}>{ui}</MemoryRouter>
    </ThemeProvider>
  );
}

describe('Header component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it('renders logo with correct alt and src', () => {
    renderWithProviders(<Header />);
    const logo = screen.getByAltText('Rick and Morty logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src');
  });

  it('renders navigation links with correct labels and paths', () => {
    renderWithProviders(<Header />);
    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');

    const aboutLink = screen.getByRole('link', { name: 'About' });
    expect(aboutLink).toBeInTheDocument();
    expect(aboutLink).toHaveAttribute('href', '/about');
  });

  it('applies active class when Home is the current route', () => {
    renderWithProviders(<Header />, '/');
    const homeLink = screen.getByRole('link', { name: 'Home' });
    const aboutLink = screen.getByRole('link', { name: 'About' });

    expect(homeLink.className).toMatch(/font-semibold/);
    expect(aboutLink.className).toMatch(/text-gray-600/);
  });

  it('applies active class when About is the current route', () => {
    renderWithProviders(<Header />, '/about');
    const homeLink = screen.getByRole('link', { name: 'Home' });
    const aboutLink = screen.getByRole('link', { name: 'About' });

    expect(aboutLink.className).toMatch(/font-semibold/);
    expect(homeLink.className).toMatch(/text-gray-600/);
  });

  it('calls preloadAboutPage on mouse enter and focus of About link', () => {
    renderWithProviders(<Header />);
    const aboutLink = screen.getByRole('link', { name: 'About' });

    fireEvent.mouseEnter(aboutLink);
    expect(preloadAboutPage).toHaveBeenCalledTimes(1);

    fireEvent.focus(aboutLink);
    expect(preloadAboutPage).toHaveBeenCalledTimes(2);
  });

  it('renders ThemeSwitcher component', () => {
    renderWithProviders(<Header />);
    expect(
      screen.getByRole('button', { name: /toggle theme/i })
    ).toBeInTheDocument();
  });
});
