'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { PackageImage } from '@/types/api';
import { placeholderImage } from '@/lib/placeholder-image';

export function PackageGallery({ images, title, slug }: { images: PackageImage[]; title: string; slug: string }) {
  const gallery = images.length > 0 ? images : null;
  const fallbackSrc = placeholderImage(slug, 1200, 700);
  const [activeIndex, setActiveIndex] = useState(0);
  const [failedUrls, setFailedUrls] = useState<Set<string>>(new Set());

  function markFailed(url: string) {
    setFailedUrls((prev) => (prev.has(url) ? prev : new Set(prev).add(url)));
  }

  function resolveSrc(url: string) {
    return failedUrls.has(url) ? fallbackSrc : url;
  }

  const activeSrc = gallery ? resolveSrc(gallery[activeIndex].imageUrl) : fallbackSrc;
  const activeAlt = gallery ? (gallery[activeIndex].altText ?? title) : title;

  return (
    <div>
      <div className="ratio ratio-16x9 rounded-3 overflow-hidden">
        <Image
          className="object-fit-cover"
          src={activeSrc}
          alt={activeAlt}
          fill
          priority
          sizes="(min-width: 1200px) 1140px, 100vw"
          onError={() => gallery && markFailed(gallery[activeIndex].imageUrl)}
        />
      </div>

      {gallery && gallery.length > 1 && (
        <div className="row row-cols-3 row-cols-md-6 g-2 mt-1">
          {gallery.map((image, index) => (
            <div className="col" key={image.id}>
              <button
                type="button"
                className={`ratio ratio-1x1 w-100 border-0 p-0 rounded-2 overflow-hidden${
                  index === activeIndex ? ' border border-3 border-primary' : ''
                }`}
                onClick={() => setActiveIndex(index)}
                aria-current={index === activeIndex}
                aria-label={`Show image ${index + 1} of ${gallery.length}`}
              >
                <Image
                  className="object-fit-cover"
                  src={resolveSrc(image.imageUrl)}
                  alt={image.altText ?? title}
                  fill
                  loading="lazy"
                  sizes="(min-width: 768px) 16vw, 33vw"
                  onError={() => markFailed(image.imageUrl)}
                />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
