import { Card, CardContent, CardHeader, CardTitle } from "@/components/admin/ui/card";
import { orderStatusTone, statusDotClass } from "@/lib/admin/status";
import { cn } from "@/lib/utils";
import type { OrderStatusCount } from "@/types/admin";

export function OrderStatusCard({ statuses }: { statuses: OrderStatusCount[] }) {
  const total = statuses.reduce((sum, s) => sum + s.count, 0);

  return (
    <Card className="h-full">
      <CardHeader className="border-b pb-4">
        <CardTitle className="text-base">Order Status</CardTitle>
        <p className="mt-1 text-sm text-muted-foreground">{total} orders in the last 30 days</p>
      </CardHeader>
      <CardContent className="space-y-4 pt-4">
        {statuses.map((item) => {
          const tone = orderStatusTone[item.status.toLowerCase()] ?? "neutral";
          const percent = total ? Math.round((item.count / total) * 100) : 0;
          return (
            <div key={item.status}>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 font-medium text-foreground">
                  <span className={cn("inline-flex h-2 w-2 rounded-full", statusDotClass(tone))} />
                  {item.status}
                </span>
                <span className="text-muted-foreground">{item.count}</span>
              </div>
              <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className={cn("h-full rounded-full", statusDotClass(tone))}
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
