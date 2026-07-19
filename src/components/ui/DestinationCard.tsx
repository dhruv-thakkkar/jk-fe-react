'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Destination } from '@/types/api';
import { ImagePlaceholder } from './ImagePlaceholder';
import { WishlistButton } from './WishlistButton';

export function DestinationCard({ destination }: { destination: Destination }) {
  const [imageFailed, setImageFailed] = useState(false);
  const displayName = destination.stateRegion
    ? `${destination.name}, ${destination.stateRegion}`
    : destination.name;

  return (
    <Link
      className="card text-decoration-none position-relative overflow-hidden h-100"
      href={`/destinations/${destination.slug}`}
    >
      <div className="ratio ratio-4x3">
        {destination.imageUrl && !imageFailed ? (
          <Image
            className="object-fit-cover"
            src={destination.imageUrl}
            alt={displayName}
            fill
            loading="lazy"
            sizes="(min-width: 992px) 20vw, (min-width: 768px) 33vw, 50vw"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <ImagePlaceholder label={displayName} />
        )}
      </div>
      <WishlistButton
        className="btn btn-icon btn-light rounded-circle position-absolute top-0 end-0 m-2 z-2"
        label={`Save ${destination.name} to wishlist`}
      />
      <div className="position-absolute bottom-0 start-0 w-100 p-3 text-white img-overlay-scrim">
        <h3 className="fs-6 mb-0 text-white">{displayName}</h3>
        <span className="small">{destination.country}</span>
      </div>
    </Link>
  );
}
