import type { Metadata } from "next";
import { PageHeader } from "@/components/admin/PageHeader";
import { Card, CardHeader, CardTitle } from "@/components/admin/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/admin/ui/table";
import { TopProductsChart, type TopProductDatum } from "@/components/admin/analytics/TopProductsChart";
import { CategoryPieChart, type CategorySliceDatum } from "@/components/admin/analytics/CategoryPieChart";
import { mockOrders, mockProducts } from "@/lib/admin/mock";
import { formatPrice } from "@/utils/formatPrice";

export const metadata: Metadata = { title: "Product Analytics" };

function buildTopProducts(): TopProductDatum[] {
  const totals = new Map<string, TopProductDatum>();
  for (const order of mockOrders) {
    for (const item of order.items) {
      const existing = totals.get(item.productId) ?? { name: item.name, unitsSold: 0, revenue: 0 };
      existing.unitsSold += item.quantity;
      existing.revenue += item.subtotal;
      totals.set(item.productId, existing);
    }
  }
  return [...totals.values()].sort((a, b) => b.revenue - a.revenue).slice(0, 8);
}

function buildTopCategories(): CategorySliceDatum[] {
  const productCategory = new Map(mockProducts.map((p) => [p.id, p.categoryName]));
  const totals = new Map<string, number>();
  for (const order of mockOrders) {
    for (const item of order.items) {
      const category = productCategory.get(item.productId) ?? "Other";
      totals.set(category, (totals.get(category) ?? 0) + item.subtotal);
    }
  }
  return [...totals.entries()]
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);
}

export default function ProductAnalyticsPage() {
  const topProducts = buildTopProducts();
  const topCategories = buildTopCategories();

  return (
    <div className="space-y-6">
      <PageHeader title="Product Analytics" description="Which products and categories are driving revenue." />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <TopProductsChart data={topProducts} />
        <CategoryPieChart title="Top Categories" description="Revenue share by category" data={topCategories} />
      </div>

      <Card>
        <CardHeader className="border-b pb-4">
          <CardTitle className="text-base">Top Products</CardTitle>
        </CardHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Units Sold</TableHead>
              <TableHead className="text-right">Revenue</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topProducts.map((product) => (
              <TableRow key={product.name}>
                <TableCell className="font-medium text-foreground">{product.name}</TableCell>
                <TableCell className="text-muted-foreground">{product.unitsSold}</TableCell>
                <TableCell className="text-right font-medium text-foreground">{formatPrice(product.revenue)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
