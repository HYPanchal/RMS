import { Component, inject, signal, OnInit, numberAttribute } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { RoomService } from '../../../../core/services/room.service';
import { getRoomById, getTenantsByRoomId } from '../../../../core/test-data';
import { RoomResponse } from '../../../../core/models/room-module/room-DTO.model';
import { Tenant } from '../../../../core/models/tenant-module/tenant.model';
import { TenantService } from '../../../../core/services/tenant.service';
import { TenantResponse } from '../../../../core/models/tenant-module/tenant-DTO.model';

@Component({
  selector: 'room-details',
  standalone: true,
  templateUrl: './room-details.html',
  styleUrl: './room-details.css',
})
export class RoomDetails implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private roomService = inject(RoomService);
  private tenantService = inject(TenantService);

  room = signal<RoomResponse | undefined>(undefined);
  tenants = signal<TenantResponse[] | undefined>([]);
  isLoading = signal(true);
  errorMessage = signal<string | null>(null);
  roomId: number = 0;
  propertId: number = 0;
  propertyName: string = "";

  ngOnInit(): void {
    this.roomId = Number(this.route.snapshot.paramMap.get('roomId'));
    this.propertId = Number(this.route.snapshot.paramMap.get('propertyId'));
    this.propertyName = String(this.route.snapshot.paramMap.get('propertyName'));
    if (!this.roomId) {
      this.errorMessage.set('Invalid room id.');
      this.isLoading.set(false);
      return;
    }
    this.loadRoom(this.roomId);
  }

  loadRoom(id: number): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    // Fetch room details + its tenants in parallel
    // forkJoin({
    //   room: this.roomService.getById(id),
    //   tenants: this.tenantService.getByRoomId(id)
    // }).subscribe({
    //   next: ({ room, tenants }) => {
    //     this.room.set(room);
    //     this.tenants.set(tenants);
    //     this.isLoading.set(false);
    //   },
    //   error: () => {
    //     this.errorMessage.set('Failed to load room details.');
    //     this.isLoading.set(false);
    //   }
    // });

    // console.log(id);

    this.room.set(getRoomById(id));
    this.tenants.set(getTenantsByRoomId(id));
    this.isLoading.set(false);
  }

  goBack(): void {
    this.router.navigate(['/dashboard/rooms', this.propertId, this.propertyName]);
  }

  roomTypeLabel(type: string): string {
    return type.replace(/_/g, ' ');
  }

}
