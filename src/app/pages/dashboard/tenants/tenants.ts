import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TenantService } from '../../../core/services/tenant.service';
import { PropertyService } from '../../../core/services/property.service';
import { Tenant } from '../../../core/models/tenant-module/tenant.model';
import { TenantResponse } from '../../../core/models/tenant-module/tenant-DTO.model';
import { Property } from '../../../core/models/property-module/property.model';
import { Roles } from '../../../core/models/User-module/user.model';
import { getAllProperties, getAllTenant, getPropertyById, getRoomByTenantId } from '../../../core/test-data';

@Component({
  selector: 'tenants',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './tenants.html',
  styleUrl: './tenants.css',
})
export class Tenants implements OnInit {
  private tenantService = inject(TenantService);
  private propertyService = inject(PropertyService);
  private router = inject(Router);

  tenants = signal<TenantResponse[] | null>([]);
  properties = signal<Property[]>([]);
  isLoading = signal(true);

  searchTerm = signal('');
  selectedPropertyId = signal<number | null>(null);

  filteredTenants = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    const propId = this.selectedPropertyId();

    // return this.tenants().filter((t) => {
    //   const matchesName = !term || t.tenantName.toLowerCase().includes(term);
    //   const matchesProperty = !propId || t.property?.id === propId;
    //   return matchesName && matchesProperty;
    // });

    return (this.tenants() ?? []).filter((t) => {

      const matchesName =
        !term ||
        t.fullName.toLowerCase().includes(term);

      const matchesProperty =
        !propId ||
        t.property === Number(propId);

      return matchesName && matchesProperty;
    });

  });

  ngOnInit(): void {
    // this.propertyService.getAll().subscribe({ next: (data) => this.properties.set(data) });
    this.properties.set(getAllProperties());
    this.loadTenants();
  }

  loadTenants(): void {
    this.isLoading.set(true);
    // this.tenantService.getAll().subscribe({
    //   next: (data) => { this.tenants.set(data); this.isLoading.set(false); },
    //   error: () => this.isLoading.set(false)
    // });
    this.tenants.set(getAllTenant());
    this.isLoading.set(false);
  }

  openCreateTenant(): void {
    this.router.navigate(['/dashboard/tenants/add']);
  }

  openTenantDetails(tenant: TenantResponse): void {
    this.router.navigate(['/dashboard/tenants', tenant.id]);
  }

  onSearchChange(value: string): void {
    this.searchTerm.set(value);
  }

  onPropertyFilterChange(value: number | null): void {
    this.selectedPropertyId.set(value);
  }

  getPropertyNameById(id: number): string | null {
    return getPropertyById(id)?.propertyName ?? null;
  }

  getRoomName(id: number): number | null{
    return getRoomByTenantId(id)?.baseRent ?? null; 
  }

  // getPropertyBaserentById(id: number): string | null{
  //   return getPropertyById(id)?.baseRent ?? null;
  // }
}
