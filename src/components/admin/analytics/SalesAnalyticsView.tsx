"use client";

import { useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Calendar as CalendarIcon, IndianRupee, Percent, ShoppingBag, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/admin/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/admin/ui/popover";
import { Calendar } from "@/components/admin/ui/calendar";
import { Button } from "@/components/admin/ui/button";
import { cn } from "@/lib/utils";
import { formatAdminDate, formatCompactNumber } from "@/lib/admin/format";
import { formatPrice } from "@/utils/formatPrice";
import { MetricCard } from "@/components/admin/analytics/MetricCard";
import { RevenueTrendChart } from "@/components/admin/analytics/RevenueTrendChart";
import type { SalesPoint } from "@/types/admin";

const ranges = [
  { label: "Today", days: 1 },
  { label: "7 Days", days: 7 },
  { label: "30 Days", days: 30 },
  { label: "3 Months", days: 90 },
  { label: "6 Months", days: 180 },
  { label: "1 Year", days: 365 },
] as const;

function OrdersTooltip({ active, payload }: { active?: boolean; payload?: { payload: SalesPoint }[] }) {
  if (!active || !payload?.length) return null;
  const point = payload[0].payload;
  return (
    <div className="rounded-lg border border-border bg-popover px-3 py-2 text-xs shadow-md">
      <p className="font-medium text-foreground">{formatAdminDate(point.date)}</p>
      <p className="mt-1 text-muted-foreground">
        Orders: <span className="font-medium text-foreground">{point.orders}</span>
      </p>
    </div>
  );
}

export function SalesAnalyticsView({ data }: { data: SalesPoint[] }) {
  const [rangeDays, setRangeDays] = useState<number>(30);
  const [customDate, setCustomDate] = useState<Date | undefined>();

  const filtered = useMemo(() => data.slice(-rangeDays), [data, rangeDays]);

  const metrics = useMemo(() => {
    const revenue = filtered.reduce((sum, p) => sum + p.revenue, 0);
    const orders = filtered.reduce((sum, p) => sum + p.orders, 0);
    const aov = orders ? Math.round(revenue / orders) : 0;
    const sessions = Math.max(orders * 28, 1);
    const conversionRate = Math.min(9.9, (orders / sessions) * 100);
    return { revenue, orders, aov, conversionRate };
  }, [filtered]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-1 rounded-lg bg-muted p-1">
        {ranges.map((range) => (
          <button
            key={range.label}
            type="button"
            onClick={() => setRangeDays(range.days)}
            className={cn(
              "rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
              rangeDays === range.days ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {range.label}
          </button>
        ))}
        <Popover>
          <PopoverTrigger
            render={
              <Button variant="ghost" size="sm" className="gap-1.5 px-2.5 text-xs text-muted-foreground hover:text-foreground" />
            }
          >
            <CalendarIcon className="h-3.5 w-3.5" />
            Custom Date
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={customDate} onSelect={setCustomDate} />
          </PopoverContent>
        </Popover>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Revenue" value={formatPrice(metrics.revenue)} icon={IndianRupee} hint="Selected period" />
        <MetricCard label="Orders" value={metrics.orders.toLocaleString("en-IN")} icon={ShoppingBag} hint="Selected period" />
        <MetricCard label="Average Order Value" value={formatPrice(metrics.aov)} icon={TrendingUp} hint="Revenue / Orders" />
        <MetricCard label="Conversion Rate" value={`${metrics.conversionRate.toFixed(1)}%`} icon={Percent} hint="Orders / Sessions (est.)" />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <RevenueTrendChart data={filtered} />

        <Card className="h-full">
          <CardHeader className="border-b pb-4">
            <CardTitle className="text-base">Orders Trend</CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">{metrics.orders} orders in the selected period</p>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-72 w-full sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={filtered} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                  <CartesianGrid vertical={false} stroke="var(--color-border)" strokeDasharray="3 6" />
                  <XAxis
                    dataKey="date"
                    tickFormatter={(value: string) => formatAdminDate(value, { day: "2-digit", month: "short", year: undefined })}
                    tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    minTickGap={32}
                  />
                  <YAxis
                    tickFormatter={(value: number) => formatCompactNumber(value)}
                    tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    width={32}
                  />
                  <Tooltip content={<OrdersTooltip />} cursor={{ fill: "var(--color-muted)" }} />
                  <Bar dataKey="orders" fill="var(--color-primary)" radius={[4, 4, 0, 0]} maxBarSize={28} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
