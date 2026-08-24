"use client";

import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/admin/ui/card";
import { formatCompactNumber } from "@/lib/admin/format";

export interface CustomerGrowthDatum {
  month: string;
  customers: number;
}

function TooltipContent({ active, payload }: { active?: boolean; payload?: { payload: CustomerGrowthDatum }[] }) {
  if (!active || !payload?.length) return null;
  const point = payload[0].payload;
  return (
    <div className="rounded-lg border border-border bg-popover px-3 py-2 text-xs shadow-md">
      <p className="font-medium text-foreground">{point.month}</p>
      <p className="mt-1 text-muted-foreground">
        Total customers: <span className="font-medium text-foreground">{point.customers}</span>
      </p>
    </div>
  );
}

export function CustomerGrowthChart({ data }: { data: CustomerGrowthDatum[] }) {
  return (
    <Card className="h-full">
      <CardHeader className="border-b pb-4">
        <CardTitle className="text-base">Customer Growth</CardTitle>
        <p className="mt-1 text-sm text-muted-foreground">Cumulative customers by month</p>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="h-72 w-full sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid vertical={false} stroke="var(--color-border)" strokeDasharray="3 6" />
              <XAxis
                dataKey="month"
                tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                minTickGap={24}
              />
              <YAxis
                tickFormatter={(value: number) => formatCompactNumber(value)}
                tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                width={32}
              />
              <Tooltip content={<TooltipContent />} cursor={{ stroke: "var(--color-border)" }} />
              <Line type="monotone" dataKey="customers" stroke="var(--color-primary)" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
