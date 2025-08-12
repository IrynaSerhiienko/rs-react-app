import Image from 'next/image';
import { NavLink } from 'react-router-dom';

import { ICONS, NAV_ITEMS } from '../../data/app-data';
import { ROUTES, THEMES } from '../../data/app-data';
import { useTheme } from '../../hooks/use-theme';
import { preloadAboutPage } from '../../utils/preload';
import { LimitContainer } from '../container/container';
import { ThemeSwitcher } from '../theme-switcher/theme-switcher';

export function Header() {
  const { theme } = useTheme();

  const activeClass = `nav-underline font-semibold after:w-full`;
  const inactiveClass = `nav-underline text-gray-600 dark:text-gray-300 after:w-0 hover:after:w-full`;

  const handlePreload = (to: string) => {
    switch (to) {
      case ROUTES.ABOUT:
        preloadAboutPage();
        break;
      default:
        break;
    }
  };

  return (
    <header className="fixed top-0 left-0 z-50 w-full py-4 shadow-md bg-app">
      <LimitContainer className="flex-row items-center justify-between">
        <NavLink to="/" className="flex items-center basis-[10%]">
          <div className="relative w-auto h-16">
            <Image
              src={
                theme === THEMES.DARK
                  ? ICONS.LOGO.SRC.LIGHT
                  : ICONS.LOGO.SRC.DARK
              }
              alt={ICONS.LOGO.ALT}
              fill
              style={{ objectFit: 'contain' }}
            />
          </div>
        </NavLink>
        <div className="flex gap-8 justify-end basis-[70%]">
          {NAV_ITEMS.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onMouseEnter={() => handlePreload(to)}
              onFocus={() => handlePreload(to)}
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
