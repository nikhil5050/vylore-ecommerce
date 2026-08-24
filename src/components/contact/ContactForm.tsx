"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";

const reasons = ["General Enquiry", "Order Support", "Custom Jewellery", "Other"];

// No backend/email service is wired up yet — this only acknowledges
// submission locally, it never actually sends the message anywhere.
export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="border border-silver/30 p-8 text-center">
        <p className="font-serif text-xl text-charcoal">Thank You</p>
        <p className="mt-2 text-sm text-muted">Your message has been received. We&apos;ll be in touch soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Field label="Full Name" name="name" required autoComplete="name" />
      <Field label="Email" name="email" type="email" required autoComplete="email" />
      <label className="flex flex-col gap-1.5">
        <span className="eyebrow text-[11px] text-muted">Reason for Contact</span>
        <select
          name="reason"
          required
          defaultValue=""
          className="h-11 border border-silver/50 bg-white px-3 text-sm text-charcoal focus:border-burgundy focus:outline-none"
        >
          <option value="" disabled>
            Select a reason
          </option>
          {reasons.map((reason) => (
            <option key={reason} value={reason}>
              {reason}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="eyebrow text-[11px] text-muted">Message *</span>
        <textarea
          name="message"
          required
          rows={5}
          className="border border-silver/50 bg-white px-3 py-2 text-sm text-charcoal focus:border-burgundy focus:outline-none"
        />
      </label>
      <Button type="submit" variant="primary" size="md" className="mt-2 w-fit">
        Send Message
      </Button>
      <p className="text-xs text-muted">
        This form is not yet connected to a live inbox. For urgent enquiries, reach us on WhatsApp or email directly.
      </p>
    </form>
  );
}
