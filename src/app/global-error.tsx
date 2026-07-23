'use client';

import Link from 'next/link';
import { IconSprite } from '@/components/icons/IconSprite';
import { Icon } from '@/components/icons/Icon';
import '@/styles/bootstrap-theme.scss';
import '@/styles/custom.scss';

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body>
        <IconSprite />
        <div className="hero-section d-flex align-items-center" style={{ minHeight: '100vh' }}>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-md-9 col-lg-6 text-center py-16">
                <div
                  className="d-inline-flex align-items-center justify-content-center rounded-circle bg-primary-subtle text-primary mb-4"
                  style={{ width: 96, height: 96 }}
                >
                  <Icon name="compass" style={{ width: 44, height: 44 }} />
                </div>

                <h1 className="mb-3">We&apos;ll be right back</h1>
                <p className="text-muted mb-5">
                  Something went wrong on our end and this page couldn&apos;t load. It&apos;s usually
                  temporary — please try again in a moment.
                </p>

                <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                  <button
                    type="button"
                    onClick={() => reset()}
                    className="btn btn-primary rounded-pill px-4 py-2"
                  >
                    <Icon name="arrow-right" className="icon icon--sm me-2" style={{ transform: 'rotate(-90deg)' }} />
                    Try again
                  </button>
                  <Link href="/" className="btn btn-outline-secondary rounded-pill px-4 py-2">
                    <Icon name="home" className="icon icon--sm me-2" />
                    Go to homepage
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
