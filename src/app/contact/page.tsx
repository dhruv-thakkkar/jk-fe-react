import type { Metadata } from 'next';
import { getCompanyInfo, getPackage } from '@/lib/api';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ContactForm } from '@/components/sections/ContactForm';
import { FeatureItem } from '@/components/ui/FeatureItem';

export const metadata: Metadata = {
  title: 'Contact Us',
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ package?: string }>;
}) {
  const { package: packageSlug } = await searchParams;
  const [company, pkg] = await Promise.all([
    getCompanyInfo(),
    packageSlug ? getPackage(packageSlug) : Promise.resolve(null),
  ]);

  return (
    <>
      <div className="container mt-8">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Contact Us' }]} />
        <h1 className="mt-4">Contact Us</h1>
        <p style={{ maxWidth: '60ch' }}>
          Have a question about a package, or planning something custom? Send us a message and a
          {` ${company.name} `}
          travel expert will get back to you.
        </p>
      </div>

      <div className="container py-16">
        <div className="row row-cols-1 row-cols-md-3 g-4 mb-8">
          {company.phone && (
            <div className="col">
              <FeatureItem icon="phone" title="Call Us" text={company.phone} />
            </div>
          )}
          {company.country && (
            <div className="col">
              <FeatureItem icon="map-pin" title="Based In" text={company.country} />
            </div>
          )}
          <div className="col">
            <FeatureItem
              icon="headset"
              title="Message Us"
              text="Fill out the form and we'll get back to you shortly."
            />
          </div>
        </div>

        <div className="row g-4">
          <div className="col-12 col-lg-6">
            <div className="card p-4">
              <h2 className="fs-4">Send Us a Message</h2>
              <ContactForm packageId={pkg?.id} packageTitle={pkg?.title} />
            </div>
          </div>

          <div className="col-12 col-lg-6">
            <h3 className="fs-5">What Happens Next</h3>
            <div className="d-flex flex-column gap-4 mt-3">
              <FeatureItem
                size="sm"
                icon="check"
                title="We review your enquiry"
                text="A travel expert looks over the details you've shared."
              />
              <FeatureItem
                size="sm"
                icon="phone"
                title="We get in touch"
                text="We'll reach out by phone or email to discuss your trip."
              />
              <FeatureItem
                size="sm"
                icon="tag"
                title="We tailor a package"
                text="Get a plan and pricing built around what you're looking for."
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
