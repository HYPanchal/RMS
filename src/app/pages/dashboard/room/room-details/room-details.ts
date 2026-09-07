import { Component, inject, signal, OnInit, numberAttribute } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { RoomService } from '../../../../core/services/room.service';
import { getRoomById, getTenantsByRoomId } from '../../../../core/test-data';
import { RoomResponse } from '../../../../core/models/room-module/room-DTO.model';
import { Tenant } from '../../../../core/models/tenant-module/tenant.model';
import { TenantService } from '../../../../core/services/tenant.service';
import { TenantResponse } from '../../../../core/models/tenant-module/tenant-DTO.model';
import { getTestBills } from '../../../../core/test-data';
import { BillingModel } from '../../../../core/models/billing-module/billing-module.model';
import { BillingResponse } from '../../../../core/models/billing-module/billing-DTO.model';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

@Component({
  selector: 'room-details',
  standalone: true,
  templateUrl: './room-details.html',
  styleUrl: './room-details.css',
})
export class RoomDetails implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private roomService = inject(RoomService);
  private tenantService = inject(TenantService);

  room = signal<RoomResponse | undefined>(undefined);
  tenants = signal<TenantResponse[] | undefined>([]);
  isLoading = signal(true);
  errorMessage = signal<string | null>(null);
  currentMonthBill = signal<BillingResponse | null>(null);
  roomId: number = 0;
  propertId: number = 0;
  propertyName: string = "";

  ngOnInit(): void {
    this.roomId = Number(this.route.snapshot.paramMap.get('roomId'));
    this.propertId = Number(this.route.snapshot.paramMap.get('propertyId'));
    this.propertyName = String(this.route.snapshot.paramMap.get('propertyName'));
    if (!this.roomId) {
      this.errorMessage.set('Invalid room id.');
      this.isLoading.set(false);
      return;
    }
    this.loadRoom(this.roomId);
  }

  loadRoom(id: number): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    // Fetch room details + its tenants in parallel
    // forkJoin({
    //   room: this.roomService.getById(id),
    //   tenants: this.tenantService.getByRoomId(id)
    // }).subscribe({
    //   next: ({ room, tenants }) => {
    //     this.room.set(room);
    //     this.tenants.set(tenants);
    //     this.isLoading.set(false);
    //   },
    //   error: () => {
    //     this.errorMessage.set('Failed to load room details.');
    //     this.isLoading.set(false);
    //   }
    // });

    // console.log(id);

    this.room.set(getRoomById(id));
    this.checkBillStatus(id);
    this.tenants.set(getTenantsByRoomId(id));
    this.isLoading.set(false);
  }

  checkBillStatus(roomId: number): void {
    getTestBills({ roomId }).subscribe((bills) => {
      const now = new Date();
      const currentMonth = MONTH_NAMES[now.getMonth()];
      const currentYear = String(now.getFullYear());
      const existing = bills.find((b) => b.billingMonth === currentMonth && b.billingYear === currentYear);
      this.currentMonthBill.set(existing ?? null);
    });
  }

  goBack(): void {
    this.router.navigate(['/dashboard/rooms', this.propertId, this.propertyName]);
  }

  goToGenerateBill(): void {
    this.router.navigate(['/dashboard/billing/generate', this.room()!.id]);
  }

  goToBillDetails(): void {
    const bill = this.currentMonthBill();
    if (bill) {
      this.router.navigate(['/dashboard/billing/details', bill.id]);
    }
  }

  roomTypeLabel(type: string): string {
    return type.replace(/_/g, ' ');
  }

  staggerDelay(index: number): number {
    const baseOffset = 200; // ms — lets header + button settle first
    return baseOffset + Math.min(index, 10) * 50;
  }

}
