import { Component, inject, signal, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { Property } from '../../../../core/models/property-module/property.model';
import { RoomType, RoomStatus } from '../../../../core/models/room-module/room.model';
import { RegirsterRoomRequest } from '../../../../core/models/room-module/room-DTO.model';
import { createRoom } from '../../../../core/test-data';

@Component({
  selector: 'add-room',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-room.html',
  styleUrl: './add-room.css',
})
export class AddRoom {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  roomTypes = Object.values(RoomType);
  roomStatuses = Object.values(RoomStatus);

  properties = signal<Property[]>([]);
  isLoading = signal(false);
  isLoadingProperties = signal(true);
  errorMessage = signal<string | null>(null);

  propertId: number = 0;
  propertyName: string = "";

  ngOnInit(): void {
    this.propertId = Number(this.route.snapshot.paramMap.get('propertyId'));
    // console.log("OnInit - ", this.propertId);
    this.propertyName = String(this.route.snapshot.paramMap.get('propertyName'));
    // const ownerId = this.authService.currentUser()?.id;

    // getTestProperties().subscribe({
    //   next: (data) => {
    //     // only show properties belonging to the logged-in owner
    //     this.properties.set(ownerId ? data.filter((p) => p.owner === ownerId) : data);
    //     this.isLoadingProperties.set(false);
    //   },
    //   error: () => this.isLoadingProperties.set(false)
    // });
  }

  roomForm = this.fb.nonNullable.group({
    propertyId: [Number(this.route.snapshot.paramMap.get('propertyId')), [Validators.required]],
    roomNumber: ['', [Validators.required]],
    floorNumber: ['', [Validators.required]],
    roomType: [RoomType.SINGLE, [Validators.required]],
    roomStatus: [RoomStatus.VACANT, [Validators.required]],
    baseRent: [0, [Validators.required, Validators.min(1)]],
    lightPerUnit: [0, [Validators.required, Validators.min(0)]],
    lastMeterReading: [0, [Validators.required, Validators.min(0)]],
    waterCharges: [0, [Validators.required, Validators.min(0)]],
    securityDeposit: [0, [Validators.required, Validators.min(0)]],
    maxOccupancy: [0, [Validators.required, Validators.min(1)]]
  });

  onSubmit(): void {
    if (this.roomForm.invalid) {
      this.roomForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    // const { propertyObj, ...rest } = this.roomForm.getRawValue();
    const payload: RegirsterRoomRequest = this.roomForm.getRawValue();
    // console.log("payload - ", payload.propertyId);

    // const payload: RegirsterRoomRequest = {
    //   ...rest,
    //   propertyId: propertyObj!.id
    // };

    // createRoom(payload).subscribe({
    //   next: () => {
    //     this.isLoading.set(false);
    //     this.router.navigate(['/dashboard/rooms']);
    //   },
    //   error: () => {
    //     this.isLoading.set(false);
    //     this.errorMessage.set('Failed to add room. Please try again.');
    //   }
    // });

    this.isLoading.set(false);
    // console.log("Submit button clicked")
    createRoom(payload);
    this.router.navigate(['/dashboard/rooms', this.propertId, this.propertyName]);
  }

  onCancel(): void {
    this.router.navigate(['/dashboard/rooms', this.propertId, this.propertyName]);
  }

  typeLabel(value: string): string {
    return value.replace(/_/g, ' ');
  }
}
