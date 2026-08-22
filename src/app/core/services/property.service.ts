import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Property } from '../models/property-module/property.model';

@Injectable({ providedIn: 'root' })
export class PropertyService {
  private api = inject(ApiService);

  getAll(): Observable<Property[]> {
    return this.api.get<Property[]>('properties');
  }
}