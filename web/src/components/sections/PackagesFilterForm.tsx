'use client';

import { useRouter } from 'next/navigation';
import type { Category, Destination } from '@/types/api';

interface PackagesFilterFormProps {
  search?: string;
  categoryId?: string;
  destinationId?: string;
  isFeatured?: string;
  categories: Category[];
  destinations: Destination[];
}

export function PackagesFilterForm({
  search,
  categoryId,
  destinationId,
  isFeatured,
  categories,
  destinations,
}: PackagesFilterFormProps) {
  const router = useRouter();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const params = new URLSearchParams();
    for (const key of ['search', 'categoryId', 'destinationId', 'isFeatured']) {
      const value = formData.get(key);
      if (value) params.set(key, String(value));
    }
    router.push(`/packages?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label small fw-semibold" htmlFor="filter-search">
          Keyword
        </label>
        <input
          className="form-control"
          type="text"
          id="filter-search"
          name="search"
          placeholder="Search packages…"
          defaultValue={search}
        />
      </div>

      <div className="mb-3">
        <label className="form-label small fw-semibold" htmlFor="filter-category">
          Category
        </label>
        <select className="form-select" id="filter-category" name="categoryId" defaultValue={categoryId ?? ''}>
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label small fw-semibold" htmlFor="filter-destination">
          Destination
        </label>
        <select
          className="form-select"
          id="filter-destination"
          name="destinationId"
          defaultValue={destinationId ?? ''}
        >
          <option value="">All Destinations</option>
          {destinations.map((destination) => (
            <option key={destination.id} value={destination.id}>
              {destination.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-check mb-4">
        <input
          className="form-check-input"
          type="checkbox"
          id="filter-featured"
          name="isFeatured"
          value="true"
          defaultChecked={isFeatured === 'true'}
        />
        <label className="form-check-label" htmlFor="filter-featured">
          Featured packages only
        </label>
      </div>

      <button type="submit" className="btn btn-primary w-100">
        Apply Filters
      </button>
    </form>
  );
}
