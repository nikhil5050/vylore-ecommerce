import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getCategories } from "@/services/category.service";
import { getAllProducts } from "@/services/product.service";

export const dynamic = "force-static";

const staticPaths = ["", "/shop", "/about", "/contact", "/faq", "/track-order"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, categories] = await Promise.all([
    getAllProducts(),
    getCategories(),
  ]);

  const lastModified = new Date();

  const staticRoutes = staticPaths.map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified,
  }));

  const productRoutes = products.map((product) => ({
    url: `${siteConfig.url}/product/${product.slug}`,
    lastModified,
  }));

  const categoryRoutes = categories.map((category) => ({
    url: `${siteConfig.url}/category/${category.slug}`,
    lastModified,
  }));

  return [...staticRoutes, ...productRoutes, ...categoryRoutes];
}
