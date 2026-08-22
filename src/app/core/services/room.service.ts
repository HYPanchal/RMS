import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { RoomModel } from '../../core/models/room-module/room.model';
import { RoomResponse } from '../models/room-module/room-DTO.model';

@Injectable({ providedIn: 'root' })
export class RoomService {
  private api = inject(ApiService);

  getAll(filters?: { propertyId?: number; status?: string }): Observable<RoomResponse[]> {
    return this.api.get<RoomResponse[]>('rooms', filters);
  }

  getById(id: number): Observable<RoomResponse> {
    return this.api.getById<RoomResponse>('rooms', id);
  }
}