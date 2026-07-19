'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { PackageListItem } from '@/types/api';
import { ImagePlaceholder } from './ImagePlaceholder';
import { formatDuration, formatPrice } from '@/lib/format';
import { Icon } from '../icons/Icon';
import { WishlistButton } from './WishlistButton';

export function PackageCard({
  pkg,
  currency,
}: {
  pkg: PackageListItem;
  currency: string;
}) {
  const [imageFailed, setImageFailed] = useState(false);
  const cover = pkg.images[0];

  return (
    <article className="card h-100">
      <div className="ratio ratio-4x3 position-relative">
        {pkg.isFeatured && (
          <span
            className="badge bg-danger position-absolute top-0 start-0 m-2 w-auto h-auto"
            style={{ zIndex: 1 }}
          >
            Featured
          </span>
        )}
        {/* <WishlistButton
          className="btn btn-icon btn-light rounded-circle position-absolute top-0 end-0 m-2 z-2"
          label={`Save ${pkg.title} to wishlist`}
        /> */}
        {cover && !imageFailed ? (
          <Image
            className="card-img-top object-fit-cover"
            src={cover.imageUrl}
            alt={cover.altText ?? pkg.title}
            fill
            loading="lazy"
            sizes="(min-width: 992px) 25vw, (min-width: 576px) 50vw, 100vw"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <ImagePlaceholder label={cover?.altText ?? pkg.title} className="position-absolute top-0 start-0" />
        )}
      </div>
      <div className="card-body d-flex flex-column">
        {pkg.category && <span className="text-primary small fw-semibold mb-1">{pkg.category.name}</span>}
        <h3 className="card-title fs-6">
          <Link className="text-decoration-none stretched-link" href={`/packages/${pkg.slug}`}>
            {pkg.title}
          </Link>
        </h3>
        <div className="text-muted small mb-3">
          <Icon name="calendar" className="icon icon--sm" />{' '}
          {formatDuration(pkg.durationDays, pkg.durationNights)}
        </div>
        <div className="mt-auto fw-bold">
          {formatPrice(pkg.priceAdult, currency)} <small className="text-muted fw-normal">/ person</small>
        </div>
      </div>
    </article>
  );
}
