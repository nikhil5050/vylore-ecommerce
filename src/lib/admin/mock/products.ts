import type { Product, ProductListItem } from "@/types/admin";
import { mockCategories } from "./categories";

function categoryFor(id: string) {
  const category = mockCategories.find((c) => c.id === id)!;
  return { categoryId: category.id, categoryName: category.name };
}

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

interface ProductSeed {
  id: string;
  name: string;
  categoryId: string;
  mrp: number;
  sellingPrice: number;
  stock: number;
  status: Product["status"];
  material?: string;
  stone?: string;
  createdAt: string;
}

const seeds: ProductSeed[] = [
  { id: "p-001", name: "Silver Temple Necklace", categoryId: "cat-necklaces", mrp: 6499, sellingPrice: 4999, stock: 18, status: "active", material: "925 Sterling Silver", stone: "Cubic Zirconia", createdAt: "2026-06-02" },
  { id: "p-002", name: "Layered Coin Necklace", categoryId: "cat-necklaces", mrp: 5299, sellingPrice: 4499, stock: 6, status: "active", material: "925 Sterling Silver", createdAt: "2026-06-10" },
  { id: "p-003", name: "Minimal Bar Pendant Chain", categoryId: "cat-necklaces", mrp: 3199, sellingPrice: 2799, stock: 0, status: "active", material: "925 Sterling Silver", createdAt: "2026-05-18" },
  { id: "p-004", name: "Kundan Choker Necklace", categoryId: "cat-necklaces", mrp: 8999, sellingPrice: 7499, stock: 9, status: "draft", material: "925 Sterling Silver", stone: "Kundan", createdAt: "2026-07-01" },
  { id: "p-005", name: "Classic Solitaire Ring", categoryId: "cat-rings", mrp: 4299, sellingPrice: 3799, stock: 24, status: "active", material: "925 Sterling Silver", stone: "Cubic Zirconia", createdAt: "2026-04-22" },
  { id: "p-006", name: "Stacking Band Ring Set", categoryId: "cat-rings", mrp: 2999, sellingPrice: 2499, stock: 32, status: "active", material: "925 Sterling Silver", createdAt: "2026-05-02" },
  { id: "p-007", name: "Oxidised Statement Ring", categoryId: "cat-rings", mrp: 3499, sellingPrice: 2999, stock: 4, status: "active", material: "Oxidised Silver", createdAt: "2026-03-14" },
  { id: "p-008", name: "Pearl Halo Ring", categoryId: "cat-rings", mrp: 3899, sellingPrice: 3299, stock: 0, status: "active", material: "925 Sterling Silver", stone: "Freshwater Pearl", createdAt: "2026-06-28" },
  { id: "p-009", name: "Adjustable Toe Ring Pair", categoryId: "cat-rings", mrp: 1599, sellingPrice: 1299, stock: 40, status: "inactive", material: "925 Sterling Silver", createdAt: "2026-02-11" },
  { id: "p-010", name: "Crescent Drop Earrings", categoryId: "cat-earrings", mrp: 2799, sellingPrice: 2399, stock: 21, status: "active", material: "925 Sterling Silver", createdAt: "2026-06-15" },
  { id: "p-011", name: "Classic Silver Hoops", categoryId: "cat-earrings", mrp: 2199, sellingPrice: 1899, stock: 15, status: "active", material: "925 Sterling Silver", createdAt: "2026-05-25" },
  { id: "p-012", name: "Pearl Stud Earrings", categoryId: "cat-earrings", mrp: 1899, sellingPrice: 1599, stock: 3, status: "active", material: "925 Sterling Silver", stone: "Freshwater Pearl", createdAt: "2026-04-09" },
  { id: "p-013", name: "Chandbali Earrings", categoryId: "cat-earrings", mrp: 4599, sellingPrice: 3999, stock: 8, status: "draft", material: "925 Sterling Silver", stone: "Kundan", createdAt: "2026-07-05" },
  { id: "p-014", name: "Woven Chain Bracelet", categoryId: "cat-bracelets", mrp: 3299, sellingPrice: 2799, stock: 12, status: "active", material: "925 Sterling Silver", createdAt: "2026-05-30" },
  { id: "p-015", name: "Charm Bracelet", categoryId: "cat-bracelets", mrp: 3799, sellingPrice: 3299, stock: 0, status: "active", material: "925 Sterling Silver", createdAt: "2026-06-20" },
  { id: "p-016", name: "Cuff Bracelet", categoryId: "cat-bracelets", mrp: 2999, sellingPrice: 2599, stock: 17, status: "active", material: "925 Sterling Silver", createdAt: "2026-03-27" },
  { id: "p-017", name: "Classic Kada Bangle", categoryId: "cat-bangles", mrp: 5499, sellingPrice: 4799, stock: 5, status: "active", material: "925 Sterling Silver", createdAt: "2026-04-16" },
  { id: "p-018", name: "Textured Silver Bangle", categoryId: "cat-bangles", mrp: 4799, sellingPrice: 4199, stock: 22, status: "active", material: "925 Sterling Silver", createdAt: "2026-06-08" },
  { id: "p-019", name: "Box Chain 20-inch", categoryId: "cat-chains", mrp: 3999, sellingPrice: 3499, stock: 14, status: "active", material: "925 Sterling Silver", createdAt: "2026-05-12" },
  { id: "p-020", name: "Rope Chain 18-inch", categoryId: "cat-chains", mrp: 3599, sellingPrice: 3099, stock: 2, status: "active", material: "925 Sterling Silver", createdAt: "2026-06-24" },
  { id: "p-021", name: "Initial Letter Pendant", categoryId: "cat-pendants", mrp: 1999, sellingPrice: 1699, stock: 28, status: "active", material: "925 Sterling Silver", createdAt: "2026-05-05" },
  { id: "p-022", name: "Evil Eye Pendant", categoryId: "cat-pendants", mrp: 2299, sellingPrice: 1999, stock: 0, status: "active", material: "925 Sterling Silver", stone: "Enamel", createdAt: "2026-04-29" },
  { id: "p-023", name: "Delicate Anklet Pair", categoryId: "cat-anklets", mrp: 2499, sellingPrice: 2099, stock: 9, status: "active", material: "925 Sterling Silver", createdAt: "2026-03-02" },
];

export const mockProducts: Product[] = seeds.map((seed, index) => {
  const discountPercent = Math.round(((seed.mrp - seed.sellingPrice) / seed.mrp) * 100);
  const stockStatus = seed.stock === 0 ? "out_of_stock" : seed.stock <= 8 ? "low_stock" : "in_stock";
  const sku = `VYL-${seed.categoryId.replace("cat-", "").slice(0, 3).toUpperCase()}-${String(index + 1).padStart(3, "0")}`;

  return {
    id: seed.id,
    name: seed.name,
    slug: slugify(seed.name),
    sku,
    shortDescription: `${seed.name} — hand-finished in ${seed.material ?? "925 sterling silver"}, designed for everyday elegance.`,
    longDescription: `The ${seed.name} is crafted in ${seed.material ?? "925 sterling silver"} with a hand-polished finish. Distinctive and considered, it's designed for a new generation who value design, detail and individuality — made without compromise.`,
    status: seed.status,
    ...categoryFor(seed.categoryId),
    images: [
      { id: `${seed.id}-img-1`, url: "", isMain: true, order: 0 },
      { id: `${seed.id}-img-2`, url: "", isMain: false, order: 1 },
      { id: `${seed.id}-img-3`, url: "", isMain: false, order: 2 },
    ],
    details: {
      material: seed.material,
      weight: `${(6 + (index % 5)).toFixed(1)}g`,
      dimensions: "—",
      stone: seed.stone,
      plating: "Rhodium",
      occasion: "Everyday, Festive",
      collection: "Signature Edit",
      gender: "Women",
      careInstructions: "Store in an airtight pouch. Avoid contact with water, perfume and chemicals. Polish gently with a soft cloth.",
    },
    specifications: {
      metalType: "Silver",
      purity: "92.5%",
      weight: `${(6 + (index % 5)).toFixed(1)}g`,
      length: seed.categoryId === "cat-chains" || seed.categoryId === "cat-necklaces" ? "18-20 inch" : undefined,
      width: undefined,
      height: undefined,
      stoneType: seed.stone,
      stoneColor: seed.stone ? "White" : undefined,
      finish: "High Polish",
      plating: "Rhodium",
      closureType: seed.categoryId === "cat-bracelets" || seed.categoryId === "cat-necklaces" ? "Lobster Clasp" : undefined,
    },
    shippingInfo: {
      estimatedDelivery: "3-5 business days",
      returnPolicy: "7-day easy returns",
      warranty: "6-month manufacturing warranty",
    },
    pricing: {
      mrp: seed.mrp,
      sellingPrice: seed.sellingPrice,
      discountPercent,
      costPrice: Math.round(seed.sellingPrice * 0.55),
      taxPercent: 3,
    },
    inventory: {
      sku,
      barcode: `890${1000000 + index}`,
      stockQuantity: seed.stock,
      lowStockThreshold: 8,
      stockStatus,
      continueSellingOutOfStock: false,
    },
    variants:
      seed.categoryId === "cat-rings"
        ? ["14", "16", "18"].map((size, i) => ({
            id: `${seed.id}-v-${i}`,
            size,
            sku: `${sku}-${size}`,
            price: seed.sellingPrice,
            stock: Math.max(0, Math.round(seed.stock / 3)),
            weight: `${(6 + (index % 5)).toFixed(1)}g`,
          }))
        : [],
    rating: 4.2 + ((index % 6) * 0.1),
    reviewCount: 6 + index * 3,
    createdAt: seed.createdAt,
    updatedAt: seed.createdAt,
  };
});

export function toProductListItem(product: Product): ProductListItem {
  return {
    id: product.id,
    name: product.name,
    sku: product.sku,
    categoryName: product.categoryName,
    status: product.status,
    createdAt: product.createdAt,
    imageUrl: product.images.find((i) => i.isMain)?.url,
    sellingPrice: product.pricing.sellingPrice,
    mrp: product.pricing.mrp,
    stockQuantity: product.inventory.stockQuantity,
    stockStatus: product.inventory.stockStatus,
  };
}

export const mockProductListItems: ProductListItem[] = mockProducts.map(toProductListItem);
