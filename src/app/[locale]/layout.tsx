import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

import { MESSAGES_EN } from '../../../messages/en';
import { MESSAGES_UK } from '../../../messages/uk';
import { LimitContainer } from '../../components/container/container';
import { Header } from '../../components/header/header';
import { LOCALES } from '../../data/app-data';
import { routing } from '../../i18n/routing';

function getMessages(locale: string) {
  return locale === LOCALES.UK ? MESSAGES_UK : MESSAGES_EN;
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const { locale } = resolvedParams;

  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  const messages = getMessages(locale);

  return {
    title: messages.LAYOUT.GLOBAL.TITLE,
    description: messages.LAYOUT.GLOBAL.DESCRIPTION,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;

  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = getMessages(locale);

  return (
    <NextIntlClientProvider messages={messages}>
      <div className="min-h-screen flex flex-col text-sm md:text-base bg-[var(--color-gray-100)] dark:bg-[var(--color-neutral-800)] text-[var(--color-gray-900)] dark:text-[var(--color-gray-100)]">
        <Header />
        <main className="pt-[120px]">
          <LimitContainer>{children}</LimitContainer>
        </main>
      </div>
    </NextIntlClientProvider>
  );
}
