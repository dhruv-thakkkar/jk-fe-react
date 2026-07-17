import Image from 'next/image';
import { Icon } from '../icons/Icon';
import { SectionHeader } from '../ui/SectionHeader';

const TESTIMONIALS = [
  {
    text: '"Planned our entire trip down to the last detail. Everything was smooth from start to finish."',
    avatarSeed: 32,
    name: 'Sarah Mitchell',
    role: 'Bali, Indonesia',
  },
  {
    text: '"The package exceeded every expectation. Our guide was knowledgeable and the itinerary balanced adventure with relaxation perfectly."',
    avatarSeed: 12,
    name: 'James Carter',
    role: 'Interlaken, Switzerland',
  },
  {
    text: '"Booking was effortless and the price we saw is the price we paid. Will absolutely book with them again."',
    avatarSeed: 47,
    name: 'Priya Nair',
    role: 'Maldives',
  },
];

export function Testimonials() {
  return (
    <section className="py-16 bg-light">
      <div className="container">
        <SectionHeader eyebrow="Traveler stories" title="What Our Travelers Say" />
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {TESTIMONIALS.map((testimonial) => (
            <div className="col" key={testimonial.name}>
              <blockquote className="blockquote card p-4 h-100 mb-0">
                <Icon name="quote" className="icon text-primary-emphasis opacity-25 mb-2" />
                <p>{testimonial.text}</p>
                <footer className="blockquote-footer d-flex align-items-center gap-2 mt-3">
                  <Image
                    className="rounded-circle"
                    src={`https://i.pravatar.cc/150?img=${testimonial.avatarSeed}`}
                    alt=""
                    width={48}
                    height={48}
                    loading="lazy"
                  />
                  <div>
                    <div className="fw-semibold text-dark">{testimonial.name}</div>
                    <div className="small">{testimonial.role}</div>
                  </div>
                </footer>
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
