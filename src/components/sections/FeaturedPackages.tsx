import Link from 'next/link';
import { getCompanyInfo, listPackages } from '@/lib/api';
import { PackageCard } from '../ui/PackageCard';
import { SectionHeader } from '../ui/SectionHeader';
import { Icon } from '../icons/Icon';

export async function FeaturedPackages() {
  const company = await getCompanyInfo();

  let { data: packages } = await listPackages({ isFeatured: true, pageSize: 4 });
  if (packages.length === 0) {
    ({ data: packages } = await listPackages({ pageSize: 4 }));
  }

  if (packages.length === 0) {
    return null;
  }

  return (
    <section className="py-16">
      <div className="container">
        <SectionHeader
          eyebrow="Handpicked for you"
          title="Top Holiday Packages"
          subtitle="Handpicked packages for your next adventure"
          action={
            <Link href="/packages" className="btn btn-outline-secondary">
              View All Packages <Icon name="arrow-right" className="icon icon--sm" />
            </Link>
          }
        />

        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4">
          {packages.map((pkg) => (
            <div className="col" key={pkg.id}>
              <PackageCard pkg={pkg} currency={company.currency} />
            </div>
          ))}
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
