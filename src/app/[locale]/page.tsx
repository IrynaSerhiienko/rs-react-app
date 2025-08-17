import { ClientProviders } from '../../components/client-providers/client-providers';
import { HomePageContent } from '../../components/home-page-content/home-page-content';
import { CHARACTERS_API } from '../../data/app-data';
import { getCharactersDataServer } from '../../data/server/get-characters-data-server';
import { getHomeDataServer } from '../../data/server/get-home-data-server';

export default async function HomePage({
  params,
  searchParams,
}: {
  params: { locale: string };
  searchParams?: { page?: string; name?: string };
}) {
  const page = Number(searchParams?.page || CHARACTERS_API.DEFAULT_PAGE);
  const searchTerm = searchParams?.name || CHARACTERS_API.DEFAULT_NAME;
  const homeData = await getHomeDataServer(params.locale);

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
