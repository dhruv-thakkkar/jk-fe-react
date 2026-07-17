import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getCompanyInfo, listDestinations, listPackages } from '@/lib/api';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { FeatureItem } from '@/components/ui/FeatureItem';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { placeholderImage } from '@/lib/placeholder-image';

export const metadata: Metadata = {
  title: 'About Us',
};

const VALUES = [
  { icon: 'shield', title: 'Honest Pricing', text: 'No hidden fees, ever. The price you see is the price you pay.' },
  { icon: 'globe', title: 'Local Expertise', text: 'Every package is curated with destinations we know well.' },
  { icon: 'headset', title: 'Real Support', text: 'Human support before, during and after your trip.' },
];

export default async function AboutPage() {
  const [company, destinations, packages] = await Promise.all([
    getCompanyInfo(),
    listDestinations(),
    listPackages({ pageSize: 1 }),
  ]);

  const stats = [
    { value: String(packages.meta.total), label: 'Holiday Packages' },
    { value: String(destinations.length), label: 'Destinations' },
    ...(company.country ? [{ value: company.country, label: 'Based In' }] : []),
    { value: company.currency, label: 'Pricing Currency' },
  ];

  return (
    <>
      <section className="position-relative overflow-hidden" style={{ minHeight: 360 }}>
        <div className="position-absolute top-0 start-0 w-100 h-100">
          <Image
            src={placeholderImage('about-hero', 1600, 500)}
            alt={`${company.name} team planning a trip`}
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover' }}
          />
          <div className="position-absolute top-0 start-0 w-100 h-100 img-overlay-scrim" />
        </div>
        <div
          className="container position-relative py-10 text-white d-flex flex-column justify-content-center"
          style={{ minHeight: 360 }}
        >
          <Breadcrumbs light items={[{ label: 'Home', href: '/' }, { label: 'About Us' }]} />
          <h1 className="text-white mt-3">About {company.name}</h1>
          <p className="text-white-50 mb-0">We turn trip ideas into unforgettable, worry-free journeys.</p>
        </div>
      </section>

      <div className="container py-16">
        <div className="row g-4 align-items-center">
          <div className="col-12 col-lg-6">
            <span
              className="text-primary fw-semibold text-uppercase small d-block mb-2"
              style={{ letterSpacing: '0.06em' }}
            >
              Our Story
            </span>
            <h2 className="mb-3">Making travel simple</h2>
            <p>
              {company.name} is a tour operator{company.country ? ` based in ${company.country}` : ''}
              , putting together handpicked holiday packages so you can spend less time planning
              and more time exploring.
            </p>
            <p className="mt-3">
              We believe the best trips are planned with care, priced honestly, and backed by real
              people who pick up the phone when something goes wrong.
            </p>
          </div>
          <div className="col-12 col-lg-6">
            <Image
              className="rounded-3 object-fit-cover w-100 h-auto"
              src={placeholderImage('about-story', 700, 500)}
              alt={`${company.name} planning a trip`}
              loading="lazy"
              width={700}
              height={500}
            />
          </div>
        </div>
      </div>

      <div className="py-16 bg-light">
        <div className="container">
          <div className="row row-cols-2 row-cols-lg-4 g-4">
            {stats.map((stat) => (
              <div className="col" key={stat.label}>
                <div className="card text-center p-4 h-100">
                  <span className="fs-3 fw-bold text-dark">{stat.value}</span>
                  <span className="text-muted small">{stat.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container py-16">
        <SectionHeader eyebrow="What we stand for" title="Our Values" />
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {VALUES.map((item) => (
            <div className="col" key={item.title}>
              <FeatureItem icon={item.icon} title={item.title} text={item.text} />
            </div>
          ))}
        </div>
      </div>

      <div className="container py-16">
        <div className="card bg-light border-0 text-center p-5">
          <h2>Ready to start planning?</h2>
          <p className="text-muted">
            Browse our handpicked holiday packages or get in touch with our travel experts.
          </p>
          <div className="d-flex gap-3 justify-content-center flex-wrap mt-3">
            <Link href="/packages" className="btn btn-primary">
              Explore Packages
            </Link>
            <Link href="/contact" className="btn btn-secondary">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
