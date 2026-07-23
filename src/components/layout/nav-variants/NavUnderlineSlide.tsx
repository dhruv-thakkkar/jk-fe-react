'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Icon } from '@/components/icons/Icon';
import { formatDuration, formatPrice } from '@/lib/format';
import { resolveImageUrl } from '@/lib/image-url';
import type { NavVariantProps } from './types';

async function closeMobileNav() {
  if (typeof window === 'undefined') return;
  const { Collapse } = await import('bootstrap/dist/js/bootstrap.bundle.min');
  const el = document.getElementById('primaryNav');
  if (el) Collapse.getInstance(el)?.hide();
}

export function NavUnderlineSlide({ companyName, packages, destinations, currency }: NavVariantProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [openMobile, setOpenMobile] = useState<'packages' | 'destinations' | null>(null);
  const [forceClosed, setForceClosed] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  function closeAll() {
    closeMobileNav();
    setOpenMobile(null);
  }

  function closeMegaLink() {
    closeAll();
    setForceClosed(true);
  }

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        closeMobileNav();
        setOpenMobile(null);
      }
    }
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  return (
    <header
      ref={headerRef}
      className={`navbar navbar-expand-lg nav-a border-bottom sticky-top py-3${isScrolled ? ' is-scrolled' : ''}`}
    >
      <div className="container">
        <Link href="/" className="navbar-brand fw-bold" onClick={closeAll}>
          {companyName}
        </Link>

        <button
          type="button"
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#primaryNav"
          aria-controls="primaryNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="primaryNav">
          <nav className="navbar-nav me-auto mt-3 mt-lg-0 gap-lg-2" aria-label="Primary">
            <Link href="/" className="nav-link" onClick={closeAll}>
              Home
            </Link>

            <div
              className={`nav-mega-item${openMobile === 'packages' ? ' is-open' : ''}${forceClosed ? ' force-closed' : ''}`}
              onMouseLeave={() => setForceClosed(false)}
            >
              <button
                type="button"
                className="nav-link nav-mega-trigger"
                aria-expanded={openMobile === 'packages'}
                onClick={(e) => {
                  setOpenMobile((v) => (v === 'packages' ? null : 'packages'));
                  e.currentTarget.blur();
                }}
              >
                Packages <Icon name="chevron-down" className="icon icon--sm" />
              </button>
              <div className="nav-mega-panel nav-mega-panel-lg">
               <div className="nav-mega-panel-inner">
                <div className="nav-mega-panel-scroll">
                  <div className="nav-mega-grid">
                    {packages.map((pkg) => (
                      <Link
                        key={pkg.id}
                        href={`/packages/${pkg.slug}`}
                        className="nav-mega-tile"
                        onClick={closeMegaLink}
                      >
                        <span className="nav-mega-tile-media">
                          <img src={resolveImageUrl(pkg.images[0]?.imageUrl)} alt="" loading="lazy" />
                        </span>
                        <span className="nav-mega-tile-body">
                          <span className="nav-mega-tile-title">{pkg.title}</span>
                          <span className="nav-mega-tile-meta">
                            {formatDuration(pkg.durationDays, pkg.durationNights)} &middot;{' '}
                            {formatPrice(pkg.discountPriceAdult ?? pkg.priceAdult, currency)}
                          </span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
                <Link href="/packages" className="nav-mega-viewall" onClick={closeMegaLink}>
                  View all {packages.length} packages <Icon name="arrow-right" className="icon icon--sm" />
                </Link>
               </div>
              </div>
            </div>

            <div
              className={`nav-mega-item${openMobile === 'destinations' ? ' is-open' : ''}${forceClosed ? ' force-closed' : ''}`}
              onMouseLeave={() => setForceClosed(false)}
            >
              <button
                type="button"
                className="nav-link nav-mega-trigger"
                aria-expanded={openMobile === 'destinations'}
                onClick={(e) => {
                  setOpenMobile((v) => (v === 'destinations' ? null : 'destinations'));
                  e.currentTarget.blur();
                }}
              >
                Destinations <Icon name="chevron-down" className="icon icon--sm" />
              </button>
              <div className="nav-mega-panel nav-mega-panel-lg">
               <div className="nav-mega-panel-inner">
                <div className="nav-mega-panel-scroll">
                  <div className="nav-mega-grid">
                    {destinations.map((dest) => (
                      <Link
                        key={dest.id}
                        href={`/destinations/${dest.slug}`}
                        className="nav-mega-tile"
                        onClick={closeMegaLink}
                      >
                        <span className="nav-mega-tile-media">
                          <img src={resolveImageUrl(dest.imageUrl) ?? undefined} alt="" loading="lazy" />
                        </span>
                        <span className="nav-mega-tile-body">
                          <span className="nav-mega-tile-title">{dest.name}</span>
                          <span className="nav-mega-tile-meta">{dest.country}</span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
                <Link href="/destinations" className="nav-mega-viewall" onClick={closeMegaLink}>
                  View all {destinations.length} destinations <Icon name="arrow-right" className="icon icon--sm" />
                </Link>
               </div>
              </div>
            </div>

            <Link href="/about" className="nav-link" onClick={closeAll}>
              About
            </Link>
            <Link href="/contact" className="nav-link" onClick={closeAll}>
              Contact
            </Link>
          </nav>
          <Link href="/contact" className="btn btn-primary btn-sm mt-3 mt-lg-0" onClick={closeAll}>
            Enquire Now
          </Link>
        </div>
      </div>
    </header>
  );
}
