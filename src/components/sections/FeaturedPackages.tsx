import Link from 'next/link';
import { getCompanyInfo, listPackages } from '@/lib/api';
import { PackageCard } from '../ui/PackageCard';
import { SectionHeader } from '../ui/SectionHeader';
import { Pagination } from '../ui/Pagination';
import { HorizontalScroller } from '../ui/HorizontalScroller';
import { Icon } from '../icons/Icon';

const PAGE_SIZE = 8;

export async function FeaturedPackages({ page }: { page: number }) {
  const [company, { data: packages, meta }] = await Promise.all([
    getCompanyInfo(),
    listPackages({ isFeatured: true, page, pageSize: PAGE_SIZE }),
  ]);

  if (packages.length === 0) {
    return null;
  }

  return (
    <section className="py-16">
      <div className="container">
        <SectionHeader
          eyebrow=""
          title="Top Holiday Packages"
          subtitle="Handpicked packages for your next adventure"
          action={
            <Link href="/packages" className="btn btn-outline-secondary">
              View All Packages <Icon name="arrow-right" className="icon icon--sm" />
            </Link>
          }
        />

        <div className="d-sm-none">
          <HorizontalScroller>
            {packages.map((pkg) => (
              <div key={pkg.id} className="flex-shrink-0" style={{ width: '100%', scrollSnapAlign: 'start' }}>
                <PackageCard pkg={pkg} currency={company.currency} />
              </div>
            ))}
          </HorizontalScroller>
        </div>

        <div className="d-none d-sm-block">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4">
            {packages.map((pkg) => (
              <div className="col" key={pkg.id}>
                <PackageCard pkg={pkg} currency={company.currency} />
              </div>
            ))}
          </div>

          <Pagination basePath="/" currentParams={{}} page={meta.page} totalPages={meta.totalPages} />
        </div>

        <div className="text-center mt-8 d-lg-none">
          <Link href="/packages" className="btn btn-secondary">
            View All Packages
          </Link>
        </div>
      </div>
    </section>
  );
}
