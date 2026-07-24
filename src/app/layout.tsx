import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import { getCompanyInfo, listDestinations, listPackages, ApiError } from '@/lib/api';
import { IconSprite } from '@/components/icons/IconSprite';
import { Icon } from '@/components/icons/Icon';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BackToTop } from '@/components/layout/BackToTop';
import { BootstrapClient } from '@/components/BootstrapClient';
import '@/styles/bootstrap-theme.scss';
import '@/styles/custom.scss';
import '@/styles/nav-variants.scss';

const bodyFont = Inter({
  variable: '--font-body',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const headingFont = Poppins({
  variable: '--font-heading',
  subsets: ['latin'],
  weight: ['600', '700'],
});

export async function generateMetadata(): Promise<Metadata> {
  try {
    const company = await getCompanyInfo();
    return {
      title: {
        default: `${company.name} — Explore the World, Discover New Places`,
        template: `%s | ${company.name}`,
      },
      description: `${company.name} is your trusted travel partner. Book handpicked holiday packages worldwide with the best price guarantee.`,
      // No faviconUrl uploaded → omit `icons` entirely so Next's file convention
      // (src/app/icon.svg / favicon.ico) keeps serving as the fallback.
      icons: company.faviconUrl
        ? { icon: company.faviconUrl, apple: company.faviconUrl }
        : undefined,
    };
  } catch {
    return { title: 'Site Unavailable' };
  }
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  let company;
  try {
    company = await getCompanyInfo();
  } catch (err) {
    // The public storefront resolves its tenant by slug on every request
    // (no auth, no session) — if that company is deactivated or missing,
    // show a calm branded holding page instead of the raw 404/500 to
    // whoever lands here.
    if (err instanceof ApiError && err.status === 404) {
      return (
        <html lang="en" className={`${bodyFont.variable} ${headingFont.variable}`}>
          <body>
            <IconSprite />
            <div
              className="d-flex flex-column align-items-center justify-content-center text-center px-3"
              style={{ minHeight: '100vh' }}
            >
              <Icon name="compass" className="icon icon--lg text-primary mb-3" />
              <h1 className="mb-2">We&apos;ll be right back</h1>
              <p className="text-muted mb-0" style={{ maxWidth: 420 }}>
                This site is temporarily unavailable. Please check back soon.
              </p>
            </div>
          </body>
        </html>
      );
    }
    throw err;
  }

  // Nav mega-dropdowns are an enhancement, not core to rendering the page —
  // if either listing call fails, fall back to empty lists rather than
  // taking the whole site down with them.
  const [navPackages, navDestinations] = await Promise.all([
    listPackages({ pageSize: 100 }).then(
      (res) => res.data,
      () => [],
    ),
    listDestinations().then(
      (list) => list,
      () => [],
    ),
  ]);

  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${bodyFont.variable} ${headingFont.variable}`}>
      <body>
        <IconSprite />
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <Header
          companyName={company.name}
          logoUrl={company.logoUrl}
          packages={navPackages}
          destinations={navDestinations}
          currency={company.currency}
        />
        <main id="main-content">{children}</main>
        <Footer />
        <BackToTop />
        <BootstrapClient />
      </body>
    </html>
  );
}
