import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { AppLayout } from './components/layouts/layouts';
import { Spinner } from './components/spinner/spinner';
import { HomePage } from './pages/home-page/home-page';

const AboutPage = lazy(() => import('./pages/about-page/about-page'));
const Error404Page = lazy(() => import('./pages/error404-page/error404-page'));

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route
          path="about"
          element={
            <Suspense fallback={<Spinner />}>
              <AboutPage />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<Spinner />}>
              <Error404Page />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}
