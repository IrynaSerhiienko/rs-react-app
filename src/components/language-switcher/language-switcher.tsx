'use client';

import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useEffect, useState } from 'react';

import { LOCALES } from '../../data/app-data';

export function LanguageSwitcher() {
  const router = useRouter();
  const locale = useLocale();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const switchLocale = () => {
    const newLocale = locale === LOCALES.EN ? LOCALES.UK : LOCALES.EN;
    router.push(
      `/${newLocale}${window.location.pathname.replace(/^\/[a-z]{2}/, '')}`
    );
  };

  return (
    <button
      aria-label="Switch language"
      className="rounded-lg p-2 transition-colors cursor-pointer"
      onClick={switchLocale}
      type="button"
    >
      {locale === LOCALES.EN ? 'EN' : 'UK'}
    </button>
  );
}
