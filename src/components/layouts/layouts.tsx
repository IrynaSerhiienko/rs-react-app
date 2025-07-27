import { Outlet } from 'react-router-dom';

import { LimitContainer } from '../container/container';
import { Header } from '../header/header';

export function AppLayout() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <main>
        <LimitContainer>
          <Outlet />
        </LimitContainer>
      </main>
    </div>
  );
}
