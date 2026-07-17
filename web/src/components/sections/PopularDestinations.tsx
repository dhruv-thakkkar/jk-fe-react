import Link from 'next/link';
import { listDestinations } from '@/lib/api';
import { DestinationCard } from '../ui/DestinationCard';
import { SectionHeader } from '../ui/SectionHeader';
import { Icon } from '../icons/Icon';

export async function PopularDestinations() {
  const destinations = await listDestinations();

  if (destinations.length === 0) {
    return null;
  }

  const featured = destinations.slice(0, 5);

  return (
    <section className="py-16 bg-light">
      <div className="container">
        <SectionHeader
          eyebrow="Where to next"
          title="Popular Destinations"
          subtitle="Explore top destinations around the world"
          action={
            <Link href="/destinations" className="btn btn-outline-secondary">
              View All <Icon name="arrow-right" className="icon icon--sm" />
            </Link>
          }
        />

        <div className="row row-cols-2 row-cols-md-3 row-cols-lg-5 g-4">
          {featured.map((destination) => (
            <div className="col" key={destination.id}>
              <DestinationCard destination={destination} />
            </div>
          ))}
        </div>
        <div className="text-center mt-8 d-lg-none">
          <Link href="/destinations" className="btn btn-secondary">
            View All Destinations
          </Link>
        </div>
      </div>
    </section>
  );
}
