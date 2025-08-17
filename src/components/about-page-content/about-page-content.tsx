'use client';

import Image from 'next/image';

import github from '../../assets/github.svg';
import linkedin from '../../assets/linkedin.svg';
import { AboutData, COLORS } from '../../data/app-data';
import { SvgWrapper } from '../svg-wrapper/svg-wrapper';

interface AboutPageContentProps {
  about: AboutData;
}

export function AboutPageContent({ about }: AboutPageContentProps) {
  const LOGO_COLOR = COLORS.BLACK;

  return (
    <div className="max-w-3xl px-4 py-2 mx-auto space-y-8 bg-[var(--color-gray-300)] rounded shadow-2xl dark:text-[var(--color-black)]">
      <h1 className="pb-2 border-b text-2xl md:text-4xl font-bold">
        {about.TITLE}
      </h1>

      <div className="flex items-center gap-6">
        <div className="relative overflow-hidden rounded-full shadow-md h-30 w-30 border-1 border-primary">
          <Image
            src={about.AUTHOR.LINKS.PHOTO}
            alt={about.AUTHOR.ALT}
            fill
            style={{ objectFit: 'contain' }}
          />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-semibold">
            {about.AUTHOR.NAME}
          </h2>
          <p className="italic">{about.AUTHOR.ROLE}</p>
        </div>
      </div>

      <div className="flex gap-4">
        <a
          href={about.AUTHOR.LINKS.GITHUB}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={about.AUTHOR.ARIA.GITHUB}
          className="transition duration-300 hover:drop-shadow-[0_0_4px_var(--color-yellow-hover)] hover:opacity-70"
        >
          <div className="w-6 h-6">
            <SvgWrapper
              icon={github}
              label={about.ICONS.GITHUB.ALT}
              color={LOGO_COLOR}
            />
          </div>
        </a>

        <a
          href={about.AUTHOR.LINKS.LINKEDIN}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={about.AUTHOR.ARIA.LINKEDIN}
          className="transition duration-300 hover:drop-shadow-[0_0_4px_var(--color-yellow-hover)] hover:opacity-70"
        >
          <div className="w-6 h-6">
            <SvgWrapper
              icon={linkedin}
              label={about.ICONS.LINKEDIN.ALT}
              color={LOGO_COLOR}
            />
          </div>
        </a>
      </div>

      <p>
        {about.COURSE.TEXT}{' '}
        <a
          href={about.COURSE.URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--color-blue-600)] transition duration-300 hover:text-[var(--color-blue-800)] hover:underline underline-offset-4"
        >
          {about.COURSE.NAME}
        </a>
        {about.COURSE.DESC}
      </p>
    </div>
  );
}
