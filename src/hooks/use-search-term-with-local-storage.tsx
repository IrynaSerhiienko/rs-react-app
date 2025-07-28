import { useEffect, useState } from 'react';

export function useSearchTermWithLocalStorage() {
  const [searchTerm, setSearchTerm] = useState(() => {
    return localStorage.getItem('searchTerm') || '';
  });

  useEffect(() => {
    localStorage.setItem('searchTerm', searchTerm);
  }, [searchTerm]);

  return { searchTerm, setSearchTerm };
}
