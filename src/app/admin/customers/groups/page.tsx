import type { Metadata } from "next";
import { Users } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/admin/ui/card";
import { Button } from "@/components/admin/ui/button";
import { getCustomerGroups } from "@/lib/admin/api";

export const metadata: Metadata = { title: "Customer Groups" };

export default async function CustomerGroupsPage() {
  const groups = await getCustomerGroups();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Customer Groups"
        description="Segment customers to target offers and discounts."
        actions={<Button size="sm">Add Group</Button>}
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {groups.map((group) => (
          <Card key={group.id}>
            <CardHeader className="flex-row items-start justify-between gap-3 border-b pb-4">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Users className="h-4 w-4" />
                </span>
                <CardTitle className="text-base">{group.name}</CardTitle>
              </div>
              {group.discountPercent !== undefined && (
                <span className="rounded-full bg-success/10 px-2.5 py-0.5 text-xs font-medium text-success">
                  {group.discountPercent}% off
                </span>
              )}
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-sm text-muted-foreground">{group.description}</p>
              <p className="mt-3 text-sm">
                <span className="font-serif text-xl font-semibold text-foreground">{group.customerCount}</span>{" "}
                <span className="text-muted-foreground">customers</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
