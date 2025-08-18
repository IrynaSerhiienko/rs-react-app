import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';

import { MESSAGES_EN } from '../../messages/en';
import { routing } from './routing';

const messagesMap: Record<string, () => Promise<typeof MESSAGES_EN>> = {
  en: () => import('../../messages/en').then((module) => module.MESSAGES_EN),
  uk: () => import('../../messages/uk').then((module) => module.MESSAGES_UK),
};

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;

  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const messages: typeof MESSAGES_EN = await messagesMap[locale]();

  return {
    locale,
    messages,
  };
});
