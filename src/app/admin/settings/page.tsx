"use client";

import { useRouter } from "next/navigation";
import { LogOut, Mail, Phone, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/admin/ui/card";
import { Button } from "@/components/admin/ui/button";
import { Avatar, AvatarFallback } from "@/components/admin/ui/avatar";
import { useAuthStore } from "@/store/auth.store";

export default function AdminSettingsPage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const initials = user ? `${user.first_name[0] ?? ""}${user.last_name[0] ?? ""}`.toUpperCase() || "A" : "A";

  function handleLogout() {
    logout();
    router.replace("/login");
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Settings" description="Your admin account." />

      <Card className="max-w-lg">
        <CardHeader className="flex-row items-center gap-3 border-b pb-4">
          <Avatar size="lg">
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-base">
              {user ? `${user.first_name} ${user.last_name}`.trim() : "Admin"}
            </CardTitle>
            <p className="text-xs text-muted-foreground">Logged in</p>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 pt-4 text-sm">
          <div className="flex items-center gap-2.5 text-muted-foreground">
            <Mail className="h-4 w-4 shrink-0" />
            <span className="text-foreground">{user?.email ?? "—"}</span>
          </div>
          {user?.phone && (
            <div className="flex items-center gap-2.5 text-muted-foreground">
              <Phone className="h-4 w-4 shrink-0" />
              <span className="text-foreground">{user.phone}</span>
            </div>
          )}
          <div className="flex items-center gap-2.5 text-muted-foreground">
            <ShieldCheck className="h-4 w-4 shrink-0" />
            <span className="text-foreground capitalize">{user?.role ?? "—"}</span>
          </div>
        </CardContent>
      </Card>

      <Button variant="destructive" onClick={handleLogout}>
        <LogOut className="h-4 w-4" /> Log out
      </Button>
    </div>
  );
}
