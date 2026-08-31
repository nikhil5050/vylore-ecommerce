import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AccountSidebar } from "@/components/account/AccountSidebar";
import { EmailVerificationBanner } from "@/components/account/EmailVerificationBanner";
import { RequireAuth } from "@/components/auth/RequireAuth";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Container } from "@/components/ui/Container";
import { buildMetadata } from "@/utils/metadata";

export const metadata: Metadata = buildMetadata({
  title: "My Account",
  description: "Manage your Vylore orders, profile, addresses, and wishlist.",
  path: "/account",
  noIndex: true,
});

export default function AccountLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex flex-1 flex-col bg-[linear-gradient(135deg,var(--white)_0%,var(--white)_72%,var(--moonlight)_100%)] py-12 sm:py-16 lg:py-24">
      <Container>
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Account" }]} />
        <div className="mt-4 flex items-end justify-between gap-4">
          <h1 className="font-serif text-4xl text-charcoal sm:text-5xl">My Account</h1>
          <p className="eyebrow hidden pb-1 text-[10px] text-muted sm:block">Member area</p>
        </div>

        <RequireAuth>
          <EmailVerificationBanner />
          <div className="mt-8 flex flex-col gap-8 lg:mt-12 lg:flex-row lg:gap-12">
            <AccountSidebar />
            <div className="flex-1">{children}</div>
          </div>
        </RequireAuth>
      </Container>
    </main>
  );
}
