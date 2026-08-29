import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Tenant } from '../models/tenant-module/tenant.model';
import { RegisterTenantRequest, TenantResponse, TenantRequest } from '../models/tenant-module/tenant-DTO.model';

@Injectable({ providedIn: 'root' })
export class TenantService {
  private api = inject(ApiService);

  getAllTenantByTenantIdUserIdRoomIdPropertyId(body: TenantRequest): Observable<TenantResponse[]> {
    return this.api.get<TenantResponse[]>('tenants', body);
  }

  // getTenantById(id: number): Observable<TenantResponse> {
  //   return this.api.getById<TenantResponse>('tenant', `/${id}`);
  // }

  // getTenantByRoomId(roomId: number): Observable<Tenant[]> {
  //   return this.api.get<Tenant[]>(`rooms/${roomId}/tenants`);
  // }

  createTenant(body: RegisterTenantRequest): Observable<TenantResponse> {
    return this.api.post<TenantResponse>('tenant', body);
  }
}