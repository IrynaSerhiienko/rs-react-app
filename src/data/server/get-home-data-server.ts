import { HOME_KEYS } from '../app-data';
import { TranslationKey, tServer } from './translations-server';

export async function getHomeDataServer(locale: string) {
  const t = (key: (typeof HOME_KEYS)[keyof typeof HOME_KEYS]) =>
    tServer(key as TranslationKey, locale);

  return {
    TITLE: t(HOME_KEYS.TITLE),
  };
}
