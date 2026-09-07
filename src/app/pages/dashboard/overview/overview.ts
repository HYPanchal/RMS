import { Component, inject, signal, computed, OnInit } from '@angular/core';
import {
  getMockStats,
  getMockMonthlyEarnings,
  getMockRoomOccupancy,
  getMockRentStatus
} from '../../../core/test-data/dashboard.data';
import {
  DashboardStats,
  MonthlyEarning,
  RoomOccupancySummary,
  RentStatusSummary
} from '../../../core/models/dashboard-module/dashboard.model';
import { CountUpDirective } from '../../../core/directives/count-up.driective';
import { OccupancyCountUpDirective } from '../../../core/directives/occupancy-count-up.directive';
import { DonutCountUpDirective } from '../../../core/directives/donut-count-up.directive';
import { ScrollRevealDirective } from '../../../core/directives/scroll-reveal.directive';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CountUpDirective, DonutCountUpDirective, ScrollRevealDirective],
  templateUrl: './overview.html',
  styleUrl: './overview.css',
})
export class Overview {
  isLoading = signal(true);

  stats = signal<DashboardStats>({ totalProperties: 0, totalRooms: 0, totalTenants: 0 });
  earnings = signal<MonthlyEarning[]>([]);
  roomOccupancy = signal<RoomOccupancySummary>({ occupied: 0, available: 0 });
  rentStatus = signal<RentStatusSummary>({ paid: 0, pending: 0 });

  roomCardVisible = signal(false); 
  rentCardVisible = signal(false); 

  // ===== Donut computations =====
  roomOccupiedPercent = computed(() => {
    const { occupied, available } = this.roomOccupancy();
    const total = occupied + available;
    return total ? Math.round((occupied / total) * 100) : 0;
  });

  roomTotal = computed(() => this.roomOccupancy().occupied + this.roomOccupancy().available);

  rentPaidPercent = computed(() => {
    const { paid, pending } = this.rentStatus();
    const total = paid + pending;
    return total ? Math.round((paid / total) * 100) : 0;
  });

  rentTotal = computed(() => this.rentStatus().paid + this.rentStatus().pending);

  roomDonutBackground = computed(
    () => `conic-gradient(#4361ee 0% ${this.roomOccupiedPercent()}%, #e4e9f7 ${this.roomOccupiedPercent()}% 100%)`
  );

  rentDonutBackground = computed(
    () => `conic-gradient(#2a9d8f 0% ${this.rentPaidPercent()}%, #f4a261 ${this.rentPaidPercent()}% 100%)`
  );
  // // ===== Line chart geometry =====
  // private readonly chartWidth = 640;
  // private readonly chartHeight = 220;

  // maxEarningValue = computed(() => {
  //   const all = this.earnings().flatMap((e) => [e.expected, e.earned]);
  //   return all.length ? Math.max(...all) : 1;
  // });

  // earnedPoints = computed(() => this.buildPoints(this.earnings().map((e) => e.earned)));
  // expectedPoints = computed(() => this.buildPoints(this.earnings().map((e) => e.expected)));

  // private buildPoints(values: number[]): string {
  //   if (!values.length) return '';
  //   const max = this.maxEarningValue();
  //   const stepX = this.chartWidth / (values.length - 1 || 1);

  //   return values
  //     .map((v, i) => {
  //       const x = i * stepX;
  //       const y = this.chartHeight - (v / max) * (this.chartHeight - 20) - 10;
  //       return `${x},${y}`;
  //     })
  //     .join(' ');
  // }

  // ===== Bar chart geometry =====
   maxEarningValue = computed(() => {
    const all = this.earnings().flatMap((e) => [e.expected, e.earned]);
    return all.length ? Math.max(...all) : 1;
  });

  barHeight(value: number): number {
    const max = this.maxEarningValue();
    return max ? Math.round((value / max) * 100) : 0;
  }

  staggerDelay(index: number): number {
    const baseOffset = 10000; // ms — lets header + button settle first
    return baseOffset + Math.min(index, 10) * 50;
  }

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {
    this.isLoading.set(true);

    // 🔧 swap getMockX() calls for `this.dashboardService.getX()` once the backend endpoints exist
    getMockStats().subscribe((data) => this.stats.set(data));
    getMockMonthlyEarnings().subscribe((data) => this.earnings.set(data));
    getMockRoomOccupancy().subscribe((data) => this.roomOccupancy.set(data));
    getMockRentStatus().subscribe((data) => {
      this.rentStatus.set(data);
      this.isLoading.set(false);
    });
  }
}
