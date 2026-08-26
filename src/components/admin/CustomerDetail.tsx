"use client";

import Link from "next/link";
import { ArrowLeft, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/admin/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/admin/ui/tabs";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { OrdersTable } from "@/components/admin/OrdersTable";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import type { StatusTone } from "@/lib/admin/status";
import { formatAdminDate } from "@/lib/admin/format";
import { formatPrice } from "@/utils/formatPrice";
import type { AdminOrder, Customer, CustomerStatus } from "@/types/admin";

const customerStatusTone: Record<CustomerStatus, StatusTone> = {
  active: "success",
  inactive: "neutral",
};

interface CustomerDetailProps {
  customer: Customer;
  orders: AdminOrder[];
}

export function CustomerDetail({ customer, orders }: CustomerDetailProps) {
  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin/customers" className="mb-2 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to customers
        </Link>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="font-serif text-2xl font-semibold text-foreground">{customer.name}</h1>
          <StatusBadge status={customer.status} tone={customerStatusTone[customer.status]} />
        </div>
        <p className="mt-1 text-sm text-muted-foreground">Customer since {formatAdminDate(customer.joinedAt)}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="pt-4">
            <p className="text-sm text-muted-foreground">Total Spent</p>
            <p className="mt-1 font-serif text-2xl font-semibold text-foreground">{formatPrice(customer.totalSpent)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-sm text-muted-foreground">Average Order Value</p>
            <p className="mt-1 font-serif text-2xl font-semibold text-foreground">{formatPrice(customer.averageOrderValue)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-sm text-muted-foreground">Orders</p>
            <p className="mt-1 font-serif text-2xl font-semibold text-foreground">{customer.ordersCount}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="orders">Orders ({orders.length})</TabsTrigger>
          <TabsTrigger value="addresses">Addresses</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-4">
          <Card>
            <CardHeader className="border-b pb-3">
              <CardTitle className="text-sm">Profile</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-2">
              <div>
                <p className="text-xs text-muted-foreground">Full Name</p>
                <p className="font-medium text-foreground">{customer.name}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="font-medium text-foreground">{customer.email}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Phone</p>
                <p className="font-medium text-foreground">{customer.phone}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Status</p>
                <StatusBadge status={customer.status} tone={customerStatusTone[customer.status]} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Joined</p>
                <p className="font-medium text-foreground">{formatAdminDate(customer.joinedAt)}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="mt-4">
          {orders.length === 0 ? (
            <AdminEmptyState title="No orders yet" description="This customer hasn't placed an order." />
          ) : (
            <OrdersTable orders={orders} compact />
          )}
        </TabsContent>

        <TabsContent value="addresses" className="mt-4">
          {customer.addresses.length === 0 ? (
            <AdminEmptyState title="No saved addresses" description="This customer hasn't added a delivery address." />
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {customer.addresses.map((address) => (
                <Card key={address.id}>
                  <CardHeader className="flex-row items-center justify-between gap-2 border-b pb-3">
                    <CardTitle className="flex items-center gap-1.5 text-sm">
                      <MapPin className="h-3.5 w-3.5 text-muted-foreground" /> Address
                    </CardTitle>
                    {address.isDefault && (
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">Default</span>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-0.5 pt-3 text-sm text-muted-foreground">
                    <p className="font-medium text-foreground">{address.fullName}</p>
                    <p>{address.line1}</p>
                    {address.line2 && <p>{address.line2}</p>}
                    <p>
                      {address.city}, {address.state} {address.postalCode}
                    </p>
                    <p>{address.country}</p>
                    {address.phone && <p className="pt-1">{address.phone}</p>}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
