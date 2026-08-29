import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { BillingModel } from '../models/billing-module/billing-module.model';
import { BillingRequest, BillingResponse, GenerateBillRequest } from '../models/billing-module/billing-DTO.model';

@Injectable({ providedIn: 'root' })
export class BillingService {
  private api = inject(ApiService);

  getBillByPorpertyIdTenantIdRoomIdMonth(filters?: BillingRequest): Observable<BillingResponse[]> {
    return this.api.get<BillingResponse[]>('bills', filters);
  }

  createBillByRoomId(body:GenerateBillRequest): Observable<BillingResponse> {
    return this.api.post<BillingResponse>('bills', body);
  }
}