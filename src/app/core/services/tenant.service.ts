import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Tenant } from '../models/tenant-module/tenant.model';

@Injectable({ providedIn: 'root' })
export class TenantService {
  private api = inject(ApiService);

  getAll(filters?: { name?: string; propertyId?: number }): Observable<Tenant[]> {
    return this.api.get<Tenant[]>('tenants', filters);
  }

  getByRoomId(roomId: number): Observable<Tenant[]> {
    return this.api.get<Tenant[]>(`rooms/${roomId}/tenants`);
  }
}