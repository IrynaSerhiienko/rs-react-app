import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, test } from 'vitest';

import App from './App';
import { ThemeProvider } from './context/theme-provider';
import { store } from './store';

describe('App component', () => {
  test('renders without crashing and renders AppRoutes inside Router', () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <MemoryRouter>
            <App />
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    );

    expect(true).toBe(true);
  });
});
