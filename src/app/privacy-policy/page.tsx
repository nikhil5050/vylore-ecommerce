import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Container } from "@/components/ui/Container";

export default function PrivacyPolicyPage() {
  return (
    <main className="flex flex-1 flex-col py-16 lg:py-24">
      <Container className="max-w-3xl">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]} />
        <h1 className="mt-4 font-serif text-4xl text-charcoal sm:text-5xl">Privacy Policy</h1>

        <p className="mt-6 border border-champagne/40 bg-champagne/10 p-4 text-sm text-muted">
          This is placeholder policy content for development purposes. It has not been reviewed by a legal
          professional and must be replaced with reviewed, accurate content before this site goes live.
        </p>

        <div className="mt-10 flex flex-col gap-8 text-sm leading-relaxed text-muted">
          <section>
            <h2 className="font-serif text-xl text-charcoal">Information We Collect</h2>
            <p className="mt-2">
              When you use the Vylore website, we may collect information you provide directly, such as your
              name, email address, phone number, and shipping address when placing an order or contacting us.
            </p>
          </section>
          <section>
            <h2 className="font-serif text-xl text-charcoal">How We Use Information</h2>
            <p className="mt-2">
              Information collected is used to process orders, respond to enquiries, and improve the Vylore
              website and services.
            </p>
          </section>
          <section>
            <h2 className="font-serif text-xl text-charcoal">Cookies</h2>
            <p className="mt-2">
              The Vylore website may use cookies and similar technologies to support core functionality, such as
              remembering items in your bag.
            </p>
          </section>
          <section>
            <h2 className="font-serif text-xl text-charcoal">Third-Party Services</h2>
            <p className="mt-2">
              Payments are processed by PayU. Vylore does not store your card or payment credentials — these are
              handled directly by PayU&apos;s secure systems.
            </p>
          </section>
          <section>
            <h2 className="font-serif text-xl text-charcoal">Data Security</h2>
            <p className="mt-2">
              We take reasonable steps to protect the information you share with us, though no method of
              transmission or storage is completely secure.
            </p>
          </section>
          <section>
            <h2 className="font-serif text-xl text-charcoal">Your Rights</h2>
            <p className="mt-2">
              You may contact us at any time to ask what information we hold about you, or to request that it be
              corrected or deleted.
            </p>
          </section>
          <section>
            <h2 className="font-serif text-xl text-charcoal">Contact Us</h2>
            <p className="mt-2">
              For privacy-related questions, please reach out via our{" "}
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
