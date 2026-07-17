'use client';

import { useState, type FormEvent } from 'react';
import { ApiError, submitEnquiry } from '@/lib/api';
import { Icon } from '../icons/Icon';

interface ContactFormProps {
  packageId?: string;
  packageTitle?: string;
}

type SubmitState = { status: 'idle' | 'submitting' } | { status: 'success' } | { status: 'error'; message: string };

export function ContactForm({ packageId, packageTitle }: ContactFormProps) {
  const [state, setState] = useState<SubmitState>({ status: 'idle' });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState({ status: 'submitting' });

    const form = event.currentTarget;
    const formData = new FormData(form);
    const numAdults = Number(formData.get('numAdults'));
    const numChildren = Number(formData.get('numChildren'));
    const numInfants = Number(formData.get('numInfants'));
    const travelDate = String(formData.get('travelDate') ?? '');

    try {
      await submitEnquiry({
        fullName: String(formData.get('fullName') ?? ''),
        phone: String(formData.get('phone') ?? ''),
        email: String(formData.get('email') ?? '') || undefined,
        message: String(formData.get('message') ?? '') || undefined,
        travelDate: travelDate || undefined,
        numAdults: Number.isFinite(numAdults) && numAdults > 0 ? numAdults : undefined,
        numChildren: Number.isFinite(numChildren) && numChildren > 0 ? numChildren : undefined,
        numInfants: Number.isFinite(numInfants) && numInfants > 0 ? numInfants : undefined,
        packageId,
      });
      setState({ status: 'success' });
      form.reset();
    } catch (error) {
      const message = error instanceof ApiError ? error.message : 'Something went wrong. Please try again.';
      setState({ status: 'error', message });
    }
  }

  if (state.status === 'success') {
    return (
      <div className="alert alert-success d-flex gap-2">
        <Icon name="check-circle" />
        <div>
          <strong className="d-block">Thanks — your enquiry has been sent!</strong>
          A member of our team will get back to you shortly.
        </div>
      </div>
    );
  }

  return (
    <form className="mt-4" onSubmit={handleSubmit}>
      {packageTitle && (
        <div className="alert alert-info d-flex gap-2 mb-4">
          <Icon name="tag" />
          <div>
            <strong className="d-block">Enquiring about</strong>
            {packageTitle}
          </div>
        </div>
      )}

      <div className="row g-3">
        <div className="col-12 col-sm-6">
          <label className="form-label" htmlFor="c-name">
            Full Name <span className="text-danger">*</span>
          </label>
          <input className="form-control" type="text" id="c-name" name="fullName" required />
        </div>
        <div className="col-12 col-sm-6">
          <label className="form-label" htmlFor="c-phone">
            Phone <span className="text-danger">*</span>
          </label>
          <input className="form-control" type="tel" id="c-phone" name="phone" required minLength={6} />
        </div>

        <div className="col-12 col-sm-6">
          <label className="form-label" htmlFor="c-email">
            Email
          </label>
          <input className="form-control" type="email" id="c-email" name="email" />
        </div>
        <div className="col-12 col-sm-6">
          <label className="form-label" htmlFor="c-travel-date">
            Preferred Travel Date
          </label>
          <input className="form-control" type="date" id="c-travel-date" name="travelDate" />
        </div>

        <div className="col-12 col-sm-4">
          <label className="form-label" htmlFor="c-adults">
            Adults
          </label>
          <input
            className="form-control"
            type="number"
            id="c-adults"
            name="numAdults"
            min={1}
            max={50}
            defaultValue={2}
          />
        </div>
        <div className="col-6 col-sm-4">
          <label className="form-label" htmlFor="c-children">
            Children
          </label>
          <input
            className="form-control"
            type="number"
            id="c-children"
            name="numChildren"
            min={0}
            max={50}
            defaultValue={0}
          />
        </div>
        <div className="col-6 col-sm-4">
          <label className="form-label" htmlFor="c-infants">
            Infants
          </label>
          <input
            className="form-control"
            type="number"
            id="c-infants"
            name="numInfants"
            min={0}
            max={50}
            defaultValue={0}
          />
        </div>

        <div className="col-12">
          <label className="form-label" htmlFor="c-message">
            Message <span className="text-danger">*</span>
          </label>
          <textarea className="form-control" id="c-message" name="message" rows={5} required />
        </div>
      </div>

      {state.status === 'error' && (
        <div className="alert alert-danger d-flex gap-2 mt-4">
          <Icon name="alert-triangle" />
          <div>{state.message}</div>
        </div>
      )}

      <button type="submit" className="btn btn-primary w-100 mt-4" disabled={state.status === 'submitting'}>
        {state.status === 'submitting' ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  );
}
