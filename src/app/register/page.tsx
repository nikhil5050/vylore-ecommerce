import type { Metadata } from "next";
import Link from "next/link";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Container } from "@/components/ui/Container";
import { buildMetadata } from "@/utils/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Create Account",
  description: "Create a Vylore account.",
  path: "/register",
  noIndex: true,
});

export default function RegisterPage() {
  return (
    <main className="flex flex-1 flex-col py-16 lg:py-24">
      <Container>
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Create Account" }]} />
        <h1 className="mt-4 font-serif text-4xl text-charcoal sm:text-5xl">Create Account</h1>

        <div className="mt-10 max-w-md">
          <RegisterForm />
          <p className="mt-6 text-sm text-muted">
            Already have an account?{" "}
            <Link href="/login" className="text-burgundy transition-colors hover:text-burgundy-dark">
              Sign in
            </Link>
          </p>
        </div>
      </Container>
    </main>
  );
}
