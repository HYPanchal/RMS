import { Component, inject, signal, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PropertyService } from '../../../core/services/property.service';
import { Property } from '../../../core/models/property-module/property.model';
import { PropertyResponse } from '../../../core/models/property-module/property-DTO.model';
import { getAllProperties } from '../../../core/test-data';

@Component({
  selector: 'properties',
  standalone: true,
  templateUrl: './properties.html',
  styleUrl: './properties.css',
})
export class Properties {
  private propertyService = inject(PropertyService);
  private router = inject(Router);

  properties = signal<PropertyResponse[]>([]);
  isLoading = signal(true);
  errorMessage = signal<string | null>(null);

  ngOnInit(): void {
    this.loadProperties();
  }

  loadProperties(): void {
    this.isLoading.set(true);
    // this.propertyService.getAll().subscribe({
    //   next: (data) => {
    //     this.properties.set(data);
    //     this.isLoading.set(false);
    //   },
    //   error: () => {
    //     this.errorMessage.set('Failed to load properties.');
    //     this.isLoading.set(false);
    //   }
    // });

    //test impl
    // this.properties.set(this.testProperties);
    this.properties.set(getAllProperties());
    this.isLoading.set(false);
  }

  occupancyPercent(property: Property): number {
    return property.totalRooms > 0
      ? Math.round((property.occupiedRooms / property.totalRooms) * 100)
      : 0;
  }

  openRooms(propertyId: number, propertyName: string): void {
    this.router.navigate(['/dashboard/rooms', propertyId, propertyName]);
  }
}
