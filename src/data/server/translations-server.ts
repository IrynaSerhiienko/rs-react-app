import { MESSAGES_EN } from '../../../messages/en';
import { MESSAGES_UK } from '../../../messages/uk';
import { ALL_KEYS, LOCALES } from '../app-data';

export type TranslationKey = (typeof ALL_KEYS)[keyof typeof ALL_KEYS];

export function tServer(key: TranslationKey, locale: string): string {
  const messages = locale === LOCALES.UK ? MESSAGES_UK : MESSAGES_EN;
  const result = key.split('.').reduce<unknown>((acc, part) => {
    if (typeof acc === 'object' && acc !== null && part in acc) {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, messages);

  return typeof result === 'string' ? result : key;
}
