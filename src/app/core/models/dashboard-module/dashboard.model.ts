export interface DashboardStats {
  totalProperties: number;
  totalRooms: number;
  totalTenants: number;
}

export interface MonthlyEarning {
  month: string;      // 'Jan', 'Feb', ...
  expected: number;
  earned: number;
}

export interface RoomOccupancySummary {
  occupied: number;
  available: number;
}

export interface RentStatusSummary {
  paid: number;
  pending: number;
}