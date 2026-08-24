import { WishlistGrid } from "@/components/wishlist/WishlistGrid";

export default function AccountWishlistPage() {
  return (
    <div>
      <p className="text-sm text-muted">Pieces you&apos;ve saved for later.</p>
      <div className="mt-6">
        <WishlistGrid />
      </div>
    </div>
  );
}
