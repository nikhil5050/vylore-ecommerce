"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { createOrder } from "@/services/order.service";
import type { PaymentMethod } from "@/services/payment.service";
import type { DeliveryOption } from "@/services/shipping.service";
import { useCartStore } from "@/store/cart.store";
import { useOrderStore } from "@/store/order.store";
import type { ShippingAddress } from "@/types/order";
import { AddressForm } from "./AddressForm";
import { CheckoutStep } from "./CheckoutStep";
import { ContactForm } from "./ContactForm";
import { DeliveryForm } from "./DeliveryForm";
import { OrderSummary } from "./OrderSummary";
import { PaymentMethodForm } from "./PaymentMethodForm";
import { ReviewStep } from "./ReviewStep";
import type { ContactInfo } from "./types";

interface CheckoutFlowProps {
  deliveryOptions: DeliveryOption[];
  paymentMethods: PaymentMethod[];
}

type Step = 1 | 2 | 3 | 4 | 5;

export function CheckoutFlow({ deliveryOptions, paymentMethods }: CheckoutFlowProps) {
  const router = useRouter();
  const lines = useCartStore((state) => state.lines);
  const clearCart = useCartStore((state) => state.clear);
  const addOrder = useOrderStore((state) => state.addOrder);

  const [step, setStep] = useState<Step>(1);
  const [contact, setContact] = useState<ContactInfo | undefined>(undefined);
  const [address, setAddress] = useState<ShippingAddress | undefined>(undefined);
  const [deliveryOptionId, setDeliveryOptionId] = useState<string | undefined>(undefined);
  const [paymentMethodId, setPaymentMethodId] = useState<string | undefined>(undefined);
  const [placing, setPlacing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const total = lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0);

  async function handlePlaceOrder() {
    if (!contact || !address || !deliveryOptionId || !paymentMethodId) return;
    setPlacing(true);

    const order = await createOrder({
      items: lines.map((line) => ({
        productId: line.product.id,
        name: line.product.name,
        slug: line.product.slug,
        price: line.product.price,
        quantity: line.quantity,
        size: line.size,
      })),
      subtotal: total,
      total,
      email: contact.email,
      phone: contact.phone,
      shippingAddress: address,
      deliveryOptionId,
      paymentMethodId,
    });

    addOrder(order);
    setOrderPlaced(true);
    clearCart();
    router.push("/order-confirmation");
  }

  if (lines.length === 0 && !orderPlaced) {
    return (
      <main className="flex flex-1 flex-col">
        <Container className="py-16 lg:py-24">
          <EmptyState
            title="Your bag is empty"
            description="Add something to your bag before checking out."
            action={
              <Button href="/shop" variant="primary" size="md">
                Continue Shopping
              </Button>
            }
          />
        </Container>
      </main>
    );
  }

  const selectedDelivery = deliveryOptions.find((option) => option.id === deliveryOptionId);
  const selectedPayment = paymentMethods.find((method) => method.id === paymentMethodId);

  return (
    <main className="flex flex-1 flex-col">
      <Container className="py-16 lg:py-24">
        <h1 className="font-serif text-4xl text-charcoal sm:text-5xl">Checkout</h1>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
          <div className="order-2 flex flex-col gap-4 lg:order-1">
            <CheckoutStep
              index={1}
              title="Contact Information"
              status={step === 1 ? "active" : contact ? "complete" : "upcoming"}
              onEdit={() => setStep(1)}
              summary={
                contact && (
                  <p>
                    {contact.email} · {contact.phone}
                  </p>
                )
              }
            >
              <ContactForm
                defaultValue={contact}
                onSubmit={(value) => {
                  setContact(value);
                  setStep(2);
                }}
              />
            </CheckoutStep>

            <CheckoutStep
              index={2}
              title="Shipping Address"
              status={step === 2 ? "active" : address ? "complete" : "upcoming"}
              onEdit={() => setStep(2)}
              summary={
                address && (
                  <p>
                    {address.fullName}, {address.line1}, {address.city}, {address.state} {address.postalCode}
                  </p>
                )
              }
            >
              <AddressForm
                defaultValue={address}
                onSubmit={(value) => {
                  setAddress(value);
                  setStep(3);
                }}
              />
            </CheckoutStep>

            <CheckoutStep
              index={3}
              title="Delivery"
              status={step === 3 ? "active" : selectedDelivery ? "complete" : "upcoming"}
              onEdit={() => setStep(3)}
              summary={selectedDelivery && <p>{selectedDelivery.label}</p>}
            >
              <DeliveryForm
                options={deliveryOptions}
                defaultValue={deliveryOptionId}
                onSubmit={(id) => {
                  setDeliveryOptionId(id);
                  setStep(4);
                }}
              />
            </CheckoutStep>

            <CheckoutStep
              index={4}
              title="Payment"
              status={step === 4 ? "active" : selectedPayment ? "complete" : "upcoming"}
              onEdit={() => setStep(4)}
              summary={selectedPayment && <p>{selectedPayment.label}</p>}
            >
              <PaymentMethodForm
                methods={paymentMethods}
                defaultValue={paymentMethodId}
                onSubmit={(id) => {
                  setPaymentMethodId(id);
                  setStep(5);
                }}
              />
            </CheckoutStep>

            <CheckoutStep index={5} title="Review Order" status={step === 5 ? "active" : "upcoming"}>
              {contact && address && selectedDelivery && selectedPayment && (
                <ReviewStep
                  contact={contact}
                  address={address}
                  deliveryOption={selectedDelivery}
                  paymentMethod={selectedPayment}
                  onPlaceOrder={handlePlaceOrder}
                  placing={placing}
                />
              )}
            </CheckoutStep>
          </div>

          <div className="order-1 lg:order-2">
            <OrderSummary lines={lines} total={total} />
          </div>
        </div>
      </Container>
    </main>
  );
}
