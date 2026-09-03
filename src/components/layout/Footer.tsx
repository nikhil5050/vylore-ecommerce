import Image from "next/image";
import Link from "next/link";
import { FacebookIcon, InstagramIcon, PinterestIcon } from "@/components/icons/Icons";
import { Container } from "@/components/ui/Container";
import { footerNav, type NavItem } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { Logo1 } from "./logo1";
import { NewsletterForm } from "./NewsletterForm";

export function Footer() {
  return (
    // pb-24 (mobile/tablet only) clears the fixed mobile bottom nav's real
    // footprint (~4.75rem plus safe-area-inset-bottom — see Header.tsx and
    // HeroOverlay's identical bottom-24), so the page's true last content
    // (copyright/policy links below) isn't left rendering behind it with no
    // further room to scroll into view. That nav is lg:hidden, hence lg:pb-0.
    <footer className="relative overflow-hidden bg-burgundy-dark text-ivory pb-24 lg:pb-0">
      <Image
        src="/logo/logo1.png"
        alt=""
        aria-hidden="true"
        width={480}
        height={480}
        className="pointer-events-none absolute -right-16 top-1/2 z-0 h-auto w-64 -translate-y-1/2 select-none opacity-[0.06] mix-blend-screen sm:w-80 lg:w-[26rem]"
      />

      <Container className="relative z-10 grid grid-cols-2 gap-x-8 gap-y-12 py-16 lg:grid-cols-5 lg:py-24">
        <div className="col-span-2 flex flex-col gap-4">
          <Logo1 className="text-ivory" />
          <p className="max-w-xs text-sm text-ivory/70">{siteConfig.description}</p>
          <div className="mt-2 flex items-center gap-4">
            <a href="#" aria-label="Instagram" className="text-ivory/70 transition-colors hover:text-champagne">
              <InstagramIcon />
            </a>
            <a href="#" aria-label="Facebook" className="text-ivory/70 transition-colors hover:text-champagne">
              <FacebookIcon />
            </a>
            <a href="#" aria-label="Pinterest" className="text-ivory/70 transition-colors hover:text-champagne">
              <PinterestIcon />
            </a>
          </div>
        </div>

        <FooterColumn title="Shop" links={footerNav.shop} />
        <FooterColumn title="About" links={footerNav.about} />
        <FooterColumn title="Help" links={footerNav.help} />

        <div className="col-span-2 flex flex-col gap-4 lg:col-span-1">
          <p className="eyebrow text-xs text-ivory font-semibold">Newsletter</p>
          <p className="text-sm text-ivory/70">Stay close to what&apos;s next.</p>
          <NewsletterForm />
        </div>
      </Container>

      <div className="relative z-10 border-t border-ivory/10">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 text-xs text-ivory/70 sm:flex-row">
          <p>© {new Date().getFullYear()} Vylore. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="transition-colors hover:text-ivory">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-ivory">
              Terms
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: NavItem[] }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="eyebrow text-xs text-ivory font-semibold">{title}</p>
      <ul className="flex flex-col gap-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-sm text-ivory/70 transition-colors hover:text-ivory">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
