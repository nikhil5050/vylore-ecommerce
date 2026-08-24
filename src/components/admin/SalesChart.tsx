"use client";

import { useMemo, useState } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/admin/ui/card";
import { cn } from "@/lib/utils";
import { formatAdminDate, formatCompactNumber } from "@/lib/admin/format";
import { formatPrice } from "@/utils/formatPrice";
import type { SalesPoint } from "@/types/admin";

const ranges = [
  { label: "7 Days", days: 7 },
  { label: "30 Days", days: 30 },
  { label: "3 Months", days: 90 },
  { label: "6 Months", days: 180 },
  { label: "1 Year", days: 365 },
] as const;

function TooltipContent({ active, payload }: { active?: boolean; payload?: { payload: SalesPoint }[] }) {
  if (!active || !payload?.length) return null;
  const point = payload[0].payload;
  return (
    <div className="rounded-lg border border-border bg-popover px-3 py-2 text-xs shadow-md">
      <p className="font-medium text-foreground">{formatAdminDate(point.date)}</p>
      <p className="mt-1 text-muted-foreground">
        Revenue: <span className="font-medium text-foreground">{formatPrice(point.revenue)}</span>
      </p>
      <p className="text-muted-foreground">
        Orders: <span className="font-medium text-foreground">{point.orders}</span>
      </p>
    </div>
  );
}

export function SalesChart({ data }: { data: SalesPoint[] }) {
  const [rangeDays, setRangeDays] = useState<number>(30);

  const filtered = useMemo(() => data.slice(-rangeDays), [data, rangeDays]);
  const totalRevenue = useMemo(() => filtered.reduce((sum, p) => sum + p.revenue, 0), [filtered]);
  const totalOrders = useMemo(() => filtered.reduce((sum, p) => sum + p.orders, 0), [filtered]);

  return (
    <Card className="h-full">
      <CardHeader className="flex-row items-start justify-between gap-4 border-b pb-4">
        <div>
          <CardTitle className="text-base">Sales Overview</CardTitle>
          <p className="mt-1 text-sm text-muted-foreground">
            {formatPrice(totalRevenue)} revenue &middot; {totalOrders} orders
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-1 rounded-lg bg-muted p-1">
          {ranges.map((range) => (
            <button
              key={range.label}
              type="button"
              onClick={() => setRangeDays(range.days)}
              className={cn(
                "rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
                rangeDays === range.days
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {range.label}
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="h-72 w-full sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={filtered} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="salesRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.24} />
                  <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
                </linearGradient>
              </defs>
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
                width={44}
              />
              <Tooltip content={<TooltipContent />} cursor={{ stroke: "var(--color-border)" }} />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="var(--color-primary)"
                strokeWidth={2}
                fill="url(#salesRevenue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
