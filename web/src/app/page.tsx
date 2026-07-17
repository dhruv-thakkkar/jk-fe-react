import { getCompanyInfo } from '@/lib/api';
import { Hero } from '@/components/sections/Hero';
import { TrustStrip } from '@/components/sections/TrustStrip';
import { PopularDestinations } from '@/components/sections/PopularDestinations';
import { FeaturedPackages } from '@/components/sections/FeaturedPackages';
import { WhyChooseUs } from '@/components/sections/WhyChooseUs';
import { Testimonials } from '@/components/sections/Testimonials';
import { NewsletterCta } from '@/components/sections/NewsletterCta';

export default async function HomePage() {
  const company = await getCompanyInfo();

  return (
    <>
      <Hero />
      <TrustStrip />
      <PopularDestinations />
      <FeaturedPackages />
      <WhyChooseUs companyName={company.name} />
      <Testimonials />
      <NewsletterCta companyName={company.name} />
    </>
  );
}
