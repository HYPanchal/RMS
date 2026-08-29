import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { RoomModel } from '../../core/models/room-module/room.model';
import { RegirsterRoomRequest, RoomRequest, RoomResponse } from '../models/room-module/room-DTO.model';
import { Room } from '../../pages/dashboard/room/room';

@Injectable({ providedIn: 'root' })
export class RoomService {
  private api = inject(ApiService);

  getAllRoomByPropertyId(body: RoomRequest): Observable<RoomResponse[]> {
    return this.api.get<RoomResponse[]>('rooms', body);
  }

  // getById(id: number): Observable<RoomResponse> {
  //   return this.api.getById<RoomResponse>('rooms', id);
  // }

  createRoom(data: RegirsterRoomRequest): Observable<Room> {
    return this.api.post<Room>('rooms', data);
  }

}