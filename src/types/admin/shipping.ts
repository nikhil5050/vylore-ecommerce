export type ShipmentStatus =
  | "ready_to_ship"
  | "picked_up"
  | "in_transit"
  | "out_for_delivery"
  | "delivered"
  | "failed_delivery"
  | "returned";

export interface Shipment {
  id: string;
  orderId: string;
  customerName: string;
  courier: string;
  awb: string;
  pickupDate?: string;
  expectedDelivery?: string;
  status: ShipmentStatus;
  destinationCity: string;
}

export interface DeliveryPartner {
  id: string;
  name: string;
  logoUrl?: string;
  active: boolean;
  serviceableAreas: string;
  avgDeliveryDays: number;
}

export type IcarryEnvironment = "sandbox" | "production";

export interface IcarrySettings {
  apiKey: string;
  secretKey: string;
  environment: IcarryEnvironment;
  defaultPickupLocation: string;
  warehouseAddress: string;
  contactNumber: string;
  autoCreateShipment: boolean;
  autoUpdateTracking: boolean;
  autoUpdateOrderStatus: boolean;
  connected: boolean;
}

export interface TrackingEvent {
  id: string;
  status: ShipmentStatus;
  location: string;
  timestamp: string;
  note?: string;
}
