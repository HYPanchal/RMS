import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { 
    DashboardStats,
    MonthlyEarning,
    RoomOccupancySummary,
    RentStatusSummary
} from '../models/dashboard-module/dashboard.model';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private api = inject(ApiService);

  getStats(): Observable<DashboardStats> {
    return this.api.get<DashboardStats>('dashboard/stats');
  }

  getMonthlyEarnings(): Observable<MonthlyEarning[]> {
    return this.api.get<MonthlyEarning[]>('dashboard/earnings');
  }

  getRoomOccupancy(): Observable<RoomOccupancySummary> {
    return this.api.get<RoomOccupancySummary>('dashboard/room-occupancy');
  }

  getRentStatus(): Observable<RentStatusSummary> {
    return this.api.get<RentStatusSummary>('dashboard/rent-status');
  }
}