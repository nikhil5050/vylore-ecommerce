export interface AdminBanner {
  id: string;
  imageUrl: string;
  title?: string;
  linkUrl?: string;
  sortOrder: number;
  active: boolean;
}
