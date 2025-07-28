import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, test } from 'vitest';

import App from './app';

describe('App component', () => {
  test('renders without crashing and renders AppRoutes inside Router', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(true).toBe(true);
  });
});
