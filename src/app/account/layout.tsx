import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AccountSidebar } from "@/components/account/AccountSidebar";
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
    <main className="flex flex-1 flex-col py-16 lg:py-24">
      <Container>
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Account" }]} />
        <h1 className="mt-4 font-serif text-4xl text-charcoal sm:text-5xl">My Account</h1>

        <RequireAuth>
          <div className="mt-10 flex flex-col gap-10 lg:flex-row">
            <AccountSidebar />
            <div className="flex-1">{children}</div>
          </div>
        </RequireAuth>
      </Container>
    </main>
  );
}
