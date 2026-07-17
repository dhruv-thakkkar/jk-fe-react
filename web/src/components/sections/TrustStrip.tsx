import { FeatureItem } from '../ui/FeatureItem';

const FEATURES = [
  { icon: 'shield', title: 'Best Price Guarantee', text: 'We ensure the best rates' },
  { icon: 'home', title: 'Handpicked Stays', text: 'Quality accommodations for you' },
  { icon: 'headset', title: '24/7 Support', text: 'We are always here' },
  { icon: 'check-circle', title: 'Easy Booking', text: 'Enquire in just 2 minutes' },
];

export function TrustStrip() {
  return (
    <section className="py-10">
      <div className="container">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4">
          {FEATURES.map((feature) => (
            <div className="col" key={feature.title}>
              <FeatureItem icon={feature.icon} title={feature.title} text={feature.text} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
