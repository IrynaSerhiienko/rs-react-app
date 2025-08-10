import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { ThemeProvider } from '../../context/theme-provider';
import { Header } from './header';

function renderWithProviders(ui: React.ReactNode, initialPath = '/') {
  return render(
    <ThemeProvider>
      <MemoryRouter initialEntries={[initialPath]}>{ui}</MemoryRouter>
    </ThemeProvider>
  );
}

describe('Header component', () => {
  it('renders logo with correct alt and src', () => {
    renderWithProviders(<Header />);
    const logoImg = screen.getByAltText('Rick and Morty logo');
    expect(logoImg).toBeInTheDocument();
    expect(logoImg).toHaveAttribute('src');
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
});
