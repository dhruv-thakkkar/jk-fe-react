import Image from 'next/image';
import { HeroSearchForm } from './HeroSearchForm';

export function Hero() {
  return (
    <section className="position-relative overflow-hidden rounded-bottom" style={{ minHeight: 520 }}>
      <div className="position-absolute top-0 start-0 w-100 h-100">
        <Image
          src="https://picsum.photos/seed/travelora-hero/1600/900"
          alt="Turquoise alpine lake surrounded by forested mountains"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover' }}
        />
        <div className="position-absolute top-0 start-0 w-100 h-100 img-overlay-scrim" />
      </div>

      <div className="container position-relative py-16 text-white d-flex flex-column justify-content-center" style={{ minHeight: 520 }}>
        <h1 className="text-white">Explore the World, Discover New Places</h1>
        <p className="text-white-50 fs-5">Find the best holiday packages for your perfect vacation.</p>

        <div className="card p-3 mt-4" style={{ maxWidth: 640 }}>
          <HeroSearchForm />
        </div>
      </div>
    </section>
  );
}
