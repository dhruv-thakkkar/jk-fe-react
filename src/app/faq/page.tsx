import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = {
  title: 'FAQ',
};

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface FaqGroup {
  id: string;
  title: string;
  items: FaqItem[];
}

const FAQ_GROUPS: FaqGroup[] = [
  {
    id: 'booking',
    title: 'Booking & Payments',
    items: [
      {
        id: 'how-to-book',
        question: 'How do I book a tour or package?',
        answer:
          'Browse our packages, then click "Enquire Now" on the one you like. Fill in your details and preferred travel date, and a travel expert will follow up to arrange payment and confirm your booking.',
      },
      {
        id: 'payment-methods',
        question: 'What payment methods do you accept?',
        answer:
          'Once your enquiry is confirmed, our team will share the available payment options for your booking, including major cards and bank transfer.',
      },
      {
        id: 'hidden-fees',
        question: 'Are there any hidden fees?',
        answer:
          'No. The price shown on each package listing is the price you pay, including all applicable taxes and service fees.',
      },
    ],
  },
  {
    id: 'cancellations',
    title: 'Cancellations & Changes',
    items: [
      {
        id: 'cancellation-policy',
        question: 'What is your cancellation policy?',
        answer:
          'Cancellation terms vary by package and are shared with you when your booking is confirmed.',
      },
      {
        id: 'change-dates',
        question: 'Can I change my travel dates after booking?',
        answer:
          "Yes, in most cases. Contact our support team as early as possible and we'll do our best to rebook you, subject to availability.",
      },
      {
        id: 'refunds',
        question: 'How do refunds work?',
        answer: 'Eligible refunds are processed back to your original payment method within 5-10 business days.',
      },
    ],
  },
  {
    id: 'during-trip',
    title: 'During Your Trip',
    items: [
      {
        id: 'help-while-traveling',
        question: 'What if I need help while traveling?',
        answer:
          'Our support team is available to help by phone or email. Use the contact details from your booking confirmation for the fastest response.',
      },
      {
        id: 'travel-insurance',
        question: 'Do I need travel insurance?',
        answer:
          "We strongly recommend it. Travel insurance isn't included by default, but our team can point you to trusted providers when you book.",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <>
      <div className="container mt-8">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'FAQ' }]} />
        <h1 className="mt-4">Frequently Asked Questions</h1>
        <p style={{ maxWidth: '60ch' }}>
          Can&apos;t find what you&apos;re looking for? <Link href="/contact">Contact our support team</Link>.
        </p>
      </div>

      <div className="container py-16">
        <div style={{ maxWidth: '860px' }}>
          {FAQ_GROUPS.map((group, groupIndex) => (
            <div key={group.id} className={groupIndex > 0 ? 'mt-8' : undefined}>
              <h2 className="fs-4">{group.title}</h2>
              <div className="accordion mt-4" id={`faqAccordion-${group.id}`}>
                {group.items.map((item, itemIndex) => {
                  const isFirst = groupIndex === 0 && itemIndex === 0;
                  const panelId = `faq-${group.id}-${item.id}`;
                  return (
                    <div className="accordion-item" key={item.id}>
                      <h3 className="accordion-header">
                        <button
                          className={`accordion-button${isFirst ? '' : ' collapsed'}`}
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#${panelId}`}
                          aria-expanded={isFirst}
                          aria-controls={panelId}
                        >
                          {item.question}
                        </button>
                      </h3>
                      <div
                        id={panelId}
                        className={`accordion-collapse collapse${isFirst ? ' show' : ''}`}
                        data-bs-parent={`#faqAccordion-${group.id}`}
                      >
                        <div className="accordion-body">{item.answer}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          <div className="card bg-light border-0 text-center p-5 mt-8">
            <h2>Still have questions?</h2>
            <p className="text-muted">Our travel experts are here to help you plan the perfect trip.</p>
            <div className="mt-3">
              <Link href="/contact" className="btn btn-primary">
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
