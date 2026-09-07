import { Component, inject, signal, OnInit } from '@angular/core';  
import { ActivatedRoute, Router } from '@angular/router';
import { BillingResponse, TenantPayment } from '../../../../core/models/billing-module/billing-DTO.model';
import { RoomModel } from '../../../../core/models/room-module/room.model'; 
import { Tenant } from '../../../../core/models/tenant-module/tenant.model';
import { SnackbarService } from '../../../../core/services/snackbar.service';
import { getAllTenant, getTestBillById, getTestRoomById, getTestTenantPayments, recordTestPayment } from '../../../../core/test-data';
import { TenantResponse } from '../../../../core/models/tenant-module/tenant-DTO.model';

@Component({
  selector: 'app-bill-details',
  standalone: true,
  templateUrl: './bill-details.html',
  styleUrl: './bill-details.css',
})
export class BillDetails {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private snackbarService = inject(SnackbarService);

  bill = signal<BillingResponse | null>(null);
  room = signal<RoomModel | null>(null);
  payments = signal<TenantPayment[]>([]);
  tenants = signal<TenantResponse[] | null>([]);
  isLoading = signal(true);
  errorMessage = signal<string | null>(null);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('billId'));
    if (!id) {
      this.errorMessage.set('Invalid bill id.');
      this.isLoading.set(false);
      return;
    }
    this.loadBill(id);
  }

  loadBill(id: number): void {
    this.isLoading.set(true);
    getTestBillById(id).subscribe({
      next: (bill) => {
        if (!bill) {
          this.errorMessage.set('Bill not found.');
          this.isLoading.set(false);
          return;
        }
        this.bill.set(bill);
        getTestRoomById(bill.roomId).subscribe((room) => this.room.set(room));
        this.tenants.set(getAllTenant());
        getTestTenantPayments(id).subscribe({
          next: (payments) => { this.payments.set(payments); this.isLoading.set(false); },
          error: () => this.isLoading.set(false)
        });
      },
      error: () => {
        this.errorMessage.set('Failed to load bill.');
        this.isLoading.set(false);
      }
    });
  }

  tenantName(tenantId: number): string {
    return this.tenants()?.find((t) => t.id === tenantId)?.fullName ?? `Tenant #${tenantId}`;
  }

  markAsPaid(payment: TenantPayment): void {
    recordTestPayment({
      tenantPaymentId: payment.id,
      amountPaid: payment.shareAmount,
      paymentDate: new Date().toISOString().slice(0, 10)
    }).subscribe({
      next: (updated) => {
        this.payments.update((list) => list.map((p) => (p.id === updated.id ? updated : p)));
        this.snackbarService.success(`Marked ${this.tenantName(updated.tenantId)}'s share as paid`);
      },
      error: () => this.snackbarService.error('Failed to record payment')
    });
  }

  goBack(): void {
    this.router.navigate(['/dashboard/billing']);
  }

  statusClass(status: string): string {
    switch (status) {
      case 'PAID': return 'bg-success';
      case 'PARTIAL': return 'bg-warning text-dark';
      default: return 'bg-danger';
    }
  }
}
