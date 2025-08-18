'use client';

import { RefreshCw } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { lazy, Suspense, useEffect, useState } from 'react';

import { CardList } from '../../components/card-list/card-list';
import { Flyout } from '../../components/flyout/flyout';
import { Pagination } from '../../components/pagination/pagination';
import { Search } from '../../components/search/search';
import { Spinner } from '../../components/spinner/spinner';
import { useGetCharactersQuery } from '../../store/api/characters-api';
import { Character } from '../../types/types';
import { getErrorMessage } from '../../utils/get-error-message';

const CharacterDetails = lazy(
  () =>
    import(
      '../../components/card-list/card/character-details/character-details'
    )
);

interface HomeData {
  TITLE: string;
}

interface HomePageContentProps {
  homeData: HomeData;
  serverData: { results: Character[]; info: { pages: number } };
  initialPage: number;
  initialSearchTerm: string;
}

export function HomePageContent({
  homeData,
  serverData,
  initialPage,
  initialSearchTerm,
}: HomePageContentProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [page, setPage] = useState(initialPage);
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [useServerData, setUseServerData] = useState(true);

  const { data, error, isFetching, refetch } = useGetCharactersQuery(
    { page, name: searchTerm },
    { skip: useServerData }
  );

  const detailsId = searchParams?.get('details');

  const currentData = useServerData ? serverData : data;

  useEffect(() => {
    setUseServerData(false);
  }, []);

  const handleOpenDetails = (id: number) => {
    const params = new URLSearchParams();
    params.set('page', page.toString());
    params.set('details', id.toString());
    router.push(`/?${params.toString()}`);
  };

  const handleCloseDetails = () => {
    const params = new URLSearchParams();
    params.set('page', page.toString());
    router.push(`/?${params.toString()}`);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    const params = new URLSearchParams();
    params.set('page', newPage.toString());
    const details = searchParams?.get('details');
    if (details) params.set('details', details);
    router.push(`/?${params.toString()}`);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setPage(1);
    const params = new URLSearchParams();
    params.set('page', '1');
    params.set('name', term);
    router.push(`/?${params.toString()}`);
  };

  return (
    <div>
      <h1 className="flex justify-center mt-8 mb-12 text-2xl md:text-4xl font-bold">
        {homeData.TITLE}
      </h1>

      <div className="flex gap-4 mb-4">
        <Search
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearch={handleSearch}
        />
        <button
          onClick={refetch}
          title="You can refresh again after 1 minute"
          className="w-[5%] cursor-pointer dark:text-[var(--color-black)] flex justify-center items-center bg-[var(--color-gray-300)] rounded hover:bg-[var(--color-gray-400)] hover:text-[var(--color-white)] transition-all duration-300"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>

      {!error && (
        <Pagination
          currentPage={page}
          totalPages={currentData?.info.pages ?? 1}
          onPageChange={handlePageChange}
        />
      )}

      <div className="flex gap-6 mb-20">
        <div className={detailsId ? 'w-1/2' : 'w-full'}>
          <div>
            {isFetching && <Spinner />}
            {error && (
              <p className="flex justify-center m-4 text-red-500 text-xl md:text-2xl font-semibold">
                {getErrorMessage(error as Error)}
              </p>
            )}
            {!isFetching && currentData && (
              <CardList
                items={currentData.results}
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
