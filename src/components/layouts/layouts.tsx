import { Outlet } from 'react-router-dom';

import { LimitContainer } from '../container/container';
import { Header } from '../header/header';

export function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-app text-app">
      <Header />
      <main className="pt-[120px]">
        <LimitContainer>
          <Outlet />
        </LimitContainer>
      </main>
    </div>
  );
}
