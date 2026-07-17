'use client';

import { useState } from 'react';
import { Icon } from '../icons/Icon';

/** No email/marketing backend exists yet — submitting just shows a local acknowledgment, nothing is sent anywhere. */
export function NewsletterForm({
  id,
  submitLabel,
}: {
  id: string;
  submitLabel: 'icon' | 'text';
}) {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="d-flex align-items-center gap-2 text-white">
        <Icon name="check-circle" className="icon icon--sm" />
        <span>Thanks — you&apos;re on the list!</span>
      </div>
    );
  }

  return (
    <form
      aria-label="Subscribe to newsletter"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      <label className="visually-hidden" htmlFor={id}>
        Email address
      </label>
      <div className="input-group">
        <input className="form-control" type="email" id={id} placeholder="Enter your email" required />
        {submitLabel === 'icon' ? (
          <button type="submit" className="btn btn-primary" aria-label="Subscribe">
            <Icon name="arrow-right" className="icon icon--sm" />
          </button>
        ) : (
          <button type="submit" className="btn btn-secondary">
            Subscribe
          </button>
        )}
      </div>
    </form>
  );
}
