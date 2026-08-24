import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "@/components/auth/LoginForm";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Container } from "@/components/ui/Container";
import { buildMetadata } from "@/utils/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Sign In",
  description: "Sign in to your Vylore account.",
  path: "/login",
  noIndex: true,
});

export default function LoginPage() {
  return (
    <main className="flex flex-1 flex-col py-16 lg:py-24">
      <Container>
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Sign In" }]} />
        <h1 className="mt-4 font-serif text-4xl text-charcoal sm:text-5xl">Sign In</h1>

        <div className="mt-10 max-w-md">
          <LoginForm />
          <p className="mt-6 text-sm text-muted">
            New to Vylore?{" "}
            <Link href="/register" className="text-burgundy transition-colors hover:text-burgundy-dark">
              Create an account
            </Link>
          </p>
        </div>
      </Container>
    </main>
  );
}
