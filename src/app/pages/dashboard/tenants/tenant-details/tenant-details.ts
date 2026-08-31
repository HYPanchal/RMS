import { Component, inject, signal, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TenantService } from '../../../../core/services/tenant.service';
import { RoomService } from '../../../../core/services/room.service';
import { PropertyService } from '../../../../core/services/property.service';
import { TenantResponse } from '../../../../core/models/tenant-module/tenant-DTO.model';
import { RoomResponse } from '../../../../core/models/room-module/room-DTO.model';
import { PropertyResponse } from '../../../../core/models/property-module/property-DTO.model';
import { getPropertyById, getRoomByTenantId, getTenantById } from '../../../../core/test-data';

@Component({
  selector: 'app-tenant-details',
  imports: [],
  templateUrl: './tenant-details.html',
  styleUrl: './tenant-details.css',
})
export class TenantDetails {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private tenantService = inject(TenantService);
  private roomService = inject(RoomService);
  private propertyService = inject(PropertyService);

  tenant = signal<TenantResponse | undefined>(undefined);
  room = signal<RoomResponse | undefined>(undefined);
  property = signal<PropertyResponse | undefined>(undefined);

  isLoading = signal(true);
  errorMessage = signal<string | null>(null);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      this.errorMessage.set('Invalid tenant id.');
      this.isLoading.set(false);
      return;
    }
    this.loadTenant(id);
  }

  loadTenant(id: number): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    // this.tenantService.getById(id).subscribe({
    //   next: (tenant) => {
    //     this.tenant.set(tenant);
    //     this.loadRoomForTenant(id);
    //   },
    //   error: () => {
    //     this.errorMessage.set('Failed to load tenant details.');
    //     this.isLoading.set(false);
    //   }
    // });

    this.tenant.set(getTenantById(id));
    this.room.set(getRoomByTenantId(id));

    if(this.room()?.id !== null)
    {
        this.property.set(getPropertyById(this.room()?.propertyId))
        this.isLoading.set(false);
    }
    else{
      this.isLoading.set(false);
    }
  }

  // private loadRoomForTenant(tenantId: number): void {
  //   this.roomService.getAll({ tenantId }).subscribe({
  //     next: (rooms) => {
  //       const matchedRoom = rooms[0] ?? null;
  //       this.room.set(matchedRoom);

  //       if (matchedRoom) {
  //         this.loadProperty(matchedRoom.propertyId);
  //       } else {
  //         this.isLoading.set(false);
  //       }
  //     },
  //     error: () => this.isLoading.set(false)
  //   });
  // }

  // private loadProperty(propertyId: number): void {
  //   this.propertyService.getById(propertyId).subscribe({
  //     next: (property) => {
  //       this.property.set(property);
  //       this.isLoading.set(false);
  //     },
  //     error: () => this.isLoading.set(false)
  //   });
  // }

  private loadRoomForTenant(tenantId: number): void {

  }

  goBack(): void {
    this.router.navigate(['/dashboard/tenants']);
  }

  roomTypeLabel(type: string): string {
    return type.replace(/_/g, ' ');
  }
  
}
