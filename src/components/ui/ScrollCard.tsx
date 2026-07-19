'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ImagePlaceholder } from './ImagePlaceholder';

export function ScrollCard({
  href,
  imageUrl,
  title,
  subtitle,
}: {
  href: string;
  imageUrl: string | null;
  title: string;
  subtitle?: string;
}) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <Link
      href={href}
      className="card text-decoration-none position-relative overflow-hidden flex-shrink-0"
      style={{ width: 160, scrollSnapAlign: 'start' }}
    >
      <div className="ratio ratio-1x1">
        {imageUrl && !imageFailed ? (
          <Image
            className="object-fit-cover"
            src={imageUrl}
            alt={title}
            fill
            loading="lazy"
            sizes="160px"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <ImagePlaceholder label={title} showLabel={false} />
        )}
      </div>
      <div className="position-absolute bottom-0 start-0 w-100 p-2 text-white img-overlay-scrim">
        <div className="fs-6 fw-semibold text-white text-truncate">{title}</div>
        {subtitle && <div className="small text-truncate">{subtitle}</div>}
      </div>
    </Link>
  );
}
