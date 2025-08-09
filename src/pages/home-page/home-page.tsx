import { lazy, Suspense, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { CardList } from '../../components/card-list/card-list';
import { Flyout } from '../../components/flyout/flyout';
import { Pagination } from '../../components/pagination/pagination';
import { Search } from '../../components/search/search';
import { Spinner } from '../../components/spinner/spinner';
import { TITLES } from '../../data/app-data';
import { usePageWithLocalStorage } from '../../hooks/use-page-with-local-storage';
import { useSearchTermWithLocalStorage } from '../../hooks/use-search-term-with-local-storage';
import { useGetCharactersQuery } from '../../store/api/characters-api';
import { getErrorMessage } from '../../utils/get-error-message';

const CharacterDetails = lazy(
  () => import('../../components/character-details/character-details')
);

export function HomePage() {
  const { searchTerm, setSearchTerm } = useSearchTermWithLocalStorage();
  const { page, setPage } = usePageWithLocalStorage();
  const { data, error, isLoading, refetch } = useGetCharactersQuery({
    name: searchTerm || '',
    page,
  });

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

  const detailsId = searchParams.get('details');

  return (
    <div>
      <h1 className="flex justify-center mt-8 mb-12 h1-app">{TITLES.HOME}</h1>
      <div className="flex gap-8 mb-4">
        <Search
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearch={(term: string) => {
            setSearchTerm(term);
            setPage(1);
          }}
        />
        <button
          onClick={() => refetch()}
          className="w-1/4 cursor-pointer btn-app"
        >
          Refresh
        </button>
      </div>

      {!error && (
        <Pagination
          currentPage={page}
          totalPages={data?.info.pages ?? 1}
          onPageChange={handlePageChange}
        />
      )}

      <div className="flex gap-6 mb-20">
        <div className={detailsId ? 'w-1/2' : 'w-full'}>
          <div>
            {isLoading && <Spinner />}
            {error && <p className="text-red-500">{getErrorMessage(error)}</p>}
            {!isLoading && !error && data && (
              <CardList
                items={data.results}
                onOpenDetails={handleOpenDetails}
              />
            )}
          </div>
        </div>

        {detailsId && (
          <div className="w-1/2">
            <Suspense fallback={<Spinner />}>
              <CharacterDetails id={detailsId} onClose={handleCloseDetails} />
            </Suspense>
          </div>
        )}
      </div>
      <Flyout />
    </div>
  );
}
