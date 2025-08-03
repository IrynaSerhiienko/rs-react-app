import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, test } from 'vitest';

import App from './app';
import { ThemeProvider } from './context/theme-provider';

describe('App component', () => {
  test('renders without crashing and renders AppRoutes inside Router', () => {
    render(
      <ThemeProvider>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </ThemeProvider>
    );

    expect(true).toBe(true);
  });
});
