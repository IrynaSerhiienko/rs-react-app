import { Route, Routes } from 'react-router-dom';

import { CharacterDetails } from './components/character-details/character-details';
import { AppLayout } from './components/layouts/layouts';
import { AboutPage } from './pages/about-page/about-page';
import { Error404Page } from './pages/error404-page/error404-page';
import { HomePage } from './pages/home-page/home-page';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="details/:id" element={<HomePage />}>
          <Route index element={<CharacterDetails />} />
        </Route>
        <Route path="about" element={<AboutPage />} />
        <Route path="*" element={<Error404Page />} />
      </Route>
    </Routes>
  );
}
