"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Eye, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/admin/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/admin/ui/table";
import { Input } from "@/components/admin/ui/input";
import { Avatar, AvatarFallback } from "@/components/admin/ui/avatar";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import type { StatusTone } from "@/lib/admin/status";
import { formatAdminDate } from "@/lib/admin/format";
import { formatPrice } from "@/utils/formatPrice";
import type { Customer, CustomerStatus } from "@/types/admin";

const customerStatusTone: Record<CustomerStatus, StatusTone> = {
  active: "success",
  inactive: "neutral",
  blocked: "error",
};

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function CustomerTable({ customers }: { customers: Customer[] }) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return customers;
    return customers.filter(
      (c) => c.name.toLowerCase().includes(query) || c.email.toLowerCase().includes(query),
    );
  }, [customers, search]);

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between gap-4 border-b pb-4">
        <CardTitle className="text-base">
          Customers <span className="font-sans text-sm font-normal text-muted-foreground">({filtered.length})</span>
        </CardTitle>
        <div className="relative">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name or email…"
            className="w-56 pl-8"
          />
        </div>
      </CardHeader>
      {filtered.length === 0 ? (
        <CardContent>
          <AdminEmptyState title="No customers found" description="Try a different search term." />
        </CardContent>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Orders</TableHead>
              <TableHead>Total Spent</TableHead>
              <TableHead>Last Order</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>
                  <Link href={`/admin/customers/${customer.id}`} className="flex items-center gap-2.5 hover:text-primary">
                    <Avatar size="sm">
                      <AvatarFallback>{initials(customer.name)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-foreground">{customer.name}</span>
                  </Link>
                </TableCell>
                <TableCell className="text-muted-foreground">{customer.email}</TableCell>
                <TableCell className="text-muted-foreground">{customer.phone}</TableCell>
                <TableCell>{customer.ordersCount}</TableCell>
                <TableCell className="font-medium text-foreground">{formatPrice(customer.totalSpent)}</TableCell>
                <TableCell className="text-muted-foreground">
                  {customer.lastOrderAt ? formatAdminDate(customer.lastOrderAt) : "—"}
                </TableCell>
                <TableCell>
                  <StatusBadge status={customer.status} tone={customerStatusTone[customer.status]} />
                </TableCell>
                <TableCell className="text-right">
                  <Link
                    href={`/admin/customers/${customer.id}`}
                    className="ml-auto flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
                    aria-label={`View ${customer.name}`}
                  >
                    <Eye className="h-4 w-4" />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Card>
  );
}
