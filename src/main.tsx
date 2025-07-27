import './main.css';

// import ErrorBoundary from '@/components/error-boundary/error-boundary.tsx';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './app';
import { SearchProvider } from './context/search-provider';

const ERROR_MESSAGE = 'Root container not found';

const container = document.getElementById('root');

if (!container) {
  throw new Error(ERROR_MESSAGE);
}

createRoot(container).render(
  <StrictMode>
    <BrowserRouter>
      {/* <ErrorBoundary> */}
      <SearchProvider>
        <App />
      </SearchProvider>
      {/* </ErrorBoundary> */}
    </BrowserRouter>
  </StrictMode>
);
