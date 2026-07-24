import Link from 'next/link';
import { getCompanyInfo, listDestinations } from '@/lib/api';
import { Icon } from '../icons/Icon';
import { Logo } from './Logo';
import { NewsletterForm } from '../ui/NewsletterForm';
import { resolveImageUrl } from '@/lib/image-url';

export async function Footer() {
  const [company, destinations] = await Promise.all([getCompanyInfo(), listDestinations()]);
  const topDestinations = destinations.slice(0, 5);

  return (
    <footer className="bg-dark text-white-50 pt-16 pb-8">
      <div className="container">
        <div className="row g-4">
          <div className="col-12 col-md-6 col-lg-4">
            <Link href="/" className="navbar-brand text-white fw-bold d-inline-flex align-items-center gap-2 mb-3">
              {company.logoUrl ? (
                <span className="bg-white rounded d-inline-flex align-items-center justify-content-center p-1">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={resolveImageUrl(company.logoUrl)} alt={company.name} style={{ height: 28, width: 'auto' }} />
                </span>
              ) : (
                <>
                  <span className="bg-white rounded-circle d-inline-flex align-items-center justify-content-center p-1">
                    <Logo size={32} />
                  </span>
                  {company.name}
                </>
              )}
            </Link>
            <p className="mb-3" style={{ maxWidth: '32ch' }}>
              Your trusted travel partner. Explore the world with our best holiday packages.
            </p>
            {company.phone && (
              <p className="mb-3 d-flex align-items-center gap-2">
                <Icon name="phone" className="icon icon--sm" /> {company.phone}
              </p>
            )}
            <div className="d-flex gap-2">
              <a
                className="btn btn-icon btn-outline-light rounded-circle"
                href="#"
                aria-label={`${company.name} on Facebook`}
              >
                <Icon name="facebook" className="icon icon--sm" />
              </a>
              <a
                className="btn btn-icon btn-outline-light rounded-circle"
                href="#"
                aria-label={`${company.name} on Instagram`}
              >
                <Icon name="instagram" className="icon icon--sm" />
              </a>
              <a
                className="btn btn-icon btn-outline-light rounded-circle"
                href="#"
                aria-label={`${company.name} on X (Twitter)`}
              >
                <Icon name="twitter" className="icon icon--sm" />
              </a>
              <a
                className="btn btn-icon btn-outline-light rounded-circle"
                href="#"
                aria-label={`${company.name} on YouTube`}
              >
                <Icon name="youtube" className="icon icon--sm" />
              </a>
            </div>
          </div>

          <div className="col-6 col-md-3 col-lg-2">
            <h3 className="text-white fs-6 mb-3">Company</h3>
            <nav className="d-flex flex-column gap-2" aria-label="Company">
              <Link className="link-light link-underline-opacity-0 text-white-50" href="/about">
                About Us
              </Link>
              <Link className="link-light link-underline-opacity-0 text-white-50" href="/contact">
                Contact Us
              </Link>
            </nav>
          </div>

          <div className="col-6 col-md-3 col-lg-2">
            <h3 className="text-white fs-6 mb-3">Support</h3>
            <nav className="d-flex flex-column gap-2" aria-label="Support">
              <Link className="link-light link-underline-opacity-0 text-white-50" href="/faq">
                FAQs
              </Link>
              <Link
                className="link-light link-underline-opacity-0 text-white-50"
                href="/terms-conditions"
              >
                Terms &amp; Conditions
              </Link>
              <Link
                className="link-light link-underline-opacity-0 text-white-50"
                href="/privacy-policy"
              >
                Privacy Policy
              </Link>
            </nav>
          </div>

          {topDestinations.length > 0 && (
            <div className="col-6 col-md-6 col-lg-2">
              <h3 className="text-white fs-6 mb-3">Top Destinations</h3>
              <nav className="d-flex flex-column gap-2" aria-label="Top destinations">
                {topDestinations.map((destination) => (
                  <Link
                    key={destination.id}
                    className="link-light link-underline-opacity-0 text-white-50"
                    href={`/destinations/${destination.slug}`}
                  >
                    {destination.name}
                  </Link>
                ))}
              </nav>
            </div>
          )}

          <div className="col-6 col-md-6 col-lg-2">
            <h3 className="text-white fs-6 mb-3">Newsletter</h3>
            <p className="mb-3">Get exclusive deals and travel tips.</p>
            <NewsletterForm id="footer-email" submitLabel="icon" />
          </div>
        </div>

        <hr className="border-secondary mt-16 mb-4" />

        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center gap-3 small">
          <span>
            &copy; {new Date().getFullYear()} {company.name}. All rights reserved.
          </span>
          <div className="d-flex gap-3">
            <Link className="link-light link-underline-opacity-0 text-white-50" href="/privacy-policy">
              Privacy Policy
            </Link>
            <Link
              className="link-light link-underline-opacity-0 text-white-50"
              href="/terms-conditions"
            >
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
