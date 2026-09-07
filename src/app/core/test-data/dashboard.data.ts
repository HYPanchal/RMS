import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import {
  DashboardStats,
  MonthlyEarning,
  RoomOccupancySummary,
  RentStatusSummary
} from '../models/dashboard-module/dashboard.model';

const MOCK_STATS: DashboardStats = {
  totalProperties: 3,
  totalRooms: 37,
  totalTenants: 28
};

const MOCK_EARNINGS: MonthlyEarning[] = [
  { month: 'Jan', expected: 42000, earned: 38000 },
  { month: 'Feb', expected: 42000, earned: 40500 },
  { month: 'Mar', expected: 44000, earned: 41000 },
  { month: 'Apr', expected: 44000, earned: 44000 },
  { month: 'May', expected: 46000, earned: 43500 },
  { month: 'Jun', expected: 46000, earned: 45000 },
  { month: 'Jul', expected: 48000, earned: 46200 },
  { month: 'Aug', expected: 48000, earned: 47000 },
  { month: 'Sep', expected: 50000, earned: 48500 },
  { month: 'Oct', expected: 50000, earned: 49000 },
  { month: 'Nov', expected: 52000, earned: 50000 },
  { month: 'Dec', expected: 52000, earned: 51500 }
];

const MOCK_ROOM_OCCUPANCY: RoomOccupancySummary = { occupied: 28, available: 9 };
const MOCK_RENT_STATUS: RentStatusSummary = { paid: 22, pending: 6 };

export function getMockStats(): Observable<DashboardStats> {
  return of(MOCK_STATS).pipe(delay(300));
}

export function getMockMonthlyEarnings(): Observable<MonthlyEarning[]> {
  return of(MOCK_EARNINGS).pipe(delay(300));
}

export function getMockRoomOccupancy(): Observable<RoomOccupancySummary> {
  return of(MOCK_ROOM_OCCUPANCY).pipe(delay(300));
}

export function getMockRentStatus(): Observable<RentStatusSummary> {
  return of(MOCK_RENT_STATUS).pipe(delay(300));
}