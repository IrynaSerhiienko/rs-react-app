import { NavLink } from 'react-router-dom';

import { ICONS, NAV_ITEMS } from '../../data/app-data';
import { useTheme } from '../../hooks/use-theme';
import { LimitContainer } from '../container/container';
import { ThemeSwitcher } from '../theme-switcher/theme-switcher';

export function Header() {
  const { theme } = useTheme();
  const activeClass = `nav-underline font-semibold after:w-full`;

  const inactiveClass = `nav-underline text-gray-600 dark:text-gray-300 after:w-0 hover:after:w-full`;

  return (
    <header className="py-4 fixed top-0 left-0 w-full bg-app z-50 shadow-md">
      <LimitContainer className="flex-row justify-between items-center">
        <NavLink to="/" className="flex items-center basis-[10%]">
          <img
            src={theme === 'dark' ? ICONS.LOGO.SRC.LIGHT : ICONS.LOGO.SRC.DARK}
            alt={ICONS.LOGO.ALT}
            className="h-16 w-auto"
          />
        </NavLink>
        <div className="flex gap-8 justify-end basis-[70%]">
          {NAV_ITEMS.map(({ to, label, end }) => (
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
        <div className="flex justify-end basis-[10%]">
          <ThemeSwitcher />
        </div>
      </LimitContainer>
    </header>
  );
}
