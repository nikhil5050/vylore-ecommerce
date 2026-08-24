import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/admin/ui/card";
import { formatAdminDate, formatCompactNumber } from "@/lib/admin/format";
import { formatPrice } from "@/utils/formatPrice";
import type { SalesPoint } from "@/types/admin";

function TooltipContent({ active, payload }: { active?: boolean; payload?: { payload: SalesPoint }[] }) {
  if (!active || !payload?.length) return null;
  const point = payload[0].payload;
  return (
    <div className="rounded-lg border border-border bg-popover px-3 py-2 text-xs shadow-md">
      <p className="font-medium text-foreground">{formatAdminDate(point.date)}</p>
      <p className="mt-1 text-muted-foreground">
        Revenue: <span className="font-medium text-foreground">{formatPrice(point.revenue)}</span>
      </p>
    </div>
  );
}

export function RevenueTrendChart({ data }: { data: SalesPoint[] }) {
  const total = data.reduce((sum, p) => sum + p.revenue, 0);

  return (
    <Card className="h-full">
      <CardHeader className="border-b pb-4">
        <CardTitle className="text-base">Revenue Trend</CardTitle>
        <p className="mt-1 text-sm text-muted-foreground">{formatPrice(total)} in the selected period</p>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="h-72 w-full sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="revenueTrend" x1="0" y1="0" x2="0" y2="1">
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
              <Area type="monotone" dataKey="revenue" stroke="var(--color-primary)" strokeWidth={2} fill="url(#revenueTrend)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
