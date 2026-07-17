import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import { getCompanyInfo } from '@/lib/api';
import { IconSprite } from '@/components/icons/IconSprite';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BackToTop } from '@/components/layout/BackToTop';
import { BootstrapClient } from '@/components/BootstrapClient';
import '@/styles/bootstrap-theme.scss';
import '@/styles/custom.scss';

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
  const company = await getCompanyInfo();
  return {
    title: {
      default: `${company.name} — Explore the World, Discover New Places`,
      template: `%s | ${company.name}`,
    },
    description: `${company.name} is your trusted travel partner. Book handpicked holiday packages worldwide with the best price guarantee.`,
  };
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const company = await getCompanyInfo();

  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${bodyFont.variable} ${headingFont.variable}`}>
      <body>
        <IconSprite />
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <Header companyName={company.name} />
        <main id="main-content">{children}</main>
        <Footer />
        <BackToTop />
        <BootstrapClient />
      </body>
    </html>
  );
}
