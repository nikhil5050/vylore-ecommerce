"use client";

import { useEffect, useState } from "react";
import { AddressForm } from "@/components/checkout/AddressForm";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { createAddress, deleteAddress, listAddresses, setDefaultAddress, type SavedAddress } from "@/services/address.service";

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<SavedAddress[] | undefined>(undefined);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    listAddresses().then(setAddresses);
  }, []);

  if (addresses === undefined) return null;

  return (
    <div>
      {addresses.length === 0 ? (
        <EmptyState title="No saved addresses" description="Add an address to speed up checkout next time." />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {addresses.map((address) => (
            <Card key={address.id} className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm text-charcoal">{address.fullName}</p>
                  <p className="mt-1 text-sm text-muted">
                    {address.line1}
                    {address.line2 ? `, ${address.line2}` : ""}
                  </p>
                  <p className="text-sm text-muted">
                    {address.city}, {address.state} {address.postalCode}
                  </p>
                </div>
                {address.isDefault && <span className="eyebrow shrink-0 text-[10px] text-burgundy">Default</span>}
              </div>
              <div className="mt-4 flex gap-4">
                {!address.isDefault && (
                  <button
                    type="button"
                    onClick={async () => {
                      await setDefaultAddress(address.id);
                      setAddresses(await listAddresses());
                    }}
                    className="eyebrow text-xs text-burgundy"
                  >
                    Set as Default
                  </button>
                )}
                <button
                  type="button"
                  onClick={async () => {
                    await deleteAddress(address.id);
                    setAddresses(await listAddresses());
                  }}
                  className="eyebrow text-xs text-muted transition-colors hover:text-burgundy"
                >
                  Remove
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <div className="mt-8">
        {showForm ? (
          <div className="max-w-md">
            <AddressForm
              submitLabel="Save Address"
              onSubmit={async (address) => {
                await createAddress(address);
                setAddresses(await listAddresses());
                setShowForm(false);
              }}
            />
          </div>
        ) : (
          <Button variant="secondary" size="md" onClick={() => setShowForm(true)}>
            Add New Address
          </Button>
        )}
      </div>
    </div>
  );
}
