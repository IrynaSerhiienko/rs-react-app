'use client';

import { NextIntlClientProvider } from 'next-intl';

import { MESSAGES_EN } from '../../../messages/en';
import { MESSAGES_UK } from '../../../messages/uk';
import { LOCALES } from '../../data/app-data';
import { ErrorMessage } from './error-message/error-message';

type ErrorProps = {
  error: Error;
};

export default function ErrorContent({ error }: ErrorProps) {
  const locale = LOCALES.EN;
  const messages = LOCALES.UK ? MESSAGES_UK : MESSAGES_EN;

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ErrorMessage message={error?.message} />
    </NextIntlClientProvider>
  );
}
