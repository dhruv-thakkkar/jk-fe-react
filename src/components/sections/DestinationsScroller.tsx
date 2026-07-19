import { listDestinations } from '@/lib/api';
import { SectionHeader } from '../ui/SectionHeader';
import { HorizontalScroller } from '../ui/HorizontalScroller';
import { ScrollCard } from '../ui/ScrollCard';

export async function DestinationsScroller() {
  const destinations = await listDestinations();

  if (destinations.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-light">
      <div className="container">
        <SectionHeader eyebrow="Where to next" title="Popular Destinations" subtitle="Explore the places our travelers love most" />
        <HorizontalScroller>
          {destinations.map((destination) => (
            <ScrollCard
              key={destination.id}
              href={`/destinations/${destination.slug}`}
              imageUrl={destination.imageUrl}
              title={destination.name}
              subtitle={destination.country}
            />
          ))}
        </HorizontalScroller>
      </div>
    </section>
  );
}
