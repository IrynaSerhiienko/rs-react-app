import { NavLink } from 'react-router-dom';

import logo from '../../assets/logo.svg';
import { LimitContainer } from '../container/container';

const navItems = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  // { to: '/non-existent', label: 'Error404 (test)' },
];

export function Header() {
  const activeClass = 'text-black font-semibold underline';
  const inactiveClass = 'text-gray-600 hover:text-black hover:underline';

  return (
    <header className="py-4 mb-4 bg-gray-100 flex">
      <LimitContainer className="space-x-6 flex-row justify-between items-center">
        <NavLink to="/" className="flex items-center space-x-4">
          <img src={logo} alt="Rick and Morty logo" className="h-16 w-auto" />
        </NavLink>
        <div className="flex gap-7">
          {navItems.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                isActive ? activeClass : inactiveClass
              }
            >
              {label}
            </NavLink>
          ))}
        </div>
      </LimitContainer>
    </header>
  );
}
