import Link from 'next/link';

export interface Breadcrumb {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items, light = false }: { items: Breadcrumb[]; light?: boolean }) {
  return (
    <nav aria-label="Breadcrumb" className={light ? 'breadcrumb-light' : undefined}>
      <ol className="breadcrumb mb-0">
        {items.map((item) =>
          item.href ? (
            <li className="breadcrumb-item" key={item.label}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ) : (
            <li className="breadcrumb-item active" aria-current="page" key={item.label}>
              {item.label}
            </li>
          ),
        )}
      </ol>
    </nav>
  );
}
