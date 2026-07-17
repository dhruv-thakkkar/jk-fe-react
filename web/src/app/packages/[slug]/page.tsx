import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCompanyInfo, getPackage } from '@/lib/api';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { PackageGallery } from '@/components/ui/PackageGallery';
import { WishlistButton } from '@/components/ui/WishlistButton';
import { Icon } from '@/components/icons/Icon';
import { formatDuration, formatPrice } from '@/lib/format';

type Params = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pkg = await getPackage(slug);

  if (!pkg) {
    return { title: 'Package Not Found' };
  }

  return {
    title: pkg.metaTitle ?? pkg.title,
    description: pkg.metaDescription ?? pkg.shortDescription ?? undefined,
  };
}

export default async function PackageDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const [pkg, company] = await Promise.all([getPackage(slug), getCompanyInfo()]);

  if (!pkg) {
    notFound();
  }

  const hasItinerary = pkg.itinerary.length > 0;
  const hasInclusions = pkg.inclusions.length > 0;
  const hasExclusions = pkg.exclusions.length > 0;
  const hasDestinations = pkg.destinations.length > 0;

  return (
    <>
      <div className="container mt-8">
        <Breadcrumbs
          items={[{ label: 'Home', href: '/' }, { label: 'Packages', href: '/packages' }, { label: pkg.title }]}
        />
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mt-4">
          <div>
            <h1 className="mb-2">{pkg.title}</h1>
            <div className="d-flex align-items-center gap-3 flex-wrap">
              <span className="text-muted">
                <Icon name="calendar" className="icon icon--sm" />{' '}
                {formatDuration(pkg.durationDays, pkg.durationNights)}
              </span>
              {pkg.category && <span className="badge bg-info-subtle text-info-emphasis">{pkg.category.name}</span>}
            </div>
          </div>
          <div className="d-flex gap-2">
            <WishlistButton className="btn btn-outline-secondary" label={`Save ${pkg.title} to wishlist`} />
            <Link href={`/contact?package=${pkg.slug}`} className="btn btn-primary d-none d-lg-inline-block">
              Enquire Now
            </Link>
          </div>
        </div>
      </div>

      <div className="container py-16">
        <div className="row g-4">
          <div className="col-12 col-lg-8">
            <PackageGallery images={pkg.images} title={pkg.title} slug={pkg.slug} />

            <div className="mt-8">
              <h2 className="fs-4">Overview</h2>
              <p className="mt-3">
                {pkg.description ??
                  pkg.shortDescription ??
                  `Experience ${pkg.title}, a ${formatDuration(pkg.durationDays, pkg.durationNights)} package crafted by ${company.name}.`}
              </p>

              {hasDestinations && (
                <>
                  <h3 className="mt-4 fs-5">Destinations Covered</h3>
                  <div className="d-flex gap-2 mt-3 flex-wrap">
                    {pkg.destinations.map((link) => (
                      <Link
                        key={link.id}
                        href={`/destinations/${link.destination.slug}`}
                        className="badge bg-info-subtle text-info-emphasis text-decoration-none"
                      >
                        <Icon name="map-pin" className="icon icon--sm" /> {link.destination.name}
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>

            {hasItinerary && (
              <div className="mt-8">
                <h2 className="fs-4">Itinerary</h2>
                <div className="d-flex flex-column gap-3 mt-3">
                  {pkg.itinerary.map((day) => (
                    <div key={day.id} className="card p-4">
                      <h3 className="fs-6 mb-0">
                        Day {day.dayNumber} — {day.title}
                      </h3>
                      {day.description && <p className="mt-2 mb-0">{day.description}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {(hasInclusions || hasExclusions) && (
              <div className="mt-8 row g-4">
                {hasInclusions && (
                  <div className="col-12 col-md-6">
                    <h2 className="fs-4">Inclusions</h2>
                    <ul className="list-unstyled mt-3 d-flex flex-column gap-2">
                      {pkg.inclusions.map((item) => (
                        <li key={item.id} className="d-flex align-items-center gap-2">
                          <Icon name="check" className="icon icon--sm text-success" /> {item.itemText}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {hasExclusions && (
                  <div className="col-12 col-md-6">
                    <h2 className="fs-4">Exclusions</h2>
                    <ul className="list-unstyled mt-3 d-flex flex-column gap-2">
                      {pkg.exclusions.map((item) => (
                        <li key={item.id} className="d-flex align-items-center gap-2">
                          <Icon name="close" className="icon icon--sm text-danger" /> {item.itemText}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="col-12 col-lg-4">
            <div className="card p-4 sticky-top" style={{ top: 'calc(1.5rem + 76px)' }}>
              <div className="d-flex align-items-baseline gap-2">
                <span className="fs-2 fw-bold">{formatPrice(pkg.priceAdult, company.currency)}</span>
                <span className="text-muted">/ adult</span>
              </div>
              {pkg.priceChild && (
                <p className="text-muted small mt-2 mb-0">
                  Child: {formatPrice(pkg.priceChild, company.currency)}
                </p>
              )}

              <Link href={`/contact?package=${pkg.slug}`} className="btn btn-primary w-100 mt-4">
                Enquire Now
              </Link>

              <dl className="row mt-4 mb-0 small">
                {pkg.category && (
                  <>
                    <dt className="col-6 text-muted fw-normal">Category</dt>
                    <dd className="col-6 text-end fw-semibold">{pkg.category.name}</dd>
                  </>
                )}
                <dt className="col-6 text-muted fw-normal">Duration</dt>
                <dd className="col-6 text-end fw-semibold">
                  {formatDuration(pkg.durationDays, pkg.durationNights)}
                </dd>
                {hasDestinations && (
                  <>
                    <dt className="col-6 text-muted fw-normal">Destinations</dt>
                    <dd className="col-6 text-end fw-semibold">{pkg.destinations.length}</dd>
                  </>
                )}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
