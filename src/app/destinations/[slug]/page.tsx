import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getCompanyInfo, getDestinationBySlug, listPackages } from '@/lib/api';
import { resolveImageUrl } from '@/lib/image-url';
import { sanitizeRichText } from '@/lib/sanitize';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { PackageCard } from '@/components/ui/PackageCard';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Icon } from '@/components/icons/Icon';

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

  return (
    <>
      <section className="destination-hero position-relative overflow-hidden">
        <div className="position-absolute top-0 start-0 w-100 h-100">
          {destination.imageUrl ? (
            <Image
              className="object-fit-cover"
              src={resolveImageUrl(destination.imageUrl)}
              alt={destination.name}
              fill
              priority
              sizes="100vw"
            />
          ) : (
            <ImagePlaceholder label={destination.name} />
          )}
          <div className="position-absolute top-0 start-0 w-100 h-100 img-overlay-scrim" />
        </div>
        <div className="container position-relative py-10 text-white d-flex flex-column justify-content-center" style={{ minHeight: 'inherit' }}>
          <Breadcrumbs
            light
            items={[
              { label: 'Home', href: '/' },
              { label: 'Destinations', href: '/destinations' },
              { label: destination.name },
            ]}
          />
          <span className="badge bg-white text-primary rounded-pill fw-semibold mt-3 mb-2 align-self-start px-3 py-2">
            <Icon name="globe" className="icon icon--sm me-1" style={{ verticalAlign: '-2px' }} />
            {destination.country}
          </span>
          <h1 className="text-white display-5 fw-bold mb-0">{destination.name}</h1>
        </div>
      </section>

      <div className="container py-16">
        <div className="row g-5">
          <div className="col-12 col-lg-8">
            <SectionHeader eyebrow="Overview" title={`About ${destination.name}`} />
            {destination.description ? (
              <div
                className="rich-text"
                dangerouslySetInnerHTML={{ __html: sanitizeRichText(destination.description) }}
              />
            ) : (
              <p className="text-muted">
                {destination.name} is located in {destination.country}. {company.name} offers{' '}
                {meta.total} holiday package{meta.total === 1 ? '' : 's'} featuring this destination.
              </p>
            )}

            <div className="mt-10">
              <SectionHeader
                eyebrow="Handpicked For You"
                title={packages.length > 0 ? `${meta.total === 1 ? 'Package' : 'Packages'} Featuring ${destination.name}` : 'No Packages Yet'}
              />
              {packages.length > 0 ? (
                <div className="row row-cols-1 row-cols-sm-2 g-4">
                  {packages.map((pkg) => (
                    <div className="col" key={pkg.id}>
                      <PackageCard pkg={pkg} currency={company.currency} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 bg-light rounded-3">
                  <Icon name="compass" className="icon icon--lg text-muted mb-3" />
                  <h3 className="fs-5">No packages here just yet</h3>
                  <p className="text-muted mb-3">Check back soon, or explore everything else on offer.</p>
                  <Link href="/packages" className="btn btn-outline-primary">
                    Browse All Packages
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div className="col-12 col-lg-4">
            <div className="card border-0 shadow-sm p-4 sticky-top" style={{ top: 'calc(1.5rem + 76px)', zIndex: 1 }}>
              <div
                className="d-inline-flex align-items-center justify-content-center rounded-circle bg-primary-subtle text-primary mb-3"
                style={{ width: 48, height: 48 }}
              >
                <Icon name="compass" />
              </div>
              <h3 className="fs-5 mb-2">Plan Your Trip to {destination.name}</h3>
              <p className="text-muted small mb-4">
                {meta.total} handpicked holiday package{meta.total === 1 ? '' : 's'} for {destination.name}, curated by {company.name}.
              </p>
              <Link href={`/packages?destinationId=${destination.id}`} className="btn btn-primary rounded-pill w-100 mb-2">
                Browse {destination.name} Packages
              </Link>
              <Link href="/contact" className="btn btn-outline-secondary rounded-pill w-100">
                Talk to an Expert
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
