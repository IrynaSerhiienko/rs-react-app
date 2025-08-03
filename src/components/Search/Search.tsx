import type { ChangeEvent, KeyboardEvent } from 'react';
import { useEffect, useState } from 'react';

type SearchProps = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onSearch: (term: string) => void;
};

export function Search({ searchTerm, setSearchTerm, onSearch }: SearchProps) {
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
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  useEffect(() => {
    setInputValue(searchTerm);
  }, [searchTerm]);

  return (
    <div className="flex gap-2 mb-4">
      <input
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Search..."
        className="p-2 border rounded w-full"
      />
      <button
        onClick={handleSearch}
        className="btn-app cursor-pointer"
        type="button"
      >
        Search
      </button>
    </div>
  );
}
