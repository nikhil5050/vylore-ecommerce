import type { Product } from "@/types/product";

// Temporary frontend mock data — replace with Flask API calls once the backend exists.
const products: Product[] = [
  {
    id: "1",
    slug: "aurelia-silver-ring",
    name: "Aurelia Silver Ring",
    category: "Rings",
    categorySlug: "rings",
    price: 4200,
    description: "A sculpted band with a soft, sloped profile designed for everyday wear.",
    story: "Aurelia takes its shape from the curve of a single unbroken line — a form we kept returning to until nothing extra was left.",
    metal: "Sterling Silver",
    sizes: ["12", "14", "16", "18"],
    badge: "NEW",
    inStock: true,
    collectionSlugs: ["everyday-icons"],
  },
  {
    id: "2",
    slug: "veyra-statement-necklace",
    name: "Veyra Statement Necklace",
    category: "Necklaces",
    categorySlug: "necklaces",
    price: 8900,
    compareAtPrice: 10500,
    description: "A sculptural pendant on a fine chain, built to anchor an entire look.",
    story: "Veyra was designed as a single statement piece — one considered form rather than a cluster of smaller details.",
    metal: "Sterling Silver",
    badge: "SIGNATURE",
    inStock: true,
    collectionSlugs: ["signature-silver", "statement-pieces"],
  },
  {
    id: "3",
    slug: "elara-sculpted-earrings",
    name: "Elara Sculpted Earrings",
    category: "Earrings",
    categorySlug: "earrings",
    price: 5600,
    description: "Sculptural drops with a hand-finished surface, light enough for daily wear.",
    metal: "Sterling Silver",
    inStock: true,
    collectionSlugs: ["everyday-icons"],
  },
  {
    id: "4",
    slug: "auren-silver-cuff",
    name: "Auren Silver Cuff",
    category: "Bracelets",
    categorySlug: "bracelets",
    price: 6800,
    description: "An open cuff with a rounded edge, made to sit close to the wrist.",
    metal: "Sterling Silver",
    sizes: ["S", "M", "L"],
    badge: "LIMITED",
    inStock: false,
    collectionSlugs: ["statement-pieces"],
  },
  {
    id: "5",
    slug: "viora-signature-pendant",
    name: "Viora Signature Pendant",
    category: "Necklaces",
    categorySlug: "necklaces",
    price: 5200,
    description: "A compact pendant with a faceted face, designed to catch light in motion.",
    metal: "Sterling Silver",
    badge: "BESTSELLER",
    inStock: true,
    collectionSlugs: ["signature-silver"],
  },
  {
    id: "6",
    slug: "isla-drop-earrings",
    name: "Isla Drop Earrings",
    category: "Earrings",
    categorySlug: "earrings",
    price: 4700,
    description: "Long, narrow drops with a gentle taper for quiet movement.",
    metal: "Sterling Silver",
    inStock: true,
    collectionSlugs: ["everyday-icons"],
  },
  {
    id: "7",
    slug: "noor-chain-anklet",
    name: "Noor Chain Anklet",
    category: "Anklets",
    categorySlug: "anklets",
    price: 3900,
    description: "Fine chainwork with a delicate clasp, made to move with you.",
    metal: "Sterling Silver",
    badge: "NEW",
    inStock: true,
    collectionSlugs: ["everyday-icons"],
  },
  {
    id: "8",
    slug: "solene-band-ring",
    name: "Solene Band Ring",
    category: "Rings",
    categorySlug: "rings",
    price: 3600,
    description: "A narrow, rounded band designed to stack or stand alone.",
    metal: "Sterling Silver",
    sizes: ["12", "14", "16", "18"],
    badge: "BESTSELLER",
    inStock: true,
    collectionSlugs: ["everyday-icons"],
  },
  {
    id: "9",
    slug: "amara-layered-necklace",
    name: "Amara Layered Necklace",
    category: "Necklaces",
    categorySlug: "necklaces",
    price: 7400,
    description: "Two fine chains set at different lengths, worn as one piece.",
    metal: "Sterling Silver",
    inStock: true,
    collectionSlugs: ["statement-pieces"],
  },
  {
    id: "10",
    slug: "zara-hoop-earrings",
    name: "Zara Hoop Earrings",
    category: "Earrings",
    categorySlug: "earrings",
    price: 3200,
    description: "A clean, medium-diameter hoop finished with a soft matte edge.",
    metal: "Sterling Silver",
    inStock: true,
    collectionSlugs: ["everyday-icons"],
  },
  {
    id: "11",
    slug: "kiara-cocktail-ring",
    name: "Kiara Cocktail Ring",
    category: "Rings",
    categorySlug: "rings",
    price: 9800,
    description: "A sculptural cocktail ring with a raised centre form.",
    story: "Kiara was built around volume — a deliberately larger silhouette balanced by a narrow, comfortable band.",
    metal: "Sterling Silver",
    sizes: ["12", "14", "16", "18"],
    badge: "SIGNATURE",
    inStock: true,
    collectionSlugs: ["signature-silver", "statement-pieces"],
  },
  {
    id: "12",
    slug: "ivana-charm-anklet",
    name: "Ivana Charm Anklet",
    category: "Anklets",
    categorySlug: "anklets",
    price: 4400,
    description: "A fine chain anklet with a single small charm detail.",
    metal: "Sterling Silver",
    inStock: false,
    collectionSlugs: ["everyday-icons"],
  },
  {
    id: "13",
    slug: "rhea-cuff-bracelet",
    name: "Rhea Cuff Bracelet",
    category: "Bracelets",
    categorySlug: "bracelets",
    price: 7200,
    description: "A structured cuff with a flat profile and rounded terminals.",
    metal: "Sterling Silver",
    sizes: ["S", "M", "L"],
    badge: "NEW",
    inStock: true,
    collectionSlugs: ["signature-silver"],
  },
  {
    id: "14",
    slug: "mira-chandelier-earrings",
    name: "Mira Chandelier Earrings",
    category: "Earrings",
    categorySlug: "earrings",
    price: 11200,
    description: "Tiered chandelier earrings for occasions that call for more.",
    story: "Mira layers three sculpted tiers into a single earring — each one finished by hand before assembly.",
    metal: "Sterling Silver",
    badge: "LIMITED",
    inStock: true,
    collectionSlugs: ["statement-pieces"],
  },
];

function bySlug(slug: string): Product {
  const product = products.find((p) => p.slug === slug);
  if (!product) throw new Error(`Unknown mock product slug: ${slug}`);
  return product;
}

export async function getAllProducts(): Promise<Product[]> {
  return products;
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  return products.find((product) => product.slug === slug);
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  return products.filter((product) => product.categorySlug === categorySlug);
}

export async function getProductsByCollection(collectionSlug: string): Promise<Product[]> {
  return products.filter((product) => product.collectionSlugs?.includes(collectionSlug));
}

export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  const sameCategory = products.filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id);
  if (sameCategory.length >= limit) return sameCategory.slice(0, limit);

  const fallback = products.filter((p) => p.id !== product.id && !sameCategory.includes(p));
  return [...sameCategory, ...fallback].slice(0, limit);
}

export async function getNewArrivals(): Promise<Product[]> {
  return [
    bySlug("aurelia-silver-ring"),
    bySlug("noor-chain-anklet"),
    bySlug("rhea-cuff-bracelet"),
    bySlug("solene-band-ring"),
  ];
}

export async function getBestsellers(): Promise<Product[]> {
  return [
    bySlug("viora-signature-pendant"),
    bySlug("solene-band-ring"),
    bySlug("veyra-statement-necklace"),
    bySlug("elara-sculpted-earrings"),
  ];
}
