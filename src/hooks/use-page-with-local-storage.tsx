import { useEffect, useState } from 'react';

export function usePageWithLocalStorage() {
  const [page, setPage] = useState(() => {
    const storedPage = localStorage.getItem('page');
    return storedPage ? Number(storedPage) : 1;
  });

  useEffect(() => {
    localStorage.setItem('page', page.toString());
  }, [page]);

  return { page, setPage };
}
