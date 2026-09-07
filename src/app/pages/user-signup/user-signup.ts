import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { TitleCasePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service'; 
import { Roles } from '../../core/models/User-module/user.model'; 
import { RegisterUserRequest } from '../../core/models/User-module/user-DTO.model';
import { passwordMatchValidator } from '../../core/validators/password-match.validator'; 

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

  // Only self-serve roles shown — ADMIN is assigned internally, not via public signup
  roles = [Roles.OWNER, Roles.TENANT];

  isLoading = signal(false);
  errorMessage = signal<string | null>(null);
  showPassword = signal(false);
  showConfirmPassword = signal(false);

  signupForm = this.fb.group(
    {
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      userRole: [Roles.OWNER, [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      pincode: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    },
    { validators: passwordMatchValidator('password', 'confirmPassword') }
  );

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
  }
}
