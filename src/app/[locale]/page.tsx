import { ClientProviders } from '../../components/client-providers/client-providers';
import { HomePageContent } from '../../components/home-page-content/home-page-content';
import { CHARACTERS_API } from '../../data/app-data';
import { getCharactersDataServer } from '../../data/server/get-characters-data-server';
import { getHomeDataServer } from '../../data/server/get-home-data-server';

export default async function HomePage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{ page?: string; name?: string }>;
}) {
  const { locale } = await params;
  const { page: newPage, name } = (await searchParams) || {};

  const page = Number(newPage || CHARACTERS_API.DEFAULT_PAGE);
  const searchTerm = name || CHARACTERS_API.DEFAULT_NAME;
  const homeData = await getHomeDataServer(locale);

  const serverData = await getCharactersDataServer({ name: searchTerm, page });

  return (
    <ClientProviders>
      <HomePageContent
        homeData={homeData}
        serverData={serverData}
        initialPage={page}
        initialSearchTerm={searchTerm}
      />
    </ClientProviders>
  );
}
