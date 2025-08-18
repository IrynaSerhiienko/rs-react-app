import { Loader2 } from 'lucide-react';

import { useSpinnerData } from '../../data/app-data';

export function Spinner() {
  const { LOADING_TEXT } = useSpinnerData();
  return (
    <div className="flex items-center justify-center p-4">
      <Loader2
        className="animate-spin text-[var(--color-gray-600)] dark:text-[var(--color-gray-300)]"
        size={40}
      />
      <span className="text-[var(--color-gray-600)] text-sm md:text-base dark:text-[var(--color-gray-300)]">
        {LOADING_TEXT}
      </span>
    </div>
  );
}
