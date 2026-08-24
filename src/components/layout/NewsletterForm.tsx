"use client";

import { FormEvent, useState } from "react";

export function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return <p className="text-sm text-ivory font-semibold">Thank you — you&apos;re on the list.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex border-b border-ivory/30 focus-within:border-ivory">
      <input
        type="email"
        required
        placeholder="Email address"
        aria-label="Email address"
        className="w-full bg-transparent py-2 text-sm text-ivory placeholder:text-ivory/60 focus:outline-none"
      />
      <button type="submit" className="eyebrow shrink-0 text-xs text-ivory font-semibold hover:text-champagne transition-colors">
        Subscribe
      </button>
    </form>
  );
}
