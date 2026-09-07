import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CountUpDirective } from '../../../../core/directives/count-up.driective';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BillingModel } from '../../../../core/models/billing-module/billing-module.model';
import { Property } from '../../../../core/models/property-module/property.model';
import { RoomModel } from '../../../../core/models/room-module/room.model'; 
import { BillingResponse } from '../../../../core/models/billing-module/billing-DTO.model';
import { getAllProperties, getAllRooms, getTestBills } from '../../../../core/test-data';
import { RoomResponse } from '../../../../core/models/room-module/room-DTO.model';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

@Component({
  selector: 'app-billing-generated',
  standalone: true,
  imports: [FormsModule, CountUpDirective],
  templateUrl: './billing-generated.html',
  styleUrl: './billing-generated.css',
})
export class BillingGenerated {
  private router = inject(Router);

  bills = signal<BillingResponse[]>([]);
  properties = signal<Property[]>([]);
  rooms = signal<RoomResponse[]>([]);
  isLoading = signal(true);

  selectedPropertyId = signal<number | null>(null);
  selectedMonth = signal<string>('');

  private billingPeriodKey(bill: BillingModel): string {
    const idx = MONTH_NAMES.indexOf(bill.billingMonth);
    const mm = String(idx + 1).padStart(2, '0');
    return `${bill.billingYear}-${mm}`;
  }

  filteredBills = computed(() => {
    const propId = this.selectedPropertyId();
    const month = this.selectedMonth();

    return this.bills().filter((b) => {
      const room = this.rooms().find((r) => r.id === b.roomId);
      const matchesProperty = !propId || room?.propertyId === propId;
      const matchesMonth = !month || this.billingPeriodKey(b) === month;
      return matchesProperty && matchesMonth;
    });
  });

  totalAmount = computed(() => this.filteredBills().reduce((sum, b) => sum + b.totalAmount, 0));

  ngOnInit(): void {
    this.properties.set(getAllProperties());
    this.rooms.set(getAllRooms());
    this.loadBills();
  }

  loadBills(): void {
    this.isLoading.set(true);
    getTestBills().subscribe({
      next: (data) => { this.bills.set(data); this.isLoading.set(false); },
      error: () => this.isLoading.set(false)
    });
  }

  onPropertyFilterChange(value: number | null): void {
    this.selectedPropertyId.set(value);
  }

  onMonthFilterChange(value: string): void {
    this.selectedMonth.set(value);
  }

  roomLabel(roomId: number): string {
    const room = this.rooms().find((r) => r.id === roomId);
    return room ? `Room ${room.roomNumber}` : '-';
  }

  propertyName(roomId: number): string {
    const room = this.rooms().find((r) => r.id === roomId);
    return this.properties().find((p) => p.id === room?.propertyId)?.propertyName ?? '-';
  }

  statusClass(status: string): string {
    switch (status) {
      case 'PAID': return 'bg-success';
      case 'PARTIAL': return 'bg-warning text-dark';
      default: return 'bg-danger';
    }
  }

  openBill(bill: BillingModel): void {
    this.router.navigate(['/dashboard/billing/details', bill.id]);
  }

  staggerDelay(index: number): number {
    const baseOffset = 200; // ms — lets header + button settle first
    return baseOffset + Math.min(index, 10) * 50;
  }
}
