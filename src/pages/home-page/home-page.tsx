import { useCallback, useEffect, useRef, useState } from 'react';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';

import { Pagination } from '@/components/pagination/pagination';

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
  const [totalPages, setTotalPages] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = searchParams.get('page');
  const page = pageParam ? parseInt(pageParam, 10) : 1;

  const prevSearchTerm = useRef<string>(searchTerm);

  const navigate = useNavigate();

  const onCardClick = (id: number) => {
    navigate(`details/${id}`);
  };

  useEffect(() => {
    if (searchTerm !== prevSearchTerm.current) {
      prevSearchTerm.current = searchTerm;
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        if (params.get('page') !== '1') {
          params.set('page', '1');
          return params;
        }
        return prev;
      });
    }
  }, [searchTerm, setSearchParams]);

  const handleSearch = useCallback(async (term: string, currentPage = 1) => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetchCharacters({ name: term, page: currentPage });
      localStorage.setItem('searchTerm', term);
      setData(res.results);
      setTotalPages(res.info.pages);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Something went wrong';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    handleSearch(searchTerm || '', page);
  }, [searchTerm, page, handleSearch]);

  useEffect(() => {
    const savedTerm = localStorage.getItem('searchTerm') || '';
    if (!searchTerm && savedTerm) {
      setSearchTerm(savedTerm);
    }
  }, [searchTerm, setSearchTerm]);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', newPage.toString());
    setSearchParams(params);
  };

  return (
    <>
      <Title
        level={1}
        className="text-2xl md:text-3xl font-bold flex mb-12 justify-center"
      >
        Rick and Morty Search
      </Title>

      <Search />

      {!error && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      <div className="flex gap-6">
        <div className="flex-1">
          <div>
            {loading && (
              <p className="text-lg font-semibold p-3 animate-pulse text-center">
                Loading...
              </p>
            )}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && !error && (
              <CardList items={data} onCardClick={onCardClick} />
            )}
          </div>
        </div>

        <div className="w-1/3 pl-6">
          <Outlet />
        </div>
      </div>
    </>
  );
}
