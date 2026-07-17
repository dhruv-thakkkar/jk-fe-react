import { FeatureItem } from '../ui/FeatureItem';

const VALUE_PROPS = [
  { icon: 'globe', title: 'Handpicked destinations', text: 'Curated tours and stays picked by local experts.' },
  { icon: 'credit-card', title: 'No hidden fees', text: 'Transparent pricing with instant confirmation.' },
  { icon: 'headset', title: 'Human support, 24/7', text: 'Real people ready to help before and during your trip.' },
];

const STATS = [
  { value: '12K+', label: 'Happy Travelers' },
  { value: '350+', label: 'Packages & Activities' },
  { value: '4.8/5', label: 'Average Rating' },
  { value: '24/7', label: 'Customer Support' },
];

export function WhyChooseUs({ companyName }: { companyName: string }) {
  return (
    <section className="py-16">
      <div className="container">
        <div className="row g-4 align-items-center">
          <div className="col-12 col-lg-6">
            <span className="text-primary fw-semibold text-uppercase small d-block mb-2" style={{ letterSpacing: '0.06em' }}>
              Why {companyName}
            </span>
            <h2 className="mb-3">Travel planning made simple</h2>
            <p className="mb-4">
              We combine local expertise with a seamless enquiry experience so you can spend less
              time planning and more time exploring.
            </p>
            <div className="d-flex flex-column gap-4">
              {VALUE_PROPS.map((item) => (
                <FeatureItem key={item.title} icon={item.icon} title={item.title} text={item.text} />
              ))}
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div className="row row-cols-2 g-4">
              {STATS.map((stat) => (
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
      </div>
    </section>
  );
}
