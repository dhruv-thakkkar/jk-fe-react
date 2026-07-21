'use client';

import { Children, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Icon } from '../icons/Icon';

const AUTO_SCROLL_PX_PER_SEC = 70;
const RESUME_DELAY_MS = 2500;

export function HorizontalScroller({
  children,
  autoPlay = true,
}: {
  children: React.ReactNode;
  /** Set false for finite/paginated tracks (e.g. one page of results) where looping would be misleading. */
  autoPlay?: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [overflowing, setOverflowing] = useState(false);
  const items = Children.toArray(children);
  // Only loop when the cards actually overflow the visible track — otherwise
  // a duplicated copy would sit fully on-screen next to the original (same
  // card shown twice at once).
  const canLoop = autoPlay && items.length > 1 && overflowing;

  // Re-measure whenever the track or its content resizes (viewport change,
  // items loading in, etc.) — decides whether a duplicate copy is needed.
  useLayoutEffect(() => {
    const track = trackRef.current;
    const content = contentRef.current;
    if (!track || !content) return;

    function measure() {
      if (!track || !content) return;
      setOverflowing(content.scrollWidth > track.clientWidth + 1);
    }

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    observer.observe(content);
    return () => observer.disconnect();
  }, [items.length]);

  // Track holds the content once, plus a second identical copy appended only
  // when looping — once autoplay/scroll passes the first copy, scrollLeft
  // snaps back by half the track width (same pixel position visually), so
  // the loop is seamless.
  useEffect(() => {
    const track = trackRef.current;
    if (!track || !canLoop) return;

    let raf = 0;
    let last = performance.now();

    function tick(now: number) {
      const dt = now - last;
      last = now;
      if (track && !pausedRef.current) {
        track.scrollLeft += (AUTO_SCROLL_PX_PER_SEC * dt) / 1000;
        const halfWidth = track.scrollWidth / 2;
        if (track.scrollLeft >= halfWidth) {
          track.scrollLeft -= halfWidth;
        }
      }
      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [canLoop]);

  function pauseThenResume() {
    pausedRef.current = true;
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      pausedRef.current = false;
    }, RESUME_DELAY_MS);
  }

  function scrollByArrow(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    pauseThenResume();
    track.scrollBy({ left: direction * track.clientWidth * 0.8, behavior: 'smooth' });
  }

  if (items.length === 0) {
    return null;
  }

  return (
    <div
      className="position-relative"
      onMouseEnter={() => {
        pausedRef.current = true;
      }}
      onMouseLeave={() => {
        pausedRef.current = false;
      }}
    >
      <button
        type="button"
        className="btn btn-icon btn-light rounded-circle shadow d-flex position-absolute top-50 start-0 translate-middle-y z-2"
        style={{ marginLeft: -18 }}
        onClick={() => scrollByArrow(-1)}
        aria-label="Scroll left"
      >
        <Icon name="chevron-left" className="icon icon--sm" />
      </button>

      <div
        ref={trackRef}
        className="d-flex gap-3 overflow-auto pb-2 scroll-track"
        style={{
          scrollbarWidth: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <div ref={contentRef} className="d-flex gap-3 flex-shrink-0">
          {items}
        </div>
        {canLoop && (
          <div className="d-flex gap-3 flex-shrink-0" aria-hidden="true">
            {items}
          </div>
        )}
      </div>

      <button
        type="button"
        className="btn btn-icon btn-light rounded-circle shadow d-flex position-absolute top-50 end-0 translate-middle-y z-2"
        style={{ marginRight: -18 }}
        onClick={() => scrollByArrow(1)}
        aria-label="Scroll right"
      >
        <Icon name="chevron-right" className="icon icon--sm" />
      </button>
    </div>
  );
}
