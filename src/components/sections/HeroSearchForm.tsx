'use client';

import { useRouter } from 'next/navigation';
import { Icon } from '../icons/Icon';

export function HeroSearchForm() {
  const router = useRouter();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const search = new FormData(event.currentTarget).get('search');
    const params = new URLSearchParams();
    if (search) params.set('search', String(search));
    router.push(`/packages?${params.toString()}`);
  }

  return (
    <form className="row g-2 align-items-end" onSubmit={handleSubmit}>
      <div className="col-12 col-sm-8">
        <label className="form-label text-body" htmlFor="search-destination">
          Destination
        </label>
        <div className="input-group">
          <span className="input-group-text">
            <Icon name="map-pin" className="icon icon--sm" />
          </span>
          <input
            className="form-control"
            type="text"
            id="search-destination"
            name="search"
            placeholder="Where are you going?"
          />
        </div>
      </div>
      <div className="col-12 col-sm-4">
        <button type="submit" className="btn btn-primary w-100">
          <Icon name="search" className="icon icon--sm" /> Search
        </button>
      </div>
    </form>
  );
}
