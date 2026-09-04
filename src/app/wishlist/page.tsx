import { WishlistGrid } from "@/components/wishlist/WishlistGrid";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Container } from "@/components/ui/Container";

export default function WishlistPage() {
  return (
    <main className="flex flex-1 flex-col py-16 lg:py-24">
      <Container>
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Wishlist" }]} />
        <h1 className="mt-4 font-serif text-4xl text-charcoal sm:text-5xl">Wishlist</h1>

        <div className="mt-10">
          <WishlistGrid />
        </div>
      </Container>
    </main>
  );
}
