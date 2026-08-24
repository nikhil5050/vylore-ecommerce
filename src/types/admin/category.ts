export interface AdminCategory {
  id: string;
  name: string;
  slug: string;
  imageUrl?: string;
  description: string;
  seoTitle?: string;
  seoDescription?: string;
  productCount: number;
  active: boolean;
}
