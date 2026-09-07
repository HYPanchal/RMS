import { Component, inject, signal, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getTestPendingRooms } from '../../../../core/test-data';
import { getAllProperties } from '../../../../core/test-data';
import { RoomModel } from '../../../../core/models/room-module/room.model';
import { Property } from '../../../../core/models/property-module/property.model';

@Component({
  selector: 'app-billing-pending',
  standalone: true,
  templateUrl: './billing-pending.html',
  styleUrl: './billing-pending.css',
})
export class BillingPending {
  private router = inject(Router);

  rooms = signal<RoomModel[]>([]);
  properties = signal<Property[]>([]);
  isLoading = signal(true);

  ngOnInit(): void {
    this.properties.set(getAllProperties());
    this.loadPendingRooms();
  }

  loadPendingRooms(): void {
    this.isLoading.set(true);
    getTestPendingRooms().subscribe({
      next: (data) => { this.rooms.set(data); this.isLoading.set(false); },
      error: () => this.isLoading.set(false)
    });
  }

  propertyName(propertyId: number): string {
    return this.properties().find((p) => p.id === propertyId)?.propertyName ?? '-';
  }

  generateBill(room: RoomModel): void {
    this.router.navigate(['/dashboard/billing/generate', room.id]);
  }

  staggerDelay(index: number): number {
    const baseOffset = 200; // ms — lets header + button settle first
    return baseOffset + Math.min(index, 10) * 50;
  }
}
