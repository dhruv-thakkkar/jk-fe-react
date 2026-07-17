import type { Metadata } from 'next';
import Link from 'next/link';
import { getCompanyInfo } from '@/lib/api';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Icon } from '@/components/icons/Icon';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
};

export default async function TermsConditionsPage() {
  const company = await getCompanyInfo();

  return (
    <>
      <div className="container mt-8">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Terms & Conditions' }]} />
        <h1 className="mt-4">Terms &amp; Conditions</h1>
        <p className="text-muted">Last updated: January 1, 2026</p>
      </div>

      <div className="container py-16">
        <div style={{ maxWidth: '860px' }}>
          <p>
            These Terms &amp; Conditions (&quot;Terms&quot;) govern your use of the {company.name}{' '}
            website and enquiry services. By submitting an enquiry or booking a package through{' '}
            {company.name}, you agree to these Terms.
          </p>

          <h2 className="mt-8 fs-4">1. Enquiries &amp; Bookings</h2>
          <p className="mt-3">
            Submitting an enquiry does not guarantee availability or a confirmed booking. A
            booking is only guaranteed once you receive a confirmation from our team with a
            booking reference.
          </p>

          <h2 className="mt-8 fs-4">2. Pricing</h2>
          <p className="mt-3">
            Prices are displayed in {company.currency} and include all mandatory taxes and fees at
            the time of listing. Prices may change without notice until a booking is confirmed.
          </p>

          <h2 className="mt-8 fs-4">3. Cancellations &amp; Refunds</h2>
          <p className="mt-3">
            Cancellation terms vary by package and will be shared with you when your booking is
            confirmed. Where a refund is due, it will be issued to your original payment method
            within 5-10 business days.
          </p>

          <h2 className="mt-8 fs-4">4. Traveler Responsibilities</h2>
          <ul className="list-unstyled mt-3 d-flex flex-column gap-2">
            <li className="d-flex align-items-center gap-2">
              <Icon name="check" className="icon icon--sm text-success" /> Ensure you hold valid
              travel documents, visas and vaccinations required for your destination
            </li>
            <li className="d-flex align-items-center gap-2">
              <Icon name="check" className="icon icon--sm text-success" /> Arrive at meeting
              points on time; late arrivals may forfeit their booking
            </li>
            <li className="d-flex align-items-center gap-2">
              <Icon name="check" className="icon icon--sm text-success" /> Follow local laws,
              safety guidance and guide instructions during activities
            </li>
            <li className="d-flex align-items-center gap-2">
              <Icon name="check" className="icon icon--sm text-success" /> Obtain independent
              travel insurance where required
            </li>
          </ul>

          <h2 className="mt-8 fs-4">5. Liability</h2>
          <p className="mt-3">
            {company.name} acts as an intermediary between travelers and third-party tour
            operators, hotels and airlines. We are not liable for acts, errors, omissions, or
            delays caused by these third parties, except where required by applicable law.
          </p>

          <h2 className="mt-8 fs-4">6. Changes to Bookings</h2>
          <p className="mt-3">
            Date or traveler changes are subject to availability and may incur a change fee set by
            the relevant supplier.
          </p>

          <h2 className="mt-8 fs-4">7. Intellectual Property</h2>
          <p className="mt-3">
            All content on this website, including text, images and design, is owned by or
            licensed to {company.name} and may not be reproduced without permission.
          </p>

          <h2 className="mt-8 fs-4">8. Governing Law</h2>
          <p className="mt-3">
            These Terms are governed by the laws of the jurisdiction in which {company.name} is
            registered, without regard to conflict of law principles.
          </p>

          <h2 className="mt-8 fs-4">9. Contact</h2>
          <p className="mt-3">
            Questions about these Terms can be sent via our <Link href="/contact">Contact page</Link>
            {company.phone ? ` or by phone at ${company.phone}` : ''}.
          </p>
        </div>
      </div>
    </>
  );
}
