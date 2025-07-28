import type { ChangeEvent, KeyboardEvent } from 'react';
import { useEffect, useState } from 'react';

import { useSearch } from '../../context/search-context';

export function Search() {
  const { searchTerm, setSearchTerm } = useSearch();

  const [inputValue, setInputValue] = useState(() => {
    return localStorage.getItem('searchTerm') || '';
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const doSearch = () => {
    const trimmed = inputValue.trim();
    localStorage.setItem('searchTerm', trimmed);
    setSearchTerm(trimmed);
    // setInputValue('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      doSearch();
    }
  };

  useEffect(() => {
    setInputValue(searchTerm);
  }, [searchTerm]);

  return (
    <div className="flex space-x-2 mb-4">
      <input
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Search..."
        className="p-2 border rounded w-full"
      />
      <button
        onClick={doSearch}
        className="	px-4 py-2 bg-gray-300 rounded cursor-pointer hover:bg-gray-400 hover:text-white transition-all duration-300"
        type="button"
      >
        Search
      </button>
    </div>
  );
}
