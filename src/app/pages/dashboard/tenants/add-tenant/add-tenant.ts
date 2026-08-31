import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { isActive, Router } from '@angular/router';
import { RegisterTenantRequest } from '../../../../core/models/tenant-module/tenant-DTO.model';
import { IdType } from '../../../../core/models/tenant-module/tenant.model';
import { Roles } from '../../../../core/models/User-module/user.model';
import { createTenant } from '../../../../core/test-data';

@Component({
  selector: 'app-add-tenant',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-tenant.html',
  styleUrl: './add-tenant.css',
})
export class AddTenant {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  idTypes = Object.values(IdType);

  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  tenantForm = this.fb.nonNullable.group({
    userName: ['', [Validators.required, Validators.minLength(4)]],
    fullName: ['', [Validators.required, Validators.minLength(3)]],
    contactPhone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
    email: ['', [Validators.required, Validators.email]],
    emergencyContact: ['', [Validators.required]],
    emergencyPhone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
    idProofType: [IdType.AADHARCARD, [Validators.required]],
    idProofNumber: ['', [Validators.required]],
    occupation: ['', [Validators.required]]
  });

  onSubmit(): void {
    if (this.tenantForm.invalid) {
      this.tenantForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    const payload: RegisterTenantRequest = {
      ...this.tenantForm.getRawValue(),
      role: Roles.TENANT,
      isActive: true
    };

    // createTenant(payload).subscribe({
    //   next: () => {
    //     this.isLoading.set(false);
    //     this.router.navigate(['/dashboard/tenants']);
    //   },
    //   error: () => {
    //     this.isLoading.set(false);
    //     this.errorMessage.set('Failed to register tenant. Please try again.');
    //   }
    // });

    this.isLoading.set(false);
    createTenant(payload);
    this.router.navigate(['/dashboard/tenants']);
  }

  onCancel(): void {
    this.router.navigate(['/dashboard/tenants']);
  }

  idTypeLabel(type: string): string {
    return type.replace(/_/g, ' ');
  }
}
