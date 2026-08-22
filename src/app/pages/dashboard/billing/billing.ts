import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BillingService } from '../../../core/services/billing.service';
import { PropertyService } from '../../../core/services/property.service';
import { BillingModel } from '../../../core/models/billing-module/billing-module.model';
import { Property } from '../../../core/models/property-module/property.model';
import { TenantService } from '../../../core/services/tenant.service';
import { getAllBills, getAllProperties, getTenantById } from '../../../core/test-data';
import { Tenant } from '../../../core/models/tenant-module/tenant.model';
import { Tenants } from '../tenants/tenants';
import { BillingResponse } from '../../../core/models/billing-module/billing-DTO.model';

@Component({
  selector: 'billing',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './billing.html',
  styleUrl: './billing.css',
})
export class Billing {
  private billingService = inject(BillingService);
  private propertyService = inject(PropertyService);

  bills = signal<BillingResponse[] | undefined>([]);
  properties = signal<Property[] | undefined>([]);
  isLoading = signal(true);

  selectedPropertyId = signal<number | null>(null);
  selectedMonth = signal<string>('');

  filteredBills = computed(() => {
    const propId = this.selectedPropertyId();
    const month = this.selectedMonth();

    // return this.bills().filter((b) => {
    //   const matchesProperty = !propId || b.tenant.propert?.id === propId;
    //   const matchesMonth = !month || b.billingMonth === month;
    //   return matchesProperty && matchesMonth;
    // });

    return (this.bills() ?? []).filter((b) => {

      const tenant = getTenantById(b.tenantId);

      const matchesProperty =
        !propId || tenant?.property === propId;

      const matchesMonth =
        !month || b.billingMonth === month;

      return matchesProperty && matchesMonth;
    });
  });

  totalAmount = computed(() =>
    this.filteredBills().reduce((sum, b) => sum + b.totalAmount, 0)
  );

  ngOnInit(): void {
    // this.propertyService.getAll().subscribe({ next: (data) => this.properties.set(data) });
    this.properties.set(getAllProperties());
    this.loadBills();
  }

  getTenantName(id: number): string | null{
    return getTenantById(id)?.fullName ?? null;
  }

  loadBills(): void {
    this.isLoading.set(true);
    // this.billingService.getAll().subscribe({
    //   next: (data) => { this.bills.set(data); this.isLoading.set(false); },
    //   error: () => this.isLoading.set(false)
    // });
    this.bills.set(getAllBills());
    this.isLoading.set(false);
  }

  onPropertyFilterChange(value: number | null): void {
    this.selectedPropertyId.set(value);
  }

  onMonthFilterChange(value: string): void {
    this.selectedMonth.set(value);
  }

  statusClass(status: string): string {
    switch (status) {
      case 'PAID': return 'bg-success';
      case 'PENDING': return 'bg-warning text-dark';
      default: return 'bg-danger';
    }
  }
}
