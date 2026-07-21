import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCompanyInfo, getDestinationBySlug, listPackages } from '@/lib/api';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { PackageCard } from '@/components/ui/PackageCard';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';

type Params = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const destination = await getDestinationBySlug(slug);

  if (!destination) {
    return { title: 'Destination Not Found' };
  }

  return { title: `${destination.name}, ${destination.country}` };
}

export default async function DestinationDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const destination = await getDestinationBySlug(slug);

  if (!destination) {
    notFound();
  }

  const [company, { data: packages, meta }] = await Promise.all([
    getCompanyInfo(),
    listPackages({ destinationId: destination.id, pageSize: 6 }),
  ]);

  const displayName = destination.stateRegion
    ? `${destination.name}, ${destination.stateRegion}`
    : destination.name;

  return (
    <>
      <section className="position-relative overflow-hidden" style={{ minHeight: 360 }}>
        <div className="position-absolute top-0 start-0 w-100 h-100">
          <ImagePlaceholder label={displayName} />
          <div className="position-absolute top-0 start-0 w-100 h-100 img-overlay-scrim" />
        </div>
        <div
          className="container position-relative py-10 text-white d-flex flex-column justify-content-center"
          style={{ minHeight: 360 }}
        >
          <Breadcrumbs
            light
            items={[
              { label: 'Home', href: '/' },
              { label: 'Destinations', href: '/destinations' },
              { label: displayName },
            ]}
          />
          <h1 className="text-white mt-3">{displayName}</h1>
          <p className="text-white-50 mb-0">
            Discover {destination.name}, {destination.country} — one of the destinations{' '}
            {company.name} travels to.
          </p>
        </div>
      </section>

      <div className="container py-16">
        <div className="row g-4">
          <div className="col-12 col-lg-8">
            <h2>About {destination.name}</h2>
            <p>
              {destination.name} is located in{' '}
              {destination.stateRegion ? `${destination.stateRegion}, ` : ''}
              {destination.country}. {company.name} offers {meta.total} holiday package
              {meta.total === 1 ? '' : 's'} featuring this destination.
            </p>

            {packages.length > 0 && (
              <>
                <h2 className="mt-8">
                  {meta.total === 1 ? 'Package' : 'Packages'} Featuring {destination.name}
                </h2>
                <div className="row row-cols-1 row-cols-sm-2 g-4 mt-1">
                  {packages.map((pkg) => (
                    <div className="col" key={pkg.id}>
                      <PackageCard pkg={pkg} currency={company.currency} />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="col-12 col-lg-4">
            <div className="card p-4 sticky-top" style={{ top: 'calc(1.5rem + 76px)', zIndex: 1 }}>
              <h3 className="fs-6 mb-3">Destination Facts</h3>
              <dl className="row mb-0 small">
                <dt className="col-6 text-muted fw-normal">Country</dt>
                <dd className="col-6 text-end fw-semibold">{destination.country}</dd>
                {destination.stateRegion && (
                  <>
                    <dt className="col-6 text-muted fw-normal">Region</dt>
                    <dd className="col-6 text-end fw-semibold">{destination.stateRegion}</dd>
                  </>
                )}
                <dt className="col-6 text-muted fw-normal">Packages Available</dt>
                <dd className="col-6 text-end fw-semibold">{meta.total}</dd>
              </dl>
              <Link href={`/packages?destinationId=${destination.id}`} className="btn btn-primary w-100 mt-3">
                Browse {destination.name} Packages
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
