import Link from 'next/link';
import { getCompanyInfo, listPackages } from '@/lib/api';
import { SectionHeader } from '../ui/SectionHeader';
import { Icon } from '../icons/Icon';
import { PackagesBentoGrid, BENTO_GRID_SIZE } from './PackagesBentoGrid';

export async function FeaturedPackages() {
  const [company, { data: packages }] = await Promise.all([
    getCompanyInfo(),
    // Capped to BENTO_GRID_SIZE (matches the bento pattern's cycle length) so
    // the grid always ends on a clean row, regardless of how many featured
    // packages exist in the backend.
    listPackages({ isFeatured: true, pageSize: BENTO_GRID_SIZE }),
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

        <PackagesBentoGrid packages={packages} currency={company.currency} />

        <div className="text-center mt-8 d-lg-none">
          <Link href="/packages" className="btn btn-secondary">
            View All Packages
          </Link>
        </div>
      </div>
    </section>
  );
}
