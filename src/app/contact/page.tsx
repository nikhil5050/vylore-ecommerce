import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Container } from "@/components/ui/Container";
import { contactInfo } from "@/config/contact";
import { buildMetadata } from "@/utils/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description: "Get in touch with Vylore for enquiries, support, or custom jewellery requests.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <main className="flex flex-1 flex-col py-16 lg:py-24">
      <Container>
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
        <h1 className="mt-4 font-serif text-4xl text-charcoal sm:text-5xl">Contact</h1>
        <p className="mt-3 max-w-xl text-base text-muted">
          Questions about an order, a piece, or a custom design? We&apos;d love to hear from you.
        </p>

        <div className="mt-12 grid gap-12 lg:grid-cols-[320px_1fr]">
          <div className="flex flex-col gap-8">
            <div>
              <p className="eyebrow text-xs text-muted">Email</p>
              <a href={`mailto:${contactInfo.email}`} className="mt-2 block text-sm text-charcoal transition-colors hover:text-burgundy">
                {contactInfo.email}
              </a>
            </div>
            <div>
              <p className="eyebrow text-xs text-muted">Phone</p>
              <a
                href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                className="mt-2 block text-sm text-charcoal transition-colors hover:text-burgundy"
              >
                {contactInfo.phone}
              </a>
            </div>
            {contactInfo.address && (
              <div>
                <p className="eyebrow text-xs text-muted">Address</p>
                <p className="mt-2 text-sm text-charcoal">{contactInfo.address}</p>
              </div>
            )}
            <a
              href={`https://wa.me/${contactInfo.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="eyebrow flex h-11 w-fit items-center justify-center border border-charcoal/70 px-6 text-xs text-charcoal transition-colors hover:border-burgundy hover:text-burgundy"
            >
              Message on WhatsApp
            </a>
          </div>

          <ContactForm />
        </div>
      </Container>
    </main>
  );
}
