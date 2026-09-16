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
import { BillingPending } from './billing-pending/billing-pending';
import { GenerateBill } from './generate-bill/generate-bill';
import { BillingGenerated } from './billing-generated/billing-generated';

type BillingTab = 'pending' | 'generated';

@Component({
  selector: 'billing',
  standalone: true,
  imports: [BillingPending, BillingGenerated],
  templateUrl: './billing.html',
  styleUrl: './billing.css',
})
export class Billing {
  activeTab = signal<BillingTab>('pending');

  setTab(tab: BillingTab): void {
    this.activeTab.set(tab);
  }
}
