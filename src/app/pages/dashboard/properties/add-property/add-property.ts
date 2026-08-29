import { Component, inject, signal, computed } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PropertyService } from '../../../../core/services/property.service';
import { PropertyType } from '../../../../core/models/property-module/property.model';
import { RegiesterPropertyRequest } from '../../../../core/models/property-module/property-DTO.model';
import { createProperty } from '../../../../core/test-data';
import { LocationService } from '../../../../core/services/Location.service';

@Component({
  selector: 'add-property',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-property.html',
  styleUrl: './add-property.css',
})
export class AddProperty {
  private fb = inject(FormBuilder);
  private propertyService = inject(PropertyService);
  private locationService = inject(LocationService);
  private router = inject(Router);

  propertyTypes = Object.values(PropertyType);
  states = signal(this.locationService.getStates());

  // Tracks the isoCode of the currently selected state (UI-only, drives city filtering)
  selectedStateCode = signal<string>('');

  cities = computed(() => this.locationService.getCitiesByStateCode(this.selectedStateCode()));

  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  propertyForm = this.fb.nonNullable.group({
    owner: [1, [Validators.required]],
    propertyName: ['', [Validators.required, Validators.minLength(5)]],
    propertyType: [PropertyType.APERTMENT, [Validators.required]],
    address: ['', [Validators.required, Validators.minLength(30)]],
    stateCode: ['', [Validators.required]],
    city: ['', [Validators.required]],
    state: ['', [Validators.required]],
    pincode: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
    totalRooms: [1, [Validators.required, Validators.min(1)]]
  });

  onStateChange(event: Event): void {
    const isoCode = (event.target as HTMLSelectElement).value;
    const state = this.states().find((s) => s.isoCode === isoCode);
    this.selectedStateCode.set(isoCode);
    // Auto-fill the real state name + reset city since it belonged to the old state
    this.propertyForm.patchValue({ state: state?.name ?? '', city: '' });
  }

  onSubmit(): void {
    if (this.propertyForm.invalid) {
      this.propertyForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    const payload: RegiesterPropertyRequest = this.propertyForm.getRawValue();

    // this.propertyService.create(payload).subscribe({
    //   next: () => {
    //     this.isLoading.set(false);
    //     this.router.navigate(['/dashboard/properties']);
    //   },
    //   error: () => {
    //     this.isLoading.set(false);
    //     this.errorMessage.set('Failed to add property. Please try again.');
    //   }
    // });

    this.isLoading.set(false);
    createProperty(payload);
    this.router.navigate(['/dashboard/properties']);
  }

  onCancel(): void {
    this.router.navigate(['/dashboard/properties']);
  }

  selectPropertyType(type: PropertyType): void {
    this.propertyForm.get('propertyType')?.setValue(type);
  }

  get selectedPropertyType(): PropertyType | undefined {
    return this.propertyForm.get('propertyType')?.value;
  }

  propertyTypeLabel(type: PropertyType): string {
    return type.replace(/_/g, ' ');
  }
}
