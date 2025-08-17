import { useTranslations } from 'next-intl';

export const LOCALES = {
  EN: 'en',
  UK: 'uk',
} as const;

export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;

export const COLORS = {
  WHITE: 'var(--color-white)',
  BLACK: 'var(--color-black)',
} as const;

export const NAVIGATION = {
  ROUTES: {
    HOME: '/',
    ABOUT: '/about',
  },
} as const;

export const DEFAULT_SVG_COLOR = 'currentColor' as const;

export const KEY_CODES = {
  ENTER: 'Enter',
  SPACE: ' ',
} as const;

export const CARD_KEYS = {
  STATUS: 'CARD.STATUS',
} as const;

const CARD_DETAILS_KEYS = {
  CLOSE_BUTTON: 'CARD_DETAILS.CLOSE_BUTTON',
  STATUS: 'CARD_DETAILS.STATUS',
  SPECIES: 'CARD_DETAILS.SPECIES',
  GENDER: 'CARD_DETAILS.GENDER',
  NO_CHARACTER_FOUND: 'CARD_DETAILS.NO_CHARACTER_FOUND',
} as const;

export const SPINNER_KEYS = {
  LOADING: 'SPINNER.LOADING',
} as const;

export const ERROR_KEYS = {
  DEFAULT: 'ERROR.DEFAULT',
} as const;

export const FLYOUT_KEYS = {
  UNSELECT_ALL_BUTTON: 'FLYOUT.UNSELECT_ALL_BUTTON',
  DOWNLOAD_BUTTON: 'FLYOUT.DOWNLOAD_BUTTON',
  ITEM_LABEL_SINGULAR: 'FLYOUT.ITEM_LABEL_SINGULAR',
  ITEM_LABEL_PLURAL: 'FLYOUT.ITEM_LABEL_PLURAL',
} as const;

export const SEARCH_KEYS = {
  PLACEHOLDER: 'SEARCH.PLACEHOLDER',
  SEARCH_BUTTON: 'SEARCH.SEARCH_BUTTON',
} as const;

export const NAVIGATION_KEYS = {
  HOME: 'NAVIGATION.LABELS.HOME',
  ABOUT: 'NAVIGATION.LABELS.ABOUT',
} as const;

export const HOME_KEYS = {
  TITLE: 'HOME.TITLE',
} as const;

export const ABOUT_KEYS = {
  TITLE: 'ABOUT.TITLE',
  AUTHOR_NAME: 'ABOUT.AUTHOR.NAME',
  AUTHOR_ROLE: 'ABOUT.AUTHOR.ROLE',
  AUTHOR_AVATAR_ALT: 'ABOUT.AUTHOR.AVATAR.ALT',
  AUTHOR_ARIA_GITHUB: 'ABOUT.AUTHOR.ARIA.GITHUB',
  AUTHOR_ARIA_LINKEDIN: 'ABOUT.AUTHOR.ARIA.LINKEDIN',
  COURSE_TEXT: 'ABOUT.COURSE.TEXT',
  COURSE_NAME: 'ABOUT.COURSE.NAME',
  COURSE_DESC: 'ABOUT.COURSE.DESC',
  ICON_GITHUB_ALT: 'ABOUT.ICONS.GITHUB.ALT',
  ICON_LINKEDIN_ALT: 'ABOUT.ICONS.LINKEDIN.ALT',
} as const;

export const HEADER_KEYS = {
  LOGO_ALT: 'HEADER.ICONS.LOGO.ALT',
} as const;

export const ALL_KEYS = {
  ...CARD_KEYS,
  ...CARD_DETAILS_KEYS,
  ...SPINNER_KEYS,
  ...ERROR_KEYS,
  ...FLYOUT_KEYS,
  ...SEARCH_KEYS,
  ...NAVIGATION_KEYS,
  ...ABOUT_KEYS,
  ...HOME_KEYS,
  ...HEADER_KEYS,
} as const;

export interface AboutData {
  TITLE: string;
  AUTHOR: {
    NAME: string;
    ROLE: string;
    ALT: string;
    ARIA: {
      GITHUB: string;
      LINKEDIN: string;
    };
    LINKS: {
      GITHUB: string;
      LINKEDIN: string;
      PHOTO: string;
    };
  };
  COURSE: {
    TEXT: string;
    NAME: string;
    DESC: string;
    URL: string;
  };
  ICONS: {
    GITHUB: { ALT: string };
    LINKEDIN: { ALT: string };
  };
}

export const useSearchData = () => {
  const t = useTranslations();
  return {
    PLACEHOLDER: t(SEARCH_KEYS.PLACEHOLDER),
    SEARCH_BUTTON: t(SEARCH_KEYS.SEARCH_BUTTON),
  };
};

export const useFlyoutData = () => {
  const t = useTranslations();

  return {
    UNSELECT_ALL: t(FLYOUT_KEYS.UNSELECT_ALL_BUTTON),
    DOWNLOAD: t(FLYOUT_KEYS.DOWNLOAD_BUTTON),
    ITEM_LABEL_SINGULAR: t(FLYOUT_KEYS.ITEM_LABEL_SINGULAR),
    ITEM_LABEL_PLURAL: t(FLYOUT_KEYS.ITEM_LABEL_PLURAL),
  };
};

export const useCardData = () => {
  const t = useTranslations();
  return {
    STATUS_TEXT: t(CARD_KEYS.STATUS),
  };
};

export const useErrorData = () => {
  const t = useTranslations();
  return {
    DEFAULT_ERROR_TEXT: t(ERROR_KEYS.DEFAULT),
  };
};

export const useSpinnerData = () => {
  const t = useTranslations();
  return {
    LOADING_TEXT: t(SPINNER_KEYS.LOADING),
  };
};

export const useNavigationData = () => {
  const t = useTranslations();

  const NAV_ITEMS = [
    {
      to: NAVIGATION.ROUTES.HOME,
      label: t(NAVIGATION_KEYS.HOME),
    },
    { to: NAVIGATION.ROUTES.ABOUT, label: t(NAVIGATION_KEYS.ABOUT) },
  ];

  return { NAV_ITEMS, ROUTES: NAVIGATION.ROUTES };
};

export const useAboutData = () => {
  const t = useTranslations();

  const ABOUT = {
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
      GITHUB: {
        ALT: t(ABOUT_KEYS.ICON_GITHUB_ALT),
      },
      LINKEDIN: {
        ALT: t(ABOUT_KEYS.ICON_LINKEDIN_ALT),
      },
    },
  };

  return { ABOUT };
};

export const useHeaderData = () => {
  const t = useTranslations();

  const HEADER = {
    ICONS: {
      LOGO: {
        ALT: t(HEADER_KEYS.LOGO_ALT),
      },
    },
  };

  return { HEADER };
};

export const useCharacterData = () => {
  const t = useTranslations();

  const CARD_DETAILS = {
    CLOSE_BUTTON: t(CARD_DETAILS_KEYS.CLOSE_BUTTON),
    STATUS: t(CARD_DETAILS_KEYS.STATUS),
    GENDER: t(CARD_DETAILS_KEYS.GENDER),
    SPECIES: t(CARD_DETAILS_KEYS.SPECIES),
    NO_CHARACTER_FOUND: t(CARD_DETAILS_KEYS.NO_CHARACTER_FOUND),
  };

  return { CARD_DETAILS };
};

export const CHARACTERS_API = {
  BASE_URL: 'https://rickandmortyapi.com/api/',
  REDUCER_PATH: 'charactersApi',
  PATH_CHARACTER: 'character',
  DEFAULT_NAME: '',
  DEFAULT_PAGE: 1,
} as const;
