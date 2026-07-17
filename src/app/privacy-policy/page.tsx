import type { Metadata } from 'next';
import Link from 'next/link';
import { getCompanyInfo } from '@/lib/api';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Icon } from '@/components/icons/Icon';

export const metadata: Metadata = {
  title: 'Privacy Policy',
};

export default async function PrivacyPolicyPage() {
  const company = await getCompanyInfo();

  return (
    <>
      <div className="container mt-8">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Privacy Policy' }]} />
        <h1 className="mt-4">Privacy Policy</h1>
        <p className="text-muted">Last updated: January 1, 2026</p>
      </div>

      <div className="container py-16">
        <div style={{ maxWidth: '860px' }}>
          <p>
            This Privacy Policy explains how {company.name}{' '}
            (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) collects, uses, discloses and
            safeguards your information when you use our website and enquiry services.
          </p>

          <h2 className="mt-8 fs-4">1. Information We Collect</h2>
          <p className="mt-3">
            We collect information you provide directly, such as your name, email address and
            phone number when you send us an enquiry or contact support. We also automatically
            collect certain information about your device and usage through cookies and similar
            technologies.
          </p>

          <h2 className="mt-8 fs-4">2. How We Use Your Information</h2>
          <ul className="list-unstyled mt-3 d-flex flex-column gap-2">
            <li className="d-flex align-items-center gap-2">
              <Icon name="check" className="icon icon--sm text-success" /> To respond to and
              follow up on your enquiries
            </li>
            <li className="d-flex align-items-center gap-2">
              <Icon name="check" className="icon icon--sm text-success" /> To send booking
              confirmations and trip updates
            </li>
            <li className="d-flex align-items-center gap-2">
              <Icon name="check" className="icon icon--sm text-success" /> To improve our website
              and services
            </li>
            <li className="d-flex align-items-center gap-2">
              <Icon name="check" className="icon icon--sm text-success" /> To send marketing
              communications, where you&apos;ve opted in
            </li>
            <li className="d-flex align-items-center gap-2">
              <Icon name="check" className="icon icon--sm text-success" /> To comply with legal
              obligations
            </li>
          </ul>

          <h2 className="mt-8 fs-4">3. Sharing Your Information</h2>
          <p className="mt-3">
            We share your information with tour operators, hotels and airlines as needed to
            fulfill a booking you&apos;ve enquired about. We do not sell your personal information
            to third parties.
          </p>

          <h2 className="mt-8 fs-4">4. Cookies</h2>
          <p className="mt-3">
            We use cookies to remember your preferences and understand how our site is used. You
            can control cookies through your browser settings; disabling them may affect site
            functionality.
          </p>

          <h2 className="mt-8 fs-4">5. Data Retention</h2>
          <p className="mt-3">
            We retain your information for as long as necessary to provide our services and
            comply with legal obligations, after which it is securely deleted or anonymized.
          </p>

          <h2 className="mt-8 fs-4">6. Your Rights</h2>
          <p className="mt-3">
            Depending on your location, you may have the right to access, correct, delete, or
            export your personal information, and to object to or restrict certain processing.
            Contact us via our{' '}
            <Link href="/contact">Contact page</Link> to exercise these rights.
          </p>

          <h2 className="mt-8 fs-4">7. Security</h2>
          <p className="mt-3">
            We use industry-standard technical and organizational measures to protect your
            information, though no method of transmission or storage is completely secure.
          </p>

          <h2 className="mt-8 fs-4">8. Changes to This Policy</h2>
          <p className="mt-3">
            We may update this policy from time to time. We&apos;ll notify you of material changes
            by posting the new policy on this page with an updated revision date.
          </p>

          <h2 className="mt-8 fs-4">9. Contact Us</h2>
          <p className="mt-3">
            Questions about this policy can be sent via our <Link href="/contact">Contact page</Link>
            {company.phone ? ` or by phone at ${company.phone}` : ''}.
          </p>
        </div>
      </div>
    </>
  );
}
