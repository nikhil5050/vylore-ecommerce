import { Logo } from "@/components/layout/Logo";
import { siteConfig } from "@/config/site";
import { contactInfo } from "@/config/contact";

// Stands in for the real homepage at "/" while COMING_SOON is active — see
// src/proxy.ts for the gate that keeps every other route redirected here.
export function ComingSoon() {
  return (
    <main className="relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-ivory px-6 py-16 text-center">
      <div className="pointer-events-none absolute inset-0 opacity-[0.05] bg-[radial-gradient(#111_1px,transparent_1px)] [background-size:22px_22px]" />

      <div className="relative z-10 flex flex-col items-center">
        <Logo size="md" />

        <p className="eyebrow mt-8 text-xs tracking-widest text-muted">Coming Soon</p>
        <h1 className="mt-4 max-w-2xl font-serif text-4xl text-charcoal sm:text-5xl lg:text-6xl tracking-tight">{siteConfig.tagline}</h1>
        <p className="mt-5 max-w-md text-base leading-relaxed text-muted font-light">{siteConfig.description}</p>

        <div className="mt-8 h-px w-16 bg-burgundy/40" />

        <p className="mt-8 max-w-sm text-sm leading-relaxed text-muted font-light">
          We&apos;re putting the finishing touches on something special. Thank you for your patience.
        </p>

        <a
          href={`mailto:${contactInfo.email}`}
          className="mt-10 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-burgundy transition-colors hover:text-charcoal"
        >
          {contactInfo.email}
        </a>
      </div>

      <p className="relative z-10 mt-16 text-xs text-muted/70">
        © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
      </p>
    </main>
  );
}
