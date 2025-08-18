import type { ChangeEvent, KeyboardEvent } from 'react';
import { useEffect, useState } from 'react';

import { KEY_CODES, useSearchData } from '../../data/app-data';

type SearchProps = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onSearch: (term: string) => void;
};

export function Search({ searchTerm, setSearchTerm, onSearch }: SearchProps) {
  const { PLACEHOLDER, SEARCH_BUTTON } = useSearchData();
  const [inputValue, setInputValue] = useState(searchTerm);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSearch = () => {
    const trimmed = inputValue.trim();
    setSearchTerm(trimmed);
    onSearch(trimmed);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === KEY_CODES.ENTER) {
      handleSearch();
    }
  };

  useEffect(() => {
    setInputValue(searchTerm);
  }, [searchTerm]);

  return (
    <div className="flex w-[95%] gap-2">
      <input
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={PLACEHOLDER}
        className="w-full p-2 border rounded"
      />
      <button
        onClick={handleSearch}
        className="cursor-pointer dark:text-[var(--color-black)] px-4 py-2 bg-[var(--color-gray-300)] rounded hover:bg-[var(--color-gray-400)] hover:text-[var(--color-white)] transition-all duration-300"
        type="button"
      >
        {SEARCH_BUTTON}
      </button>
    </div>
  );
}
