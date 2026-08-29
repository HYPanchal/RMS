import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Property } from '../models/property-module/property.model';
import { PropertyResponse, RegiesterPropertyRequest } from '../models/property-module/property-DTO.model';

@Injectable({ providedIn: 'root' })
export class PropertyService {
  private api = inject(ApiService);

  getAllPropertyByOwnerId(id: number): Observable<PropertyResponse[]> {
    return this.api.getById<PropertyResponse[]>('properties', id);
  }

  createProperty(data: RegiesterPropertyRequest): Observable<PropertyResponse> {
    return this.api.post<PropertyResponse>('properties', data);
  }
}