import Link from 'next/link';
import { Icon } from '../icons/Icon';

interface PaginationProps {
  basePath: string;
  currentParams: Record<string, string | undefined>;
  page: number;
  totalPages: number;
}

function hrefForPage(basePath: string, currentParams: Record<string, string | undefined>, page: number) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(currentParams)) {
    if (value) params.set(key, value);
  }
  params.set('page', String(page));
  return `${basePath}?${params.toString()}`;
}

export function Pagination({ basePath, currentParams, page, totalPages }: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav aria-label="Pagination" className="mt-8">
      <ul className="pagination justify-content-center">
        <li className={`page-item${page <= 1 ? ' disabled' : ''}`}>
          <Link
            className="page-link"
            href={hrefForPage(basePath, currentParams, page - 1)}
            aria-label="Previous page"
            tabIndex={page <= 1 ? -1 : undefined}
          >
            <Icon name="chevron-left" className="icon icon--sm" />
          </Link>
        </li>

        {pageNumbers.map((pageNumber) => (
          <li key={pageNumber} className={`page-item${pageNumber === page ? ' active' : ''}`}>
            <Link
              className="page-link"
              href={hrefForPage(basePath, currentParams, pageNumber)}
              aria-current={pageNumber === page ? 'page' : undefined}
            >
              {pageNumber}
            </Link>
          </li>
        ))}

        <li className={`page-item${page >= totalPages ? ' disabled' : ''}`}>
          <Link
            className="page-link"
            href={hrefForPage(basePath, currentParams, page + 1)}
            aria-label="Next page"
            tabIndex={page >= totalPages ? -1 : undefined}
          >
            <Icon name="chevron-right" className="icon icon--sm" />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
