'use client';

import { useRef } from 'react';
import { Icon } from '../icons/Icon';

export function HorizontalScroller({ children }: { children: React.ReactNode }) {
  const trackRef = useRef<HTMLDivElement>(null);

  function scrollBy(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * track.clientWidth * 0.8, behavior: 'smooth' });
  }

  return (
    <div className="position-relative">
      <button
        type="button"
        className="btn btn-icon btn-light rounded-circle shadow d-flex position-absolute top-50 start-0 translate-middle-y z-2"
        style={{ marginLeft: -18 }}
        onClick={() => scrollBy(-1)}
        aria-label="Scroll left"
      >
        <Icon name="chevron-left" className="icon icon--sm" />
      </button>

      <div
        ref={trackRef}
        className="d-flex gap-3 overflow-auto pb-2 scroll-track"
        style={{
          scrollSnapType: 'x proximity',
          scrollbarWidth: 'none',
          WebkitOverflowScrolling: 'touch',
          justifyContent: 'safe center',
        }}
      >
        {children}
      </div>

      <button
        type="button"
        className="btn btn-icon btn-light rounded-circle shadow d-flex position-absolute top-50 end-0 translate-middle-y z-2"
        style={{ marginRight: -18 }}
        onClick={() => scrollBy(1)}
        aria-label="Scroll right"
      >
        <Icon name="chevron-right" className="icon icon--sm" />
      </button>
    </div>
  );
}
