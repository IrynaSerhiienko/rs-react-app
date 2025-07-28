import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { vi } from 'vitest';

import { AppLayout } from './layouts';

vi.mock('../header/header', () => ({
  Header: () => <div data-testid="header">HeaderMock</div>,
}));

vi.mock('../container/container', () => ({
  LimitContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="limit-container">{children}</div>
  ),
}));

describe('AppLayout', () => {
  it('renders Header and Outlet inside LimitContainer', () => {
    render(
      <MemoryRouter>
        <AppLayout />
      </MemoryRouter>
    );

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('limit-container')).toBeInTheDocument();

    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
    expect(main.firstChild).toBeTruthy();
  });
});
