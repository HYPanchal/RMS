import { Component, inject, signal, computed } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { TitleCasePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { SnackbarService } from '../../core/services/snackbar.service';
import { AuthService } from '../../core/services/auth.service';
import { Roles } from '../../core/models/User-module/user.model';
import { RegisterUserRequest } from '../../core/models/User-module/user-DTO.model';
import { passwordMatchValidator } from '../../core/validators/password-match.validator';
import { registerUser } from '../../core/test-data';
import { LocationService } from '../../core/services/Location.service';

@Component({
  selector: 'user-signup',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, TitleCasePipe],
  templateUrl: './user-signup.html',
  styleUrl: './user-signup.css',
})
export class UserSignup {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private snackBar = inject(SnackbarService);
  private locationService = inject(LocationService);

  // Only self-serve roles shown — ADMIN is assigned internally, not via public signup
  roles = [Roles.OWNER, Roles.TENANT];

  isLoading = signal(false);
  errorMessage = signal<string | null>(null);
  showPassword = signal(false);
  showConfirmPassword = signal(false);

  states = signal(this.locationService.getStates());

  // Tracks the isoCode of the currently selected state (UI-only, drives city filtering)
  selectedStateCode = signal<string>('');

  cities = computed(() => this.locationService.getCitiesByStateCode(this.selectedStateCode()));

  signupForm = this.fb.group(
    {
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      userRole: [Roles.OWNER, [Validators.required]],
      address: ['', [Validators.required]],
      stateCode: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      pincode: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
      passwordHash: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(5)]]
    },
    { validators: passwordMatchValidator('passwordHash', 'confirmPassword') }
  );

  onStateChange(event: Event): void {
    const isoCode = (event.target as HTMLSelectElement).value;
    const state = this.states().find((s) => s.isoCode === isoCode);
    this.selectedStateCode.set(isoCode);
    // Auto-fill the real state name + reset city since it belonged to the old state
    this.signupForm.patchValue({ state: state?.name ?? '', city: '' });
  }

  togglePassword(): void {
    this.showPassword.update((v) => !v);
  }

  toggleConfirmPassword(): void {
    this.showConfirmPassword.update((v) => !v);
  }

  onSubmit(): void {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    const { confirmPassword, ...payload } = this.signupForm.getRawValue();

    // this.authService.register(payload as RegisterUserRequest).subscribe({
    //   next: () => {
    //     this.isLoading.set(false);
    //     this.router.navigate(['/login']);
    //   },
    //   error: (err) => {
    //     this.isLoading.set(false);
    //     this.errorMessage.set(
    //       err.status === 409 ? 'Username or email already exists' : 'Registration failed. Please try again.'
    //     );
    //   }
    // });


    registerUser(payload as RegisterUserRequest).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.snackBar.success("User Successfully Created...");
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set(
          err.status === 409 ? 'Username or email already exists' : 'Registration failed. Please try again.',
        );
        this.snackBar.success("Registration failed...Username or email already exists. Please try again.");
      }
    });

  }

  onCancel(): void {
    this.router.navigate(['/login']);
  }
}
