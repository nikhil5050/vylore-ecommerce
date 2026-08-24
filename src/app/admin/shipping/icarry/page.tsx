import { PageHeader } from "@/components/admin/PageHeader";
import { IcarySettings } from "@/components/admin/IcarySettings";
import { getIcarrySettings } from "@/lib/admin/api";

export default async function IcarryIntegrationPage() {
  const settings = await getIcarrySettings();

  return (
    <div className="space-y-6">
      <PageHeader title="iCarry Integration" description="Connect Vylore to iCarry for shipment creation, tracking and delivery updates." />
      <IcarySettings initialSettings={settings} />
    </div>
  );
}
