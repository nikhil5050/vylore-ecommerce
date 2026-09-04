import {
  ArrowUpRight,
  Clock,
  HelpCircle,
  Mail,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Sparkles,
} from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { contactInfo } from "@/config/contact";

const quickContacts = [
  {
    title: "Email us",
    value: contactInfo.email,
    href: `mailto:${contactInfo.email}`,
    icon: Mail,
  },
  {
    title: "Call us",
    value: contactInfo.phone,
    href: `tel:${contactInfo.phone.replace(/\s/g, "")}`,
    icon: Phone,
  },
  {
    title: "WhatsApp",
    value: "Chat on WhatsApp",
    href: `https://wa.me/${contactInfo.whatsapp}`,
    icon: MessageCircle,
    external: true,
  },
  {
    title: "Our location",
    value: contactInfo.address,
    href: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(contactInfo.address)}`,
    icon: MapPin,
    external: true,
  },
];

const boutiqueHours = [
  { days: "Monday – Friday", hours: "10:00 AM – 8:00 PM" },
  { days: "Saturday", hours: "10:00 AM – 9:00 PM" },
  { days: "Sunday", hours: "11:00 AM – 6:00 PM" },
];

const faqs = [
  {
    question: "Do I need an appointment to visit the Belhe boutique?",
    answer:
      "Walk-ins are always welcome! However, for custom design consultations or bespoke bridal enquiries, booking an appointment ensures dedicated time with our master jeweller.",
  },
  {
    question: "How long do custom jewellery requests typically take?",
    answer:
      "Custom designs usually take 2 to 4 weeks from initial concept approval to hand-crafting and final polish, depending on design complexity.",
  },
  {
    question: "Can I make changes to an existing online order?",
    answer:
      "If your order hasn't been dispatched yet, we can easily update your details or item requests. Reach out to us via phone or WhatsApp for immediate help.",
  },
  {
    question: "Do you offer international shipping and valuation certificates?",
    answer:
      "Yes, we ship globally with insured express courier partners. All our gold and diamond jewellery comes with certified authenticity documentation.",
  },
];

const mapEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(contactInfo.address)}&output=embed`;
const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(contactInfo.address)}`;

export default function ContactPage() {
  return (
    <main className="relative flex flex-1 flex-col overflow-hidden bg-white py-12 sm:py-16 lg:py-20">
      <Container className="relative z-10">
        <Breadcrumb
          items={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        />

        {/* --- Top Section: Header & Main Form Layout --- */}
        <div className="mt-8 grid min-w-0 gap-10 sm:gap-12 lg:grid-cols-12 lg:items-start lg:gap-8">
          {/* Left Column: Title & Quick Contact Cards */}
          <div className="flex min-w-0 flex-col lg:col-span-5">
            <FadeIn>
              <h1 className="mt-6 font-serif text-4xl text-charcoal sm:text-5xl tracking-tight">
                Get in touch
              </h1>
              <p className="mt-4 text-base leading-relaxed text-muted">
                Questions about an order, a piece, or a custom design? Reach out
                however&apos;s easiest for you.
              </p>
            </FadeIn>

            {/* Quick Contact Cards */}
            <div className="mt-8 flex flex-col gap-3">
              {quickContacts.map(
                ({ title, value, href, icon: Icon, external }, index) => (
                  <FadeIn key={title} delay={0.05 * index}>
                    <a
                      href={href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className="group flex min-w-0 items-center justify-between overflow-hidden rounded-2xl border border-charcoal/10 bg-[#FAF9F6] p-4 transition-all hover:border-burgundy/30 hover:bg-white hover:shadow-sm"
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-charcoal/10 bg-white text-burgundy transition-colors group-hover:bg-burgundy group-hover:text-white">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="truncate">
                          <p className="text-xs font-medium text-muted">
                            {title}
                          </p>
                          <p className="mt-0.5 truncate text-sm font-medium text-charcoal group-hover:text-burgundy">
                            {value}
                          </p>
                        </div>
                      </div>
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-charcoal/10 text-charcoal transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:border-burgundy group-hover:text-burgundy">
                        <ArrowUpRight className="h-4 w-4" />
                      </div>
                    </a>
                  </FadeIn>
                )
              )}
            </div>

            {/* Mini Map Preview */}
            <FadeIn delay={0.3} className="mt-8">
              <div className="overflow-hidden rounded-2xl border border-charcoal/10 bg-[#FAF9F6] p-2">
                <div className="aspect-[16/9] w-full overflow-hidden rounded-xl">
                  <iframe
                    src={mapEmbedSrc}
                    title="Vylore store location map"
                    className="h-full w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Contact Form Panel */}
          <div className="min-w-0 lg:col-span-7 lg:pl-6 lg:mt-16">
            <FadeIn direction="right" delay={0.1}>
              <div className="rounded-3xl border border-charcoal/10 bg-[#FAF9F6] p-6 sm:p-10 shadow-sm">
                <p className="eyebrow text-xs text-muted">Send a Message</p>
                <h2 className="mt-2 font-serif text-2xl text-charcoal sm:text-3xl">
                  Write to Us
                </h2>
                <p className="mt-2 text-sm text-muted">
                  Fill in the form below and our boutique team will get back to
                  you shortly.
                </p>

                <div className="mt-8">
                  <ContactForm />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* --- Bottom Design Content Section 1: Store Hours & Custom Consultations --- */}
        <div className="mt-20 border-t border-charcoal/10 pt-16 lg:mt-28 lg:pt-20">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Opening Hours Card */}
            <FadeIn delay={0.1}>
              <div className="h-full rounded-3xl border border-charcoal/10 bg-[#FAF9F6] p-8 sm:p-10">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-burgundy/10 text-burgundy">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="eyebrow text-xs text-muted">
                      Visit In Person
                    </p>
                    <h3 className="font-serif text-xl text-charcoal">
                      Boutique Hours
                    </h3>
                  </div>
                </div>

                <div className="mt-6 divide-y divide-charcoal/10">
                  {boutiqueHours.map((item) => (
                    <div
                      key={item.days}
                      className="flex justify-between py-3.5 text-sm"
                    >
                      <span className="font-medium text-charcoal">
                        {item.days}
                      </span>
                      <span className="text-muted">{item.hours}</span>
                    </div>
                  ))}
                </div>

                <p className="mt-6 text-xs text-muted">
                  * Holiday hours may vary. Feel free to call us beforehand to
                  confirm private viewings.
                </p>
              </div>
            </FadeIn>

            {/* Custom Jewellery Bespoke Feature Box */}
            <FadeIn delay={0.2}>
              <div className="flex h-full flex-col justify-between rounded-3xl border border-burgundy/20 bg-burgundy/5 p-8 sm:p-10">
                <div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-burgundy text-white">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <p className="eyebrow mt-6 text-xs text-burgundy">
                    Bespoke Design Service
                  </p>
                  <h3 className="mt-1 font-serif text-2xl text-charcoal sm:text-3xl">
                    Looking for a Custom Piece?
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    Work directly with our lead artisans to design one-of-a-kind
                    engagement rings, heirloom redesigns, or customized luxury
                    gifts tailored to your exact story.
                  </p>
                </div>

                <div className="mt-8">
                  <a
                    href={`https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent("Hi Vylore team, I would like to enquire about a custom jewellery design.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-burgundy px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-burgundy/90"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Book Custom Consultation
                  </a>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* --- Bottom Design Content Section 2: FAQ Grid --- */}
        <div className="mt-20 lg:mt-28">
          <FadeIn className="text-center max-w-xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-charcoal/10 bg-[#FAF9F6] px-3.5 py-1 text-xs font-medium text-charcoal">
              <HelpCircle className="h-3.5 w-3.5 text-burgundy" />
              Frequently Asked Questions
            </div>
            <h2 className="mt-4 font-serif text-3xl text-charcoal sm:text-4xl">
              Everything You Need to Know
            </h2>
            <p className="mt-2 text-sm text-muted">
              Quick answers to common questions about visiting us, custom
              orders, and services.
            </p>
          </FadeIn>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {faqs.map((faq, index) => (
              <FadeIn key={faq.question} delay={0.05 * index}>
                <div className="h-full rounded-2xl border border-charcoal/10 bg-[#FAF9F6] p-6 sm:p-8">
                  <h4 className="font-serif text-lg text-charcoal">
                    {faq.question}
                  </h4>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {faq.answer}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* --- Bottom Design Content Section 3: Visit Location Banner --- */}
        <FadeIn delay={0.2} className="mt-20 lg:mt-28">
          <div className="relative overflow-hidden rounded-3xl border border-charcoal/10 bg-charcoal p-8 sm:p-12 text-white">
            <div className="relative z-10 flex min-w-0 flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
              <div className="min-w-0">
                <p className="eyebrow text-xs text-burgundy">Store Location</p>
                <h3 className="mt-2 font-serif text-2xl sm:text-3xl text-white">
                  Come See Us in Belhe
                </h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/70">
                  Nothing quite compares to holding a piece in your hands. Stop
                  by our flagship boutique to experience our craftsmanship in
                  person.
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs text-white/80">
                  <MapPin className="h-4 w-4 shrink-0 text-burgundy" />
                  <span className="break-words">{contactInfo.address}</span>
                </div>
              </div>

              <a
                href={directionsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-xs font-medium uppercase tracking-wider text-charcoal transition-colors hover:bg-burgundy hover:text-white"
              >
                <Navigation className="h-4 w-4" />
                Get Directions
              </a>
            </div>
          </div>
        </FadeIn>
      </Container>
    </main>
  );
}