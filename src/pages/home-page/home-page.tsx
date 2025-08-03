import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { fetchCharacters } from '../../api/api';
import { CardList } from '../../components/card-list/card-list';
import { CharacterDetails } from '../../components/character-details/character-details';
import { Flyout } from '../../components/flyout/flyout';
import { Pagination } from '../../components/pagination/pagination';
import { Search } from '../../components/search/search';
import { TITLES } from '../../data/app-data';
import { usePageWithLocalStorage } from '../../hooks/use-page-with-local-storage';
import { useSearchTermWithLocalStorage } from '../../hooks/use-search-term-with-local-storage';
import type { Character } from '../../types/types';

export function HomePage() {
  const { searchTerm, setSearchTerm } = useSearchTermWithLocalStorage();
  const { page, setPage } = usePageWithLocalStorage();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Character[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();
  const prevSearchTerm = useRef(searchTerm);
  const navigate = useNavigate();

  const handleOpenDetails = (id: number) => {
    const params = new URLSearchParams();
    params.set('page', page.toString());
    params.set('details', id.toString());
    navigate({ search: params.toString() });
  };

  const handleCloseDetails = () => {
    const params = new URLSearchParams();
    params.set('page', page.toString());
    setSearchParams(params);
  };

  const handleSearch = useCallback(async (term: string, currentPage = 1) => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetchCharacters({ name: term, page: currentPage });
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

  const handlePageChange = (newPage: number) => {
    setPage(newPage);

    const params = new URLSearchParams();
    params.set('page', newPage.toString());
    const details = searchParams.get('details');
    if (details) {
      params.set('details', details);
    }

    setSearchParams(params);
  };

  useEffect(() => {
    if (searchTerm !== prevSearchTerm.current) {
      prevSearchTerm.current = searchTerm;
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        if (params.get('page') !== '1') {
          params.set('page', '1');
          setPage(1);
          return params;
        }
        return prev;
      });
    }
  }, [searchTerm, setSearchParams, setPage]);

  useEffect(() => {
    handleSearch(searchTerm || '', page);
  }, [searchTerm, page, handleSearch]);

  const detailsId = searchParams.get('details');

  return (
    <div>
      <h1 className="h1-app flex mb-12 mt-8 justify-center">{TITLES.HOME}</h1>
      <Search
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearch={(term: string) => {
          setSearchTerm(term);
          setPage(1);
          handleSearch(term, 1);
        }}
      />

      {!error && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      <div className="flex gap-6 mb-20">
        <div className={detailsId ? 'w-1/2' : 'w-full'}>
          <div>
            {loading && (
              <p className="text-lg font-semibold p-3 animate-pulse text-center">
                Loading...
              </p>
            )}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && !error && (
              <CardList items={data} onOpenDetails={handleOpenDetails} />
            )}
          </div>
        </div>

        {detailsId && (
          <div className="w-1/2">
            <CharacterDetails id={detailsId} onClose={handleCloseDetails} />
          </div>
        )}
      </div>
      <Flyout />
    </div>
  );
}
