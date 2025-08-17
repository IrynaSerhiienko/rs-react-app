'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { lazy, Suspense, useEffect, useRef, useState } from 'react';

import { CardList } from '../../components/card-list/card-list';
import { Flyout } from '../../components/flyout/flyout';
import { Pagination } from '../../components/pagination/pagination';
import { Search } from '../../components/search/search';
import { Spinner } from '../../components/spinner/spinner';
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
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [page, setPage] = useState(initialPage);
  const [forceRefresh, setForceRefresh] = useState(false);
  const [data] = useState(serverData);
  const [error] = useState<Error | null>(null);

  const router = useRouter();

  const searchParams = useSearchParams();
  const prevSearchTerm = useRef(searchTerm);

  const handleRefresh = () => {
    setForceRefresh(true);
    setTimeout(() => setForceRefresh(false), 0);
  };

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
    if (details) {
      params.set('details', details);
    }

    router.push(`/?${params.toString()}`);
  };

  useEffect(() => {
    if (searchTerm !== prevSearchTerm.current) {
      prevSearchTerm.current = searchTerm;
      const params = new URLSearchParams();
      params.set('page', '1');
      router.push(`/?${params.toString()}`);
      setPage(1);
    }
  }, [searchTerm, router]);

  const detailsId = searchParams?.get('details');

  return (
    <div>
      <h1 className="flex justify-center mt-8 mb-12 text-2xl md:text-4xl font-bold">
        {homeData.TITLE}
      </h1>

      <div className="flex gap-4 mb-4">
        <Search
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearch={(term: string) => {
            setSearchTerm(term);
            setPage(1);
          }}
        />
        <button
          onClick={handleRefresh}
          title="You can refresh again after 1 minute"
          className="w-[25%] cursor-pointer dark:text-[var(--color-black)] px-4 py-2 bg-[var(--color-gray-300)] rounded hover:bg-[var(--color-gray-400)] hover:text-[var(--color-white)] transition-all duration-300"
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
            {forceRefresh && <Spinner />}
            {error && (
              <p className="flex justify-center m-4 text-red-500 text-xl md:text-2xl font-semibold">
                {getErrorMessage(error)}
              </p>
            )}
            {!forceRefresh && !error && data && (
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
