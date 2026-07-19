'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { PackageImage } from '@/types/api';
import { ImagePlaceholder } from './ImagePlaceholder';

export function PackageGallery({ images, title }: { images: PackageImage[]; title: string; slug: string }) {
  const gallery = images.length > 0 ? images : null;
  const [activeIndex, setActiveIndex] = useState(0);
  const [failedIds, setFailedIds] = useState<Set<string>>(new Set());

  function markFailed(id: string) {
    setFailedIds((prev) => (prev.has(id) ? prev : new Set(prev).add(id)));
  }

  const active = gallery?.[activeIndex];
  const activeAlt = active?.altText ?? title;
  const activeShowsImage = active && !failedIds.has(active.id);

  return (
    <div>
      <div className="ratio ratio-16x9 rounded-3 overflow-hidden position-relative">
        {activeShowsImage ? (
          <Image
            className="object-fit-cover"
            src={active.imageUrl}
            alt={activeAlt}
            fill
            priority
            sizes="(min-width: 1200px) 1140px, 100vw"
            onError={() => markFailed(active.id)}
          />
        ) : (
          <ImagePlaceholder label={activeAlt} className="position-absolute top-0 start-0" />
        )}
      </div>

      {gallery && gallery.length > 1 && (
        <div className="row row-cols-3 row-cols-md-6 g-2 mt-1">
          {gallery.map((image, index) => (
            <div className="col" key={image.id}>
              <button
                type="button"
                className={`ratio ratio-1x1 w-100 border-0 p-0 rounded-2 overflow-hidden position-relative${
                  index === activeIndex ? ' border border-3 border-primary' : ''
                }`}
                onClick={() => setActiveIndex(index)}
                aria-current={index === activeIndex}
                aria-label={`Show image ${index + 1} of ${gallery.length}`}
              >
                {failedIds.has(image.id) ? (
                  <ImagePlaceholder label={image.altText ?? title} className="position-absolute top-0 start-0" />
                ) : (
                  <Image
                    className="object-fit-cover"
                    src={image.imageUrl}
                    alt={image.altText ?? title}
                    fill
                    loading="lazy"
                    sizes="(min-width: 768px) 16vw, 33vw"
                    onError={() => markFailed(image.id)}
                  />
                )}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
