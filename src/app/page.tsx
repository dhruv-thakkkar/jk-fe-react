import { getCompanyInfo } from '@/lib/api';
import { Hero } from '@/components/sections/Hero';
import { TrustStrip } from '@/components/sections/TrustStrip';
import { FeaturedPackages } from '@/components/sections/FeaturedPackages';
import { DestinationsScroller } from '@/components/sections/DestinationsScroller';
import { FeaturedCategoriesScroller } from '@/components/sections/FeaturedCategoriesScroller';
import { NewsletterCta } from '@/components/sections/NewsletterCta';

type SearchParams = { [key: string]: string | string[] | undefined };

function firstParam(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const page = Number(firstParam(params.page) ?? '1') || 1;

  const company = await getCompanyInfo();

  return (
    <>
      <Hero />
      <TrustStrip />
      <FeaturedPackages page={page} />
      <DestinationsScroller />
      <FeaturedCategoriesScroller />
      <NewsletterCta companyName={company.name} />
    </>
  );
}
