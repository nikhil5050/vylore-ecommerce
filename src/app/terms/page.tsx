import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Container } from "@/components/ui/Container";

export default function TermsPage() {
  return (
    <main className="flex flex-1 flex-col py-16 lg:py-24">
      <Container className="max-w-3xl">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Terms" }]} />
        <h1 className="mt-4 font-serif text-4xl text-charcoal sm:text-5xl">Terms of Service</h1>

        <p className="mt-6 border border-champagne/40 bg-champagne/10 p-4 text-sm text-muted">
          This is placeholder policy content for development purposes. It has not been reviewed by a legal
          professional and must be replaced with reviewed, accurate content before this site goes live.
        </p>

        <div className="mt-10 flex flex-col gap-8 text-sm leading-relaxed text-muted">
          <section>
            <h2 className="font-serif text-xl text-charcoal">Acceptance of Terms</h2>
            <p className="mt-2">By using the Vylore website, you agree to these terms of service.</p>
          </section>
          <section>
            <h2 className="font-serif text-xl text-charcoal">Use of the Website</h2>
            <p className="mt-2">
              You agree to use the Vylore website only for lawful purposes and in a way that does not infringe
              the rights of others.
            </p>
          </section>
          <section>
            <h2 className="font-serif text-xl text-charcoal">Products &amp; Pricing</h2>
            <p className="mt-2">
              Product information and pricing are shown at the time of browsing and are subject to change without
              notice.
            </p>
          </section>
          <section>
            <h2 className="font-serif text-xl text-charcoal">Orders &amp; Payments</h2>
            <p className="mt-2">
              Orders are subject to acceptance and availability. Payments are processed securely through PayU.
            </p>
          </section>
          <section>
            <h2 className="font-serif text-xl text-charcoal">Shipping &amp; Delivery</h2>
            <p className="mt-2">
              Vylore currently ships within India. Delivery timelines are estimates and are confirmed after an
              order is placed.
            </p>
          </section>
          <section>
            <h2 className="font-serif text-xl text-charcoal">Returns &amp; Refunds</h2>
            <p className="mt-2">
              For questions about returns or refunds on a specific order, please contact our support team.
            </p>
          </section>
          <section>
            <h2 className="font-serif text-xl text-charcoal">Intellectual Property</h2>
            <p className="mt-2">
              All designs, logos, and content on the Vylore website are the property of Vylore and may not be
              used without permission.
            </p>
          </section>
          <section>
            <h2 className="font-serif text-xl text-charcoal">Limitation of Liability</h2>
            <p className="mt-2">
              Vylore is not liable for indirect or consequential losses arising from the use of this website, to
              the extent permitted by law.
            </p>
          </section>
          <section>
            <h2 className="font-serif text-xl text-charcoal">Governing Law</h2>
            <p className="mt-2">These terms are governed by the laws of India.</p>
          </section>
          <section>
            <h2 className="font-serif text-xl text-charcoal">Changes to These Terms</h2>
            <p className="mt-2">
              Vylore may update these terms from time to time. Continued use of the website means you accept the
              current terms.
            </p>
          </section>
          <section>
            <h2 className="font-serif text-xl text-charcoal">Contact Us</h2>
            <p className="mt-2">
              For questions about these terms, please reach out via our{" "}
              <Link href="/contact" className="text-burgundy underline underline-offset-2">
                Contact page
              </Link>
              .
            </p>
          </section>
        </div>
      </Container>
    </main>
  );
}
