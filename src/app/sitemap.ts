import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getCategories } from "@/services/category.service";
import { getFeaturedCollections } from "@/services/collection.service";
import { getAllProducts } from "@/services/product.service";

export const dynamic = "force-static";

const staticPaths = ["", "/shop", "/collections", "/about", "/contact", "/faq", "/track-order"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, categories, collections] = await Promise.all([
    getAllProducts(),
    getCategories(),
    getFeaturedCollections(),
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

  const collectionRoutes = collections.map((collection) => ({
    url: `${siteConfig.url}/collections/${collection.slug}`,
    lastModified,
  }));

  return [...staticRoutes, ...productRoutes, ...categoryRoutes, ...collectionRoutes];
}
