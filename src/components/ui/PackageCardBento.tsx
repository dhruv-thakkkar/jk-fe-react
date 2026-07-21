'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { PackageListItem } from '@/types/api';
import { ImagePlaceholder } from './ImagePlaceholder';
import { formatDuration, formatPrice } from '@/lib/format';
import { Icon } from '../icons/Icon';

export function PackageCardBento({
  pkg,
  currency,
}: {
  pkg: PackageListItem;
  currency: string;
}) {
  const [imageFailed, setImageFailed] = useState(false);
  const cover = pkg.images[0];

  return (
    <Link
      href={`/packages/${pkg.slug}`}
      className="card-hover-lift position-relative d-block overflow-hidden rounded h-100 text-decoration-none"
    >
      {cover && !imageFailed ? (
        <Image
          className="object-fit-cover"
          src={cover.imageUrl}
          alt={cover.altText ?? pkg.title}
          fill
          loading="lazy"
          sizes="(min-width: 992px) 50vw, 100vw"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <ImagePlaceholder
          label={cover?.altText ?? pkg.title}
          className="position-absolute top-0 start-0 w-100 h-100"
        />
      )}
      <div className="position-absolute top-0 start-0 w-100 h-100 img-overlay-scrim" />

      <div className="position-absolute bottom-0 start-0 w-100 p-3 text-white">
      {/*   {pkg.category && (
          <span className="small fw-semibold text-white card-caption-text d-block mb-1">{pkg.category.name}</span>
        )} */}
        <h3 className="fs-6 fw-semibold text-white mb-1 text-truncate">{pkg.title}</h3>
        <div className="d-flex align-items-center justify-content-between">
          <span className="small text-white card-caption-text">
            <Icon name="calendar" className="icon icon--sm" /> {formatDuration(pkg.durationDays, pkg.durationNights)}
          </span>
          <span className="fw-bold text-white">{formatPrice(pkg.priceAdult, currency)}</span>
        </div>
      </div>
    </Link>
  );
}
