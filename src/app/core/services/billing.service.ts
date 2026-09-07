import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { BillingModel } from '../models/billing-module/billing-module.model';
import { 
  BillingRequest,
  TenantPayment,
  RecordPaymentRequest,
  TenantBillHistoryItem, 
  BillingResponse, 
  GenerateBillRequest } from '../models/billing-module/billing-DTO.model';
import { RoomModel } from '../models/room-module/room.model';

@Injectable({ providedIn: 'root' })
export class BillingService {
  private api = inject(ApiService);

  //Getting all the bills
  getAll(filters?: BillingRequest): Observable<BillingModel[]> {
    return this.api.get<BillingModel[]>('bills', filters);
  }

  //Get bill by property Id, Room Id and Month
  getBillByPorpertyIdRoomIdMonth(filters?: BillingRequest): Observable<BillingResponse[]> {
    return this.api.get<BillingResponse[]>('bills', filters);
  }

  //Get bill by id
  getById(id: number): Observable<BillingModel> {
    return this.api.getById<BillingModel>('bills', id);
  }

  //Generate bill by Room Id
  createBillByRoomId(body:GenerateBillRequest): Observable<BillingModel> {
    return this.api.post<BillingModel>('bills', body);
  }

  //Get Tenant payment by bill id
  getTenantPayments(billId: number): Observable<TenantPayment[]> {
    return this.api.get<TenantPayment[]>(`bills/${billId}/payments`);
  }

  recordPayment(data: RecordPaymentRequest): Observable<TenantPayment> {
    return this.api.post<TenantPayment>('payments/record', data);
  }

  //Get all pending Room
  getPendingRooms(): Observable<RoomModel[]> {
    return this.api.get<RoomModel[]>('bills/pending-rooms');
  }

  //Get Tenant Bill histroy by tenant id
  getTenantBillHistory(tenantId: number): Observable<TenantBillHistoryItem[]> {
    return this.api.get<TenantBillHistoryItem[]>(`tenants/${tenantId}/bills`);
  }
}