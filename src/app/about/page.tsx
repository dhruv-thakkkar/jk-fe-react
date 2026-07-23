import type { Metadata } from 'next';
import Link from 'next/link';
import { getCompanyInfo, listDestinations, listPackages } from '@/lib/api';
import { resolveImageUrl } from '@/lib/image-url';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { FeatureItem } from '@/components/ui/FeatureItem';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { Icon } from '@/components/icons/Icon';

export const metadata: Metadata = {
  title: 'About Us',
};

const VALUES = [
  { icon: 'shield', title: 'Honest Pricing', text: 'No hidden fees, ever. The price you see is the price you pay.' },
  { icon: 'globe', title: 'Local Expertise', text: 'Every package is curated with destinations we know well.' },
  { icon: 'headset', title: 'Real Support', text: 'Human support before, during and after your trip.' },
];

const DEFAULT_TAGLINE = 'Turning trip ideas into unforgettable, worry-free journeys.';
const DEFAULT_STORY =
  "We're a team of travel planners who believe great trips start with honest pricing and " +
  'local expertise. Every package we offer is put together by people who know the destination ' +
  "well, so you get an itinerary worth doing, priced without surprises, and backed by support that " +
  "sticks around after you've paid.";

const SOCIAL_LINKS = (company: Awaited<ReturnType<typeof getCompanyInfo>>) =>
  [
    { href: company.facebookUrl, icon: 'facebook', label: 'Facebook' },
    { href: company.instagramUrl, icon: 'instagram', label: 'Instagram' },
    { href: company.twitterUrl, icon: 'twitter', label: 'Twitter' },
  ].filter((link): link is { href: string; icon: string; label: string } => Boolean(link.href));

export default async function AboutPage() {
  const [company, destinations, packages] = await Promise.all([
    getCompanyInfo(),
    listDestinations(),
    listPackages({ pageSize: 1 }),
  ]);

  const stats = [
    { value: String(packages.meta.total), label: 'Holiday Packages' },
    { value: String(destinations.length), label: 'Destinations' },
    ...(company.foundedYear
      ? [{ value: String(new Date().getFullYear() - company.foundedYear), label: 'Years Experience' }]
      : company.country
        ? [{ value: company.country, label: 'Based In' }]
        : []),
    { value: company.currency, label: 'Pricing Currency' },
  ];

  const socialLinks = SOCIAL_LINKS(company);

  return (
    <>
      <section className="position-relative overflow-hidden" style={{ minHeight: 360 }}>
        <div className="position-absolute top-0 start-0 w-100 h-100">
          {company.heroImageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={resolveImageUrl(company.heroImageUrl)}
              alt={`${company.name} team planning a trip`}
              className="w-100 h-100"
              style={{ objectFit: 'cover' }}
            />
          ) : (
            <ImagePlaceholder label={`${company.name} team planning a trip`} />
          )}
          <div className="position-absolute top-0 start-0 w-100 h-100 img-overlay-scrim" />
        </div>
        <div
          className="container position-relative py-10 text-white d-flex flex-column justify-content-center"
          style={{ minHeight: 360 }}
        >
          <Breadcrumbs light items={[{ label: 'Home', href: '/' }, { label: 'About Us' }]} />
          <h1 className="text-white mt-3">About {company.name}</h1>
          <p className="text-white-50 mb-0">{company.tagline ?? DEFAULT_TAGLINE}</p>
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
            <p className="mt-3">{company.storyText ?? DEFAULT_STORY}</p>
            {company.missionStatement && (
              <blockquote className="border-start border-primary border-3 ps-3 mt-4 mb-0 fst-italic text-muted">
                <Icon name="quote" className="icon icon--sm text-primary mb-2" />
                <p className="mb-0">{company.missionStatement}</p>
              </blockquote>
            )}
          </div>
          <div className="col-12 col-lg-6">
            <div className="rounded-3 overflow-hidden" style={{ height: 500 }}>
              <ImagePlaceholder label={`${company.name} planning a trip`} />
            </div>
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
          {(company.phone || company.addressLine || socialLinks.length > 0) && (
            <div className="d-flex gap-4 justify-content-center flex-wrap mt-4 pt-4 border-top">
              {company.phone && (
                <span className="text-muted small d-inline-flex align-items-center gap-2">
                  <Icon name="phone" className="icon icon--sm" />
                  {company.phone}
                </span>
              )}
              {company.addressLine && (
                <span className="text-muted small d-inline-flex align-items-center gap-2">
                  <Icon name="map-pin" className="icon icon--sm" />
                  {company.addressLine}
                </span>
              )}
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted d-inline-flex align-items-center gap-2"
                  aria-label={link.label}
                >
                  <Icon name={link.icon} className="icon icon--sm" />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
