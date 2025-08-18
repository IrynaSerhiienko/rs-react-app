'use client';
import { usePaginationData } from '../../data/app-data';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const { PREV_BUTTON, NEXT_BUTTON } = usePaginationData();

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <nav className="flex justify-center gap-4 my-6">
      <button
        disabled={currentPage === 1}
        onClick={handlePrev}
        className={`dark:text-[var(--color-black)] px-4 py-2 bg-[var(--color-gray-300)] rounded hover:bg-[var(--color-gray-400)] hover:text-[var(--color-white)] transition-all duration-300 ${
          currentPage === 1 ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
        }`}
      >
        {PREV_BUTTON}
      </button>

      <span className="px-4 py-2">
        Page {currentPage} of {totalPages}
      </span>

      <button
        disabled={currentPage === totalPages}
        onClick={handleNext}
        className={`dark:text-[var(--color-black)] px-4 py-2 bg-[var(--color-gray-300)] rounded hover:bg-[var(--color-gray-400)] hover:text-[var(--color-white)] transition-all duration-300 ${
          currentPage === totalPages
            ? 'cursor-not-allowed opacity-50'
            : 'cursor-pointer'
        }`}
      >
        {NEXT_BUTTON}
      </button>
    </nav>
  );
}
