'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/packages', label: 'Packages' },
  { href: '/destinations', label: 'Destinations' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

async function closeMobileNav() {
  if (typeof window === 'undefined') return;
  const { Collapse } = await import('bootstrap/dist/js/bootstrap.bundle.min');
  const el = document.getElementById('primaryNav');
  if (el) Collapse.getInstance(el)?.hide();
}

export function Header({ companyName }: { companyName: string }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`navbar navbar-expand-lg bg-white border-bottom sticky-top py-3${isScrolled ? ' is-scrolled' : ''}`}
    >
      <div className="container">
        <Link href="/" className="navbar-brand fw-bold" onClick={closeMobileNav}>
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
          <nav className="navbar-nav me-auto mt-3 mt-lg-0" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="nav-link" onClick={closeMobileNav}>
                {link.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/contact"
            className="btn btn-primary btn-sm mt-3 mt-lg-0"
            onClick={closeMobileNav}
          >
            Enquire Now
          </Link>
        </div>
      </div>
    </header>
  );
}
