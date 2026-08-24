import type { Metadata } from "next";
import Link from "next/link";
import { Truck } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { SettingsNav } from "@/components/admin/SettingsNav";
import { Card, CardContent } from "@/components/admin/ui/card";
import { Button } from "@/components/admin/ui/button";

export const metadata: Metadata = { title: "iCarry Settings" };

export default function IcarrySettingsRedirectPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="iCarry Settings" description="Delivery partner connection settings." />
      <SettingsNav />
      <Card>
        <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Truck className="h-5 w-5" strokeWidth={1.75} />
          </span>
          <div>
            <p className="text-sm font-medium text-foreground">iCarry connection settings have moved</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage your API keys, warehouse address and automation rules from Shipping → iCarry Integration.
            </p>
          </div>
          <Button render={<Link href="/admin/shipping/icarry" />} className="mt-1">
            Go to iCarry Integration
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
