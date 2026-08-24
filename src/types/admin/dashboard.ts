export interface KpiCard {
  label: string;
  value: string;
  changePercent: number;
  comparisonLabel: string;
}

export interface SalesPoint {
  date: string;
  revenue: number;
  orders: number;
}

export interface OrderStatusCount {
  status: string;
  count: number;
}
