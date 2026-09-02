import { apiFetch } from "@/lib/api";
import type { CartLine } from "@/store/cart.store";
import type { ShippingAddress } from "@/types/order";

interface PayUCheckoutParams {
  action_url: string;
  key: string;
  txnid: string;
  amount: string;
  productinfo: string;
  firstname: string;
  email: string;
  phone: string;
  surl: string;
  furl: string;
  hash: string;
}

// The backend cart is the source of truth at checkout time; the local
// zustand cart only drives pre-auth browsing UX. Sync by clearing and
// re-adding rather than diffing, since it's simpler and this only runs once
// per checkout (and once per "Share Cart" click — see shared-cart.service.ts,
// which needs the backend cart populated before it can snapshot it).
// NOTE: variant-based products aren't supported yet — line.size has no
// backend variant_id to map to, so only plain (non-variant) products sync
// correctly right now.
export async function syncCartToBackend(lines: CartLine[]): Promise<void> {
  await apiFetch("/cart", { method: "DELETE" });
  for (const line of lines) {
    await apiFetch("/cart/items", {
      method: "POST",
      body: { product_id: Number(line.product.id), quantity: line.quantity },
    });
  }
}

interface CreatedAddress {
  id: number;
}

async function createShippingAddress(address: ShippingAddress): Promise<CreatedAddress> {
  return apiFetch<CreatedAddress>("/addresses", {
    method: "POST",
    body: {
      recipient_name: address.fullName,
      phone: address.phone,
      address_line_1: address.line1,
      address_line_2: address.line2 || undefined,
      city: address.city,
      state: address.state,
      postal_code: address.postalCode,
      country: address.country,
    },
  });
}

interface CreatedOrder {
  id: number;
  order_number: string;
}

async function createOrder(addressId: number, paymentMethod: string): Promise<CreatedOrder> {
  return apiFetch<CreatedOrder>("/checkout/create", {
    method: "POST",
    body: { address_id: addressId, payment_method: paymentMethod === "cod" ? "cod" : "prepaid" },
  });
}

async function initiatePayuPayment(orderId: number): Promise<PayUCheckoutParams> {
  return apiFetch<PayUCheckoutParams>("/payments/payu/initiate", { method: "POST", body: { order_id: orderId } });
}

// PayU's hosted checkout is a real browser form POST, not an API call the
// frontend can fetch() — this builds and submits that form, navigating the
// browser away to PayU.
function redirectToPayU(params: PayUCheckoutParams): void {
  const form = document.createElement("form");
  form.method = "POST";
  form.action = params.action_url;

  const fields: Record<string, string> = {
    key: params.key,
    txnid: params.txnid,
    amount: params.amount,
    productinfo: params.productinfo,
    firstname: params.firstname,
    email: params.email,
    phone: params.phone,
    surl: params.surl,
    furl: params.furl,
    hash: params.hash,
  };

  for (const [name, value] of Object.entries(fields)) {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    input.value = value;
    form.appendChild(input);
  }

  document.body.appendChild(form);
  form.submit();
}

// Full checkout: sync cart -> create address -> create order -> (prepaid only)
// initiate PayU -> redirect to PayU's hosted checkout. A COD order is already
// fully confirmed by /checkout/create — there's no payment step, so this just
// sends the browser straight to the same order-confirmation page a PayU
// success redirect lands on. Throws ApiError on failure (e.g. insufficient
// stock, COD not available for this order/address) so the caller can show it
// and let the user retry.
export async function placeOrder(lines: CartLine[], address: ShippingAddress, paymentMethod: string): Promise<void> {
  await syncCartToBackend(lines);
  const createdAddress = await createShippingAddress(address);
  const order = await createOrder(createdAddress.id, paymentMethod);

  if (paymentMethod === "cod") {
    window.location.href = `/order-confirmation?order_number=${encodeURIComponent(order.order_number)}`;
    return;
  }

  const paymentParams = await initiatePayuPayment(order.id);
  redirectToPayU(paymentParams);
}
