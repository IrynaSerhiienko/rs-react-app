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
    <div className="flex w-[75%] gap-2">
      <input
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Search..."
        className="w-full p-2 border rounded"
      />
      <button
        onClick={handleSearch}
        className="cursor-pointer btn-app"
        type="button"
      >
        Search
      </button>
    </div>
  );
}
