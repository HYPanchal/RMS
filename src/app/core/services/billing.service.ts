import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { BillingModel } from '../models/billing-module/billing-module.model';

@Injectable({ providedIn: 'root' })
export class BillingService {
  private api = inject(ApiService);

  getAll(filters?: { propertyId?: number; month?: string }): Observable<BillingModel[]> {
    return this.api.get<BillingModel[]>('bills', filters);
  }
}