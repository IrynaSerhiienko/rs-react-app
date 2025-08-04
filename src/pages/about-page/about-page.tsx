import { AUTHOR_INFO, COURSE_INFO, ICONS, TITLES } from '../../data/app-data';

export function AboutPage() {
  return (
    <div className="px-4 py-2 max-w-3xl mx-auto shadow-2xl dark:text-black space-y-8 bg-gray-300 rounded">
      <h1 className="h1-app border-b pb-2">{TITLES.ABOUT}</h1>
      <div className="flex items-center gap-6">
        <img
          src={AUTHOR_INFO.PHOTO}
          alt={AUTHOR_INFO.NAME}
          className="rounded-full h-30 w-30 object-cover border-1 border-primary shadow-md"
        />
        <div>
          <h2 className="h2-app">{AUTHOR_INFO.NAME}</h2>
          <p className="italic">{AUTHOR_INFO.ROLE}</p>
        </div>
      </div>

      <div className="flex gap-4">
        <a
          href={AUTHOR_INFO.GITHUB}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={AUTHOR_INFO.ARIA.GITHUB}
          className="transition duration-300 hover:drop-shadow-[0_0_4px_#FFDA1F] hover:opacity-70"
        >
          <img
            src={ICONS.GITHUB.SRC.DARK}
            alt={ICONS.GITHUB.ALT}
            className="w-6 h-6"
          />
        </a>

        <a
          href={AUTHOR_INFO.LINKEDIN}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="transition duration-300 hover:drop-shadow-[0_0_4px_#FFDA1F] hover:opacity-70"
        >
          <img
            src={ICONS.LINKEDIN.SRC.DARK}
            alt={ICONS.LINKEDIN.ALT}
            className="w-6 h-6"
          />
        </a>
      </div>

      <p>
        {COURSE_INFO.TEXT}{' '}
        <a
          href={COURSE_INFO.URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 hover:underline underline-offset-4 transition duration-300"
        >
          {COURSE_INFO.NAME}
        </a>
        {COURSE_INFO.DESC}
      </p>
    </div>
  );
}
