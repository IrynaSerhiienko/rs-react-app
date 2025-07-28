import { render, screen } from '@testing-library/react';
import { MemoryRouter, Outlet } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import AppRoutes from './router';

vi.mock('./components/layouts/layouts', () => ({
  AppLayout: () => (
    <div data-testid="app-layout">
      <Outlet />
    </div>
  ),
}));

vi.mock('./pages/home-page/home-page', () => ({
  HomePage: () => <div data-testid="home-page">Home Page</div>,
}));

vi.mock('./pages/about-page/about-page', () => ({
  AboutPage: () => <div data-testid="about-page">About Page</div>,
}));

vi.mock('./pages/error404-page/error404-page', () => ({
  Error404Page: () => <div data-testid="error404-page">404 Page</div>,
}));

describe('AppRoutes', () => {
  it('renders HomePage on default route "/"', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByTestId('app-layout')).toBeInTheDocument();
    expect(screen.getByTestId('home-page')).toBeInTheDocument();
  });

  it('renders AboutPage on route "/about"', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByTestId('app-layout')).toBeInTheDocument();
    expect(screen.getByTestId('about-page')).toBeInTheDocument();
  });

  it('renders Error404Page on unknown route', () => {
    render(
      <MemoryRouter initialEntries={['/unknown']}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByTestId('app-layout')).toBeInTheDocument();
    expect(screen.getByTestId('error404-page')).toBeInTheDocument();
  });
});
