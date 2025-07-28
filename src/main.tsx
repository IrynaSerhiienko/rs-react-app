import './main.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import ErrorBoundary from '@/components/error-boundary/error-boundary.tsx';

import App from './app';

const ERROR_MESSAGE = 'Root container not found';

const container = document.getElementById('root');

if (!container) {
  throw new Error(ERROR_MESSAGE);
}

createRoot(container).render(
  <StrictMode>
    <BrowserRouter>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </BrowserRouter>
  </StrictMode>
);
