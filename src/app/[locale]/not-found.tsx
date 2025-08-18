'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useNotFoundData } from '../../data/app-data';

export default function NotFoundPage() {
  const router = useRouter();
  const { TITLE, DESCRIPTION, HOME_BUTTON } = useNotFoundData();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push('/');
    }, 5000);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="p-4 text-center">
      <h1 className="mb-4 text-4xl font-bold text-[var(--color-red-600)]">
        {TITLE}
      </h1>
      <p className="mb-2 text-[var(--color-gray-600)] dark:text-[var(--color-gray-300)] text-lg">
        {DESCRIPTION}
      </p>
      <button
        onClick={() => router.push('/')}
        className="text-[var(--color-blue-600)] underline"
      >
        {HOME_BUTTON}
      </button>
    </div>
  );
}
