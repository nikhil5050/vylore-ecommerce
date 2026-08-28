import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { buildMetadata } from "@/utils/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Create Account",
  description: "Create a Vylore account.",
  path: "/register",
  noIndex: true,
});

export default function RegisterPage() {
  return (
    <main className="flex flex-1 flex-col bg-moonlight/40">
      <Container className="pt-10 lg:pt-14">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Create Account" }]} />
      </Container>

      <div className="relative mt-8 h-[260px] w-full overflow-hidden sm:h-[320px] lg:h-[380px]">
        <Image
          src="/images/about/jewellery-5.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-obsidian/55" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <p className="eyebrow text-[11px] text-ivory/70">Join Vylore</p>
          <h1 className="mt-3 font-serif text-4xl text-ivory sm:text-5xl">Create Account</h1>
          <p className="mt-3 max-w-md text-sm text-ivory/80">
            Save your address, track orders, and enjoy a faster checkout every time.
          </p>
        </div>
      </div>

      <div className="flex flex-1 justify-center px-4 pb-16 sm:px-6 lg:pb-24">
        <div className="relative z-10 -mt-16 w-full max-w-xl rounded-sm border border-silver/40 bg-white p-8 shadow-[0_30px_80px_-30px_rgba(24,25,22,0.3)] sm:-mt-20 sm:p-12">
          <FadeIn direction="up">
            <RegisterForm />
            <p className="mt-8 text-center text-sm text-muted">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-burgundy transition-colors hover:text-burgundy-dark"
              >
                Sign in
              </Link>
            </p>
          </FadeIn>
        </div>
      </div>
    </main>
  );
}
