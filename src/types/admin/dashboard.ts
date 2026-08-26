export interface KpiCard {
  label: string;
  value: string;
  changePercent?: number;
  comparisonLabel?: string;
}

export interface OrderStatusCount {
  status: string;
  count: number;
}
