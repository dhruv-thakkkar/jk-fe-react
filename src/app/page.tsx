import { getCompanyInfo } from '@/lib/api';
import { Hero } from '@/components/sections/Hero';
import { FeaturedPackages } from '@/components/sections/FeaturedPackages';
import { DestinationsScroller } from '@/components/sections/DestinationsScroller';
import { FeaturedCategoriesScroller } from '@/components/sections/FeaturedCategoriesScroller';
import { NewsletterCta } from '@/components/sections/NewsletterCta';

export default async function HomePage() {
  const company = await getCompanyInfo();

  return (
    <>
      <Hero />
      <FeaturedPackages />
      <FeaturedCategoriesScroller />
      <DestinationsScroller />
      <NewsletterCta companyName={company.name} />
    </>
  );
}
