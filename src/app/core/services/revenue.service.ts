import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { RevenueSummary } from '../models/revenue.model';

@Injectable({ providedIn: 'root' })
export class RevenueService {
  private api = inject(ApiService);

  getRevenue(month?: string): Observable<RevenueSummary> {
    return this.api.get<RevenueSummary>('revenue', month ? { month } : undefined);
  }
}