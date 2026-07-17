import type { Metadata } from 'next';
import Link from 'next/link';
import { getCompanyInfo, listPackages } from '@/lib/api';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Pagination } from '@/components/ui/Pagination';
import { PackageCard } from '@/components/ui/PackageCard';
import { PackagesFilterPanel } from '@/components/sections/PackagesFilterPanel';
import { Icon } from '@/components/icons/Icon';

export const metadata: Metadata = {
  title: 'Holiday Packages',
};

type SearchParams = { [key: string]: string | string[] | undefined };

function firstParam(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

const PAGE_SIZE = 8;

export default async function PackagesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const search = firstParam(params.search);
  const categoryId = firstParam(params.categoryId);
  const destinationId = firstParam(params.destinationId);
  const isFeatured = firstParam(params.isFeatured);
  const page = Number(firstParam(params.page) ?? '1') || 1;

  const [company, { data: packages, meta }] = await Promise.all([
    getCompanyInfo(),
    listPackages({
      search,
      categoryId,
      destinationId,
      isFeatured: isFeatured === 'true' ? true : undefined,
      page,
      pageSize: PAGE_SIZE,
    }),
  ]);

  return (
    <>
      <div className="container mt-8">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Packages' }]} />
        <h1 className="mt-4">Holiday Packages</h1>
      </div>

      <div className="container py-16">
        <div className="row g-4">
          <div className="col-12 col-lg-3">
            <PackagesFilterPanel
              search={search}
              categoryId={categoryId}
              destinationId={destinationId}
              isFeatured={isFeatured}
            />
          </div>

          <div className="col-12 col-lg-9">
            <p className="mb-4">
              <strong>{meta.total}</strong> Package{meta.total === 1 ? '' : 's'} Found
            </p>

            {packages.length > 0 ? (
              <div className="row row-cols-1 row-cols-md-2 g-4">
                {packages.map((pkg) => (
                  <div className="col" key={pkg.id}>
                    <PackageCard pkg={pkg} currency={company.currency} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Icon name="search" className="icon icon--lg text-muted mb-3" />
                <h3>No packages match your filters</h3>
                <p className="text-muted">Try removing a few filters to see more results.</p>
                <Link href="/packages" className="btn btn-primary">
                  Clear All Filters
                </Link>
              </div>
            )}

            <Pagination
              basePath="/packages"
              currentParams={{ search, categoryId, destinationId, isFeatured }}
              page={meta.page}
              totalPages={meta.totalPages}
            />
          </div>
        </div>
      </div>
    </>
  );
}
