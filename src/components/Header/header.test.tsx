import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { Header } from './header';

describe('Header component', () => {
  it('renders logo with correct alt and src', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const logoImg = screen.getByAltText('Rick and Morty logo');
    expect(logoImg).toBeInTheDocument();
    expect(logoImg).toHaveAttribute('src');
  });

  it('renders navigation links with correct labels and paths', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');

    const aboutLink = screen.getByRole('link', { name: 'About' });
    expect(aboutLink).toBeInTheDocument();
    expect(aboutLink).toHaveAttribute('href', '/about');
  });

  it('applies active class to the current route link', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <Header />
      </MemoryRouter>
    );

    const aboutLink = screen.getByRole('link', { name: 'About' });
    const homeLink = screen.getByRole('link', { name: 'Home' });

    expect(aboutLink.className).toMatch(/text-black/);
    expect(aboutLink.className).toMatch(/font-semibold/);
    expect(aboutLink.className).toMatch(/underline/);

    expect(homeLink.className).toMatch(/text-gray-600/);
  });
});
