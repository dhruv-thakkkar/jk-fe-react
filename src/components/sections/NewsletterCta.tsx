import { NewsletterForm } from '../ui/NewsletterForm';

export function NewsletterCta({ companyName }: { companyName: string }) {
  return (
    <section className="py-16">
      <div className="container">
        <div className="card bg-primary text-white p-5">
          <div className="row align-items-center g-4">
            <div className="col-12 col-lg-7">
              <h2 className="text-white">Get 10% Off On Your First Booking</h2>
              <p className="text-white-50 mb-0">
                Sign up to get exclusive deals and offers from {companyName} straight to your inbox.
              </p>
            </div>
            <div className="col-12 col-lg-5">
              <NewsletterForm id="cta-email" submitLabel="text" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
