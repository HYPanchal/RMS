import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../../../core/services/room.service';
import { RoomModel, RoomStatus } from '../../../core/models/room-module/room.model';
import { getAllRooms, getRoomsByPropertyId } from '../../../core/test-data';
import { RoomResponse } from '../../../core/models/room-module/room-DTO.model';

@Component({
  selector: 'room',
  standalone: true,
  templateUrl: './room.html',
  styleUrl: './room.css',
})
export class Room {
  private roomService = inject(RoomService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  rooms = signal<RoomResponse[] | undefined>([]);
  isLoading = signal(true);
  errorMessage = signal<string | null>(null);
  propertyId: number = 0;
  propertyName: string = "";

  ngOnInit(): void {
    this.propertyId = Number(this.route.snapshot.paramMap.get('propertyId'));
    this.propertyName = String(this.route.snapshot.paramMap.get('propertyName'));
    if (!this.propertyId) {
      this.errorMessage.set('Invalid Property id.');
      this.isLoading.set(false);
      return;
    }

    this.loadRooms(this.propertyId);
  }

  loadRooms(id: number): void {
    this.isLoading.set(true);
    // this.roomService.getAll().subscribe({
    //   next: (data) => { this.rooms.set(data); this.isLoading.set(false); },
    //   error: () => { this.errorMessage.set('Failed to load rooms.'); this.isLoading.set(false); }
    // });
    this.rooms.set(getRoomsByPropertyId(id));
    this.isLoading.set(false);
  }

  openRoom(roomId: number): void {
    this.router.navigate(['/dashboard/room', this.propertyId, this.propertyName, roomId]);
  }

  openCreateRoom(): void {
    console.log("Room - ", this.propertyId);
    this.router.navigate(['/dashboard/rooms', this.propertyId, this.propertyName,'add-room']);
  }

  statusClass(status: RoomStatus): string {
    switch (status) {
      case RoomStatus.VACANT: return 'bg-success';
      case RoomStatus.OCCUPIED: return 'bg-primary';
      case RoomStatus.MAINTENANCE: return 'bg-warning text-dark';
      case RoomStatus.RESERVED: return 'bg-info text-dark';
      default: return 'bg-secondary';
    }
  }

  goBack(): void {
    this.router.navigate(['/dashboard/properties']);
  }

  roomTypeLabel(type: string): string {
    return type.replace(/_/g, ' ');
  }

  staggerDelay(index: number): number {
    const baseOffset = 200; // ms — lets header + button settle first
    return baseOffset + Math.min(index, 10) * 50;
  }
}
