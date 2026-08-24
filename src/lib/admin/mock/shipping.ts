import type { DeliveryPartner, IcarrySettings, Shipment, ShipmentStatus, TrackingEvent } from "@/types/admin";
import { mockOrders } from "./orders";

const statusForOrder: Record<string, ShipmentStatus> = {
  pending: "ready_to_ship",
  processing: "ready_to_ship",
  shipped: "in_transit",
  delivered: "delivered",
  cancelled: "returned",
  refunded: "returned",
};

const cities = ["Mumbai", "Pune", "Bengaluru", "Delhi", "Hyderabad", "Ahmedabad", "Chennai", "Kolkata"];

export const mockShipments: Shipment[] = mockOrders
  .filter((order) => order.status !== "pending")
  .map((order, index) => ({
    id: `SHP-${(700000 + index * 53).toString()}`,
    orderId: order.id,
    customerName: order.customerName,
    courier: "iCarry",
    awb: `ICR${(9000000000 + index * 917).toString()}`,
    pickupDate: order.placedAt,
    expectedDelivery: order.placedAt,
    status: statusForOrder[order.status],
    destinationCity: cities[index % cities.length],
  }));

export const mockDeliveryPartners: DeliveryPartner[] = [
  { id: "dp-icarry", name: "iCarry", active: true, serviceableAreas: "Pan-India, 19,000+ pincodes", avgDeliveryDays: 4 },
  { id: "dp-bluedart", name: "Blue Dart", active: false, serviceableAreas: "Metro cities", avgDeliveryDays: 3 },
  { id: "dp-delhivery", name: "Delhivery", active: false, serviceableAreas: "Pan-India", avgDeliveryDays: 5 },
];

export const mockIcarrySettings: IcarrySettings = {
  apiKey: "",
  secretKey: "",
  environment: "sandbox",
  defaultPickupLocation: "Vylore Warehouse — Andheri East",
  warehouseAddress: "Unit 4, Silver Arcade Industrial Estate, Andheri East, Mumbai, Maharashtra 400069",
  contactNumber: "+91 98200 00000",
  autoCreateShipment: true,
  autoUpdateTracking: true,
  autoUpdateOrderStatus: false,
  connected: false,
};

export const mockTrackingEvents: Record<string, TrackingEvent[]> = Object.fromEntries(
  mockShipments.slice(0, 6).map((shipment, index) => [
    shipment.orderId,
    [
      { id: `${shipment.id}-e1`, status: "ready_to_ship", location: "Vylore Warehouse, Mumbai", timestamp: shipment.pickupDate ?? "" },
      { id: `${shipment.id}-e2`, status: "picked_up", location: "Mumbai Hub", timestamp: shipment.pickupDate ?? "" },
      ...(index % 2 === 0
        ? [
            { id: `${shipment.id}-e3`, status: "in_transit" as ShipmentStatus, location: `${shipment.destinationCity} Hub`, timestamp: shipment.expectedDelivery ?? "" },
            { id: `${shipment.id}-e4`, status: shipment.status, location: shipment.destinationCity, timestamp: shipment.expectedDelivery ?? "" },
          ]
        : [{ id: `${shipment.id}-e3`, status: shipment.status, location: shipment.destinationCity, timestamp: shipment.expectedDelivery ?? "" }]),
    ],
  ]),
);
