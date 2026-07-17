import Link from 'next/link';
import { listCategories, listDestinations } from '@/lib/api';
import { PackagesFilterForm } from './PackagesFilterForm';

interface PackagesFilterPanelProps {
  search?: string;
  categoryId?: string;
  destinationId?: string;
  isFeatured?: string;
}

export async function PackagesFilterPanel({
  search,
  categoryId,
  destinationId,
  isFeatured,
}: PackagesFilterPanelProps) {
  const [categories, destinations] = await Promise.all([listCategories(), listDestinations()]);

  return (
    <aside className="card p-4" aria-label="Filter packages">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fs-6 mb-0">Filter By</h2>
        <Link href="/packages" className="btn btn-link btn-sm text-decoration-none p-0">
          Clear All
        </Link>
      </div>

      <PackagesFilterForm
        search={search}
        categoryId={categoryId}
        destinationId={destinationId}
        isFeatured={isFeatured}
        categories={categories}
        destinations={destinations}
      />
    </aside>
  );
}
