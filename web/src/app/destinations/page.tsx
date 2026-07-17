import type { Metadata } from 'next';
import { getCompanyInfo, listDestinations } from '@/lib/api';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { DestinationCard } from '@/components/ui/DestinationCard';

export const metadata: Metadata = {
  title: 'Destinations',
};

export default async function DestinationsPage() {
  const [company, destinations] = await Promise.all([getCompanyInfo(), listDestinations()]);

  return (
    <>
      <div className="container mt-8">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Destinations' }]} />
        <h1 className="mt-4">Destinations</h1>
        <p style={{ maxWidth: '60ch' }}>
          Explore all the places {company.name} travels to and find holiday packages tailored to
          each destination.
        </p>
      </div>

      <div className="container py-16">
        <div className="row row-cols-2 row-cols-sm-3 row-cols-lg-4 g-4">
          {destinations.map((destination) => (
            <div className="col" key={destination.id}>
              <DestinationCard destination={destination} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
