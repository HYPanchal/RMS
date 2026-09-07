import { Component, inject, Injector, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { Header } from '../header/header';
import { login } from '../../core/test-data';
import { SnackbarService } from '../../core/services/snackbar.service';

@Component({
  selector: 'Login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, Header],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private snackBar = inject(SnackbarService);

  isLoading = signal(false);
  errorMessage = signal<string | null>(null);
  showPassword = signal(false);

  loginForm = this.fb.nonNullable.group({
    username: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[A-Za-z]+$/)]],
    password: ['', [Validators.required, Validators.minLength(4)]]
  });

  togglePassword(): void {
    this.showPassword.update((v) => !v);
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    const { username, password } = this.loginForm.getRawValue();

    // this.authService.login({ username: username!, password: password! }).subscribe({
    //   next: () => {
    //     console.log("Login successfully...")
    //     this.isLoading.set(false);
    //     this.router.navigate(['/dashboard/properties']).then(
    //       success => {console.log("Navigation successfully", success)}
    //     );
    //   },
    //   error: (err) => {
    //     // console.error("error : ", err);
    //     this.isLoading.set(false);
    //     this.errorMessage.set(
    //       err.status === 401 ? 'Invalid username or password' : 'Something went wrong. Please try again.'
    //     );
    //   }
    // });

    if (login(username, password)) {
      this.isLoading.set(false);
      this.snackBar.success("Login Successful...");
      this.router.navigate(['/dashboard/overview'])
    }
    else{
      this.isLoading.set(false);
      this.snackBar.error("Login Failed...");
      this.router.navigate(['']);
    }
  }
}
