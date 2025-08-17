import { AboutPageContent } from '../../../components/about-page-content/about-page-content';
import { ClientProviders } from '../../../components/client-providers/client-providers';
import { getAboutDataServer } from '../../../data/server/get-about-data-server';

export default async function AboutPage({
  params,
}: {
  params: { locale: string };
}) {
  const aboutData = await getAboutDataServer(params.locale);

  return (
    <ClientProviders>
      <AboutPageContent about={aboutData} />
    </ClientProviders>
  );
}
