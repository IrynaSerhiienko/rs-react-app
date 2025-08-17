'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import Logo from '../../../assets/logo.svg';
import { COLORS, NAVIGATION, THEMES } from '../../../data/app-data';
import { useHeaderData, useNavigationData } from '../../../data/app-data';
import { useTheme } from '../../../hooks/use-theme';
import { LimitContainer } from '../../container/container';
import { SvgWrapper } from '../../svg-wrapper/svg-wrapper';
import { ThemeSwitcher } from '../../theme-switcher/theme-switcher';

export function HeaderContent() {
  const { HEADER } = useHeaderData();
  const { NAV_ITEMS, ROUTES } = useNavigationData();
  const pathname = usePathname();
  const { theme } = useTheme();

  const NAV_UNDERLINE = `relative cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:bg-current after:duration-300`;
  const ACTIVE_CLASS = `${NAV_UNDERLINE} font-semibold after:w-full`;
  const INACTIVE_CLASS = `${NAV_UNDERLINE} text-gray-600 dark:text-gray-300 after:w-0 hover:after:w-full`;

  const LOGO_COLOR = theme === THEMES.DARK ? COLORS.WHITE : COLORS.BLACK;

  const normalizePath = (path: string | null) => {
    const currentPage = (path ?? '').replace(/^\/[a-z]{2}/, '');
    return currentPage === '' ? NAVIGATION.ROUTES.HOME : currentPage;
  };

  const getLinkClass = (to: string) =>
    normalizePath(pathname) === to ? ACTIVE_CLASS : INACTIVE_CLASS;

  return (
    <header className="fixed top-0 left-0 z-50 w-full py-4 shadow-md  bg-[var(--color-gray-100)] dark:bg-[var(--color-neutral-800)] text-[var(--color-gray-900)] dark:text-[var(--color-gray-100)]">
      <LimitContainer className="flex-row items-center justify-between">
        <Link href={ROUTES.HOME} className="flex items-center basis-[10%]">
          <div className="w-16 h-16">
            <SvgWrapper
              icon={Logo}
              label={HEADER.ICONS.LOGO.ALT}
              color={LOGO_COLOR}
            />
          </div>
        </Link>
        <div className="flex gap-8 justify-end basis-[70%]">
          {NAV_ITEMS.map(({ to, label }) => {
            console.log('link:', label, 'to:', to, 'pathname:', pathname);
            return (
              <Link key={to} href={to} className={getLinkClass(to)}>
                {label}
              </Link>
            );
          })}
        </div>
        <div className="flex justify-end basis-[10%]">
          <ThemeSwitcher />
        </div>
      </LimitContainer>
    </header>
  );
}
