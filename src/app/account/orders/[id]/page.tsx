import OrderDetailClient from "./OrderDetailClient";

export function generateStaticParams(): { id: string }[] {
  return [{ id: "placeholder" }];
}

export default function OrderDetailPage({ params }: PageProps<"/account/orders/[id]">) {
  return <OrderDetailClient params={params} />;
}
