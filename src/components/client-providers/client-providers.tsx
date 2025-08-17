'use client';

import { Provider } from 'react-redux';

import { ThemeProvider } from '../../context/theme-provider';
import { store } from '../../store';
import ErrorBoundary from '../error-boundary/error-boundary';

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <ErrorBoundary>{children}</ErrorBoundary>
      </Provider>
    </ThemeProvider>
  );
}
