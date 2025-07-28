import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { fetchCharacters } from '../../api/api';
import { CardList } from '../../components/card-list/card-list';
import { CharacterDetails } from '../../components/character-details/character-details';
import { Pagination } from '../../components/pagination/pagination';
import { Search } from '../../components/search/search';
import { Title } from '../../components/title/title';
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

  const onCardClick = (id: number) => {
    const params = new URLSearchParams();
    params.set('page', page.toString());
    params.set('details', id.toString());
    navigate({ search: params.toString() });
  };

  const closeDetails = () => {
    const params = new URLSearchParams();
    params.set('page', page.toString());
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

  useEffect(() => {
    handleSearch(searchTerm || '', page);
  }, [searchTerm, page, handleSearch]);

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

  const detailsId = searchParams.get('details');

  return (
    <>
      <Title
        level={1}
        className="text-2xl md:text-3xl font-bold flex mb-12 justify-center"
      >
        Rick and Morty Search
      </Title>

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

      <div className="flex gap-6 mb-10">
        <div className={detailsId ? 'flex-1' : 'w-full'}>
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

        {detailsId && (
          <div className="w-1/3 pl-6">
            <CharacterDetails id={detailsId} onClose={closeDetails} />
          </div>
        )}
      </div>
    </>
  );
}
