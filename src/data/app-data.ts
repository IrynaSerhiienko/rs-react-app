import GitHubDark from '../assets/github-dark.svg';
import GitHubLight from '../assets/github-light.svg';
import LinkedInDark from '../assets/linkedin-dark.svg';
import LinkedInLight from '../assets/linkedin-light.svg';
import LogoDark from '../assets/logo-dark.svg';
import LogoLight from '../assets/logo-light.svg';

export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;

export const TITLES = {
  HOME: 'Rick and Morty Search',
  ABOUT: 'About',
} as const;

export const AUTHOR_INFO = {
  NAME: 'Irina',
  ROLE: 'Frontend Developer',
  GITHUB: 'https://github.com/IrynaSerhiienko',
  LINKEDIN: 'https://www.linkedin.com/in/irynaserhiienko/',
  PHOTO: 'https://avatars.githubusercontent.com/u/108522040?v=4',
  ARIA: {
    GITHUB: 'GitHub profile',
    LINKEDIN: 'LinkedIn profile',
  },
} as const;

export const COURSE_INFO = {
  TEXT: 'Learn React at',
  NAME: 'RS School React Course',
  URL: 'https://rs.school/courses/reactjs',
  DESC: ', where practical skills and real-world tasks help you grow as a developer.',
} as const;

export const ICONS = {
  LOGO: {
    SRC: {
      LIGHT: LogoLight,
      DARK: LogoDark,
    },
    ALT: 'Rick and Morty logo',
  },
  GITHUB: {
    SRC: {
      LIGHT: GitHubLight,
      DARK: GitHubDark,
    },
    ALT: 'GitHub',
  },
  LINKEDIN: {
    SRC: {
      LIGHT: LinkedInLight,
      DARK: LinkedInDark,
    },
    ALT: 'LinkedIn',
  },
} as const;

export const NAV_ITEMS = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
];

export const ROUTES = { ABOUT: '/about' } as const;

export const CHARACTERS_API = {
  BASE_URL: 'https://rickandmortyapi.com/api/',
  REDUCER_PATH: 'charactersApi',
  PATH_CHARACTER: 'character',
  DEFAULT_NAME: '',
  DEFAULT_PAGE: 1,
} as const;
