import { useCallback, useEffect, useState } from 'react';

import { fetchCharacters } from '../../api/api';
import { CardList } from '../../components/card-list/card-list';
import { Search } from '../../components/search/search';
import { Title } from '../../components/title/title';
import { useSearch } from '../../context/search-context';
import type { Character } from '../../types/types';

export function HomePage() {
  const { searchTerm, setSearchTerm } = useSearch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Character[]>([]);

  const handleSearch = useCallback(
    async (term: string) => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetchCharacters(term);
        localStorage.setItem('searchTerm', term);
        setData(res.results);
        setSearchTerm(term);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Something went wrong';
        setError(message);
      } finally {
        setLoading(false);
      }
    },
    [setSearchTerm]
  );

  useEffect(() => {
    const init = async () => {
      const savedTerm = localStorage.getItem('searchTerm');

      if (savedTerm && !searchTerm) {
        setSearchTerm(savedTerm);
      } else if (!savedTerm && !searchTerm) {
        try {
          setLoading(true);
          setError(null);
          const res = await fetchCharacters();
          setData(res.results);
        } catch (err) {
          const message =
            err instanceof Error ? err.message : 'Something went wrong';
          setError(message);
        } finally {
          setLoading(false);
        }
      }
    };

    init();
  }, [searchTerm, setSearchTerm]);

  useEffect(() => {
    if (searchTerm) {
      handleSearch(searchTerm);
    }
  }, [searchTerm, handleSearch]);

  return (
    <>
      <Title
        level={1}
        className="text-2xl md:text-3xl font-bold flex mb-12 justify-center"
      >
        Rick and Morty Search
      </Title>

      <Search />

      <div>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && <CardList items={data} />}
      </div>
    </>
  );
}
