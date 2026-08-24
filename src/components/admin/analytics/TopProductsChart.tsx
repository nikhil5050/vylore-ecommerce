"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/admin/ui/card";
import { formatCompactNumber } from "@/lib/admin/format";
import { formatPrice } from "@/utils/formatPrice";

export interface TopProductDatum {
  name: string;
  unitsSold: number;
  revenue: number;
}

function TooltipContent({ active, payload }: { active?: boolean; payload?: { payload: TopProductDatum }[] }) {
  if (!active || !payload?.length) return null;
  const point = payload[0].payload;
  return (
    <div className="rounded-lg border border-border bg-popover px-3 py-2 text-xs shadow-md">
      <p className="max-w-48 truncate font-medium text-foreground">{point.name}</p>
      <p className="mt-1 text-muted-foreground">
        Revenue: <span className="font-medium text-foreground">{formatPrice(point.revenue)}</span>
      </p>
      <p className="text-muted-foreground">
        Units sold: <span className="font-medium text-foreground">{point.unitsSold}</span>
      </p>
    </div>
  );
}

export function TopProductsChart({ data }: { data: TopProductDatum[] }) {
  return (
    <Card className="h-full">
      <CardHeader className="border-b pb-4">
        <CardTitle className="text-base">Top Products</CardTitle>
        <p className="mt-1 text-sm text-muted-foreground">Ranked by revenue</p>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ top: 4, right: 16, left: 8, bottom: 4 }}>
              <CartesianGrid horizontal={false} stroke="var(--color-border)" strokeDasharray="3 6" />
              <XAxis
                type="number"
                tickFormatter={(value: number) => formatCompactNumber(value)}
                tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                type="category"
                dataKey="name"
                width={120}
                tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(value: string) => (value.length > 16 ? `${value.slice(0, 16)}…` : value)}
              />
              <Tooltip content={<TooltipContent />} cursor={{ fill: "var(--color-muted)" }} />
              <Bar dataKey="revenue" fill="var(--color-primary)" radius={[0, 4, 4, 0]} maxBarSize={18} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
