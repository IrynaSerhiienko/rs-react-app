import { AboutPageContent } from '../../../components/about-page-content/about-page-content';
import { ClientProviders } from '../../../components/client-providers/client-providers';
import { useAboutDataServer } from '../../../data/server/use-about-data-server';

export default function AboutPage({ params }: { params: { locale: string } }) {
  const aboutData = useAboutDataServer(params.locale);
  return (
    <ClientProviders>
      <AboutPageContent about={aboutData} />
    </ClientProviders>
  );
}
