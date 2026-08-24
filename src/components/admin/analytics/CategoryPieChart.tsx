"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/admin/ui/card";
import { formatPrice } from "@/utils/formatPrice";

export interface CategorySliceDatum {
  name: string;
  value: number;
}

const COLORS = [
  "var(--color-primary)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
];

function TooltipContent({ active, payload }: { active?: boolean; payload?: { payload: CategorySliceDatum; value: number }[] }) {
  if (!active || !payload?.length) return null;
  const point = payload[0].payload;
  return (
    <div className="rounded-lg border border-border bg-popover px-3 py-2 text-xs shadow-md">
      <p className="font-medium text-foreground">{point.name}</p>
      <p className="mt-1 text-muted-foreground">{formatPrice(point.value)}</p>
    </div>
  );
}

interface CategoryPieChartProps {
  title: string;
  description?: string;
  data: CategorySliceDatum[];
}

export function CategoryPieChart({ title, description, data }: CategoryPieChartProps) {
  return (
    <Card className="h-full">
      <CardHeader className="border-b pb-4">
        <CardTitle className="text-base">{title}</CardTitle>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <div className="h-64 w-full sm:h-72 sm:flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data} dataKey="value" nameKey="name" innerRadius="55%" outerRadius="85%" paddingAngle={2} strokeWidth={0}>
                  {data.map((entry, index) => (
                    <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<TooltipContent />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="w-full space-y-2 sm:w-40">
            {data.map((entry, index) => (
              <li key={entry.name} className="flex items-center gap-2 text-xs">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                <span className="flex-1 truncate text-muted-foreground">{entry.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
