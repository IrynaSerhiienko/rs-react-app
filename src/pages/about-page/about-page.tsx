import Image from 'next/image';

import { AUTHOR_INFO, COURSE_INFO, ICONS, TITLES } from '../../data/app-data';

export default function AboutPage() {
  return (
    <div className="max-w-3xl px-4 py-2 mx-auto space-y-8 bg-gray-300 rounded shadow-2xl dark:text-black">
      <h1 className="pb-2 border-b h1-app">{TITLES.ABOUT}</h1>
      <div className="flex items-center gap-6">
        <div className="relative overflow-hidden rounded-full shadow-md h-30 w-30 border-1 border-primary">
          <Image
            src={AUTHOR_INFO.PHOTO}
            alt={AUTHOR_INFO.NAME}
            fill
            style={{ objectFit: 'contain' }}
          />
        </div>
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
          <div className="relative w-6 h-6">
            <Image
              src={ICONS.GITHUB.SRC.DARK}
              alt={ICONS.GITHUB.ALT}
              fill
              style={{ objectFit: 'contain' }}
            />
          </div>
        </a>

        <a
          href={AUTHOR_INFO.LINKEDIN}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="transition duration-300 hover:drop-shadow-[0_0_4px_#FFDA1F] hover:opacity-70"
        >
          <div className="relative w-6 h-6">
            <Image
              src={ICONS.LINKEDIN.SRC.DARK}
              alt={ICONS.LINKEDIN.ALT}
              fill
              style={{ objectFit: 'contain' }}
            />
          </div>
        </a>
      </div>

      <p>
        {COURSE_INFO.TEXT}{' '}
        <a
          href={COURSE_INFO.URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 transition duration-300 hover:text-blue-800 hover:underline underline-offset-4"
        >
          {COURSE_INFO.NAME}
        </a>
        {COURSE_INFO.DESC}
      </p>
    </div>
  );
}
