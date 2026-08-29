export interface RevenueSummary {
  month: string;
  totalRevenue: number;
  totalCollected: number;
  totalPending: number;
  propertyBreakdown?: { propertyName: string; amount: number }[];
}