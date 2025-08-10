import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import Error404Page from './error404-page';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    Link: actual.Link,
  };
});

describe('Error404Page', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    mockNavigate.mockClear();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders titles and link correctly', () => {
    render(
      <MemoryRouter>
        <Error404Page />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      /404 - Page not found/i
    );
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      /You will be automatically redirected/i
    );
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
      /Or you can go to Home Page now/i
    );

    const link = screen.getByRole('link', { name: /go to Home Page now/i });
    expect(link).toHaveAttribute('href', '/');
  });

  it('calls navigate("/") after 5 seconds', () => {
    render(
      <MemoryRouter>
        <Error404Page />
      </MemoryRouter>
    );

    expect(mockNavigate).not.toHaveBeenCalled();

    vi.advanceTimersByTime(5000);

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
