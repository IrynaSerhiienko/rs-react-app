import { ABOUT_KEYS } from '../app-data';
import { TranslationKey, tServer } from './translations-server';

export function useAboutDataServer(locale: string) {
  const t = (key: (typeof ABOUT_KEYS)[keyof typeof ABOUT_KEYS]) =>
    tServer(key as TranslationKey, locale);

  return {
    TITLE: t(ABOUT_KEYS.TITLE),
    AUTHOR: {
      NAME: t(ABOUT_KEYS.AUTHOR_NAME),
      ROLE: t(ABOUT_KEYS.AUTHOR_ROLE),
      ALT: t(ABOUT_KEYS.AUTHOR_AVATAR_ALT),
      ARIA: {
        GITHUB: t(ABOUT_KEYS.AUTHOR_ARIA_GITHUB),
        LINKEDIN: t(ABOUT_KEYS.AUTHOR_ARIA_LINKEDIN),
      },
      LINKS: {
        GITHUB: 'https://github.com/IrynaSerhiienko',
        LINKEDIN: 'https://www.linkedin.com/in/irynaserhiienko/',
        PHOTO: '/avatar.jpg',
      },
    },
    COURSE: {
      TEXT: t(ABOUT_KEYS.COURSE_TEXT),
      NAME: t(ABOUT_KEYS.COURSE_NAME),
      DESC: t(ABOUT_KEYS.COURSE_DESC),
      URL: 'https://rs.school/courses/reactjs',
    },
    ICONS: {
      GITHUB: { ALT: t(ABOUT_KEYS.ICON_GITHUB_ALT) },
      LINKEDIN: { ALT: t(ABOUT_KEYS.ICON_LINKEDIN_ALT) },
    },
  };
}
