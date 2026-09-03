import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SharedCartView } from "@/components/cart/SharedCartView";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Container } from "@/components/ui/Container";
import { getSharedCart } from "@/services/shared-cart.service";
import { buildMetadata } from "@/utils/metadata";

export async function generateMetadata({
  params,
}: PageProps<"/cart/shared/[token]">): Promise<Metadata> {
  const { token } = await params;
  return buildMetadata({
    title: "Shared Bag",
    description: "Someone shared their Vylore shopping bag with you.",
    path: `/cart/shared/${token}`,
    noIndex: true,
  });
}

export default async function SharedCartPage({ params }: PageProps<"/cart/shared/[token]">) {
  const { token } = await params;
  const sharedCart = await getSharedCart(token);
  if (!sharedCart) notFound();

  return (
    <main className="flex flex-1 flex-col py-16 lg:py-24">
      <Container>
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Shared Bag" }]} />
        <h1 className="mt-4 font-serif text-4xl text-charcoal sm:text-5xl">{sharedCart.sharedByName}&apos;s Bag</h1>
        <p className="mt-3 text-sm text-muted">Take a look at what they&apos;re loving, and add it to your own bag.</p>

        <div className="mt-10">
          <SharedCartView sharedCart={sharedCart} />
        </div>
      </Container>
    </main>
  );
}
