import Image from 'next/image';
import Link from 'next/link';
import { listDestinations } from '@/lib/api';
import { HeroSearchForm } from './HeroSearchForm';

/**
 * Static hero tiles — not tied to destination/package data. Drop images in
 * public/images/hero/ and edit this array (image, title, subtitle, href) to change what shows.
 */
const HERO_TILES = [
  { image: '/images/hero/most_family_friendly_beach_vacation_destinations.jpg', title: 'Beach Getaways', subtitle: 'Sun, sand & sea', href: '/packages' },
  { image: '/images/hero/hot-air-balloons-1867279-scaled.jpg', title: 'Adventure Travel', subtitle: 'Chase the horizon', href: '/packages' },
  { image: '/images/hero/jumbo-passes-v.jpg', title: 'Mountain Passes', subtitle: 'Trek the peaks', href: '/packages' },
  { image: '/images/hero/honeymoon-destination-7.jpg', title: 'Honeymoon Escapes', subtitle: 'Made for two', href: '/packages' },
];

export async function Hero() {
  const destinations = await listDestinations();

  return (
    <section className="py-16 hero-section">
      <div className="container position-relative">
        <div className="row g-5 align-items-center">
          <div className="col-12 col-lg-6">
            <span className="badge rounded-pill bg-primary-subtle text-primary-emphasis small fw-semibold px-3 py-2 mb-3">
              {destinations.length}+ Destinations Worldwide
            </span>
            <h1 className="display-5 fw-bold">Explore the World, Discover New Places</h1>
            <p className="text-muted fs-5 mt-3" style={{ lineHeight: 1.7, maxWidth: 480 }}>
              Find the best holiday packages for your perfect vacation.
            </p>

            <div className="mt-4" style={{ maxWidth: 560 }}>
              <HeroSearchForm destinations={destinations} />
            </div>
          </div>

          <div className="col-12 col-lg-6">
            <div className="hero-tile-grid">
              {HERO_TILES.map((tile, index) => (
                <Link
                  key={tile.title}
                  href={tile.href}
                  className={`hero-tile${index % 2 === 1 ? ' hero-tile--offset' : ''}`}
                >
                  <Image
                    src={tile.image}
                    alt={tile.title}
                    fill
                    sizes="(min-width: 992px) 25vw, 50vw"
                    style={{ objectFit: 'cover' }}
                    priority={index < 2}
                  />
                  <div className="position-absolute bottom-0 start-0 w-100 p-3 text-white img-overlay-scrim">
                    <div className="fw-semibold text-white">{tile.title}</div>
                    <div className="small">{tile.subtitle}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
