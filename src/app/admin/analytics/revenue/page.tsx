import type { Metadata } from "next";
import { PageHeader } from "@/components/admin/PageHeader";
import { Card, CardHeader, CardTitle } from "@/components/admin/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/admin/ui/table";
import { CategoryPieChart } from "@/components/admin/analytics/CategoryPieChart";
import { mockOrders, mockProducts } from "@/lib/admin/mock";
import { formatPrice } from "@/utils/formatPrice";

export const metadata: Metadata = { title: "Revenue Analytics" };

function buildCategoryRevenue() {
  const productCategory = new Map(mockProducts.map((p) => [p.id, p.categoryName]));
  const revenueByCategory = new Map<string, number>();
  const ordersByCategory = new Map<string, Set<string>>();

  for (const order of mockOrders) {
    for (const item of order.items) {
      const category = productCategory.get(item.productId) ?? "Other";
      revenueByCategory.set(category, (revenueByCategory.get(category) ?? 0) + item.subtotal);
      const orderSet = ordersByCategory.get(category) ?? new Set<string>();
      orderSet.add(order.id);
      ordersByCategory.set(category, orderSet);
    }
  }

  const total = [...revenueByCategory.values()].reduce((sum, v) => sum + v, 0);

  return [...revenueByCategory.entries()]
    .map(([name, revenue]) => ({
      name,
      revenue,
      orderCount: ordersByCategory.get(name)?.size ?? 0,
      percentOfTotal: total ? Math.round((revenue / total) * 1000) / 10 : 0,
    }))
    .sort((a, b) => b.revenue - a.revenue);
}

export default function RevenueAnalyticsPage() {
  const categories = buildCategoryRevenue();

  return (
    <div className="space-y-6">
      <PageHeader title="Revenue Analytics" description="Where revenue is coming from, by category." />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <CategoryPieChart
          title="Sales by Category"
          description="Revenue share by category"
          data={categories.map((c) => ({ name: c.name, value: c.revenue }))}
        />
        <Card className="h-full">
          <CardHeader className="border-b pb-4">
            <CardTitle className="text-base">Revenue Breakdown</CardTitle>
          </CardHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Revenue</TableHead>
                <TableHead className="text-right">% of Total</TableHead>
                <TableHead className="text-right">Orders</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.name}>
                  <TableCell className="font-medium text-foreground">{category.name}</TableCell>
                  <TableCell className="text-right">{formatPrice(category.revenue)}</TableCell>
                  <TableCell className="text-right text-muted-foreground">{category.percentOfTotal}%</TableCell>
                  <TableCell className="text-right text-muted-foreground">{category.orderCount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
}
