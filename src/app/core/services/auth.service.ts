import { Injectable, signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { ApiService } from './api.service';
import { LoginRequest, LoginResponse, AuthUser} from '../models/auth.model';
import { RegisterUserRequest } from '../models/User-module/user-DTO.model';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = inject(ApiService);
  private router = inject(Router);

  private readonly _currentUser = signal<AuthUser | null>(this.loadUserFromStorage());
  readonly currentUser = this._currentUser.asReadonly();
  readonly isAuthenticated = computed(() => !!this._currentUser());

  login(req: LoginRequest): Observable<LoginResponse> {
    return this.api.post<LoginResponse>('auth/login', req).pipe(
      tap((res) => {
        console.log(res);
        localStorage.setItem(TOKEN_KEY, res.token);
        const user: AuthUser = { 
          id: res.user?.id,
          username: res.user?.username, 
          email: res.user?.email,
          fullName: res.user?.fullName,
          userRole: res.user?.userRole,
          isActive: res.user?.isActive
        };
        localStorage.setItem(USER_KEY, JSON.stringify(user));
        this._currentUser.set(user);
      })
    );
  }

  // register(data: RegisterRequest): Observable<RegisterResponse> {
  //   return this.api.post<RegisterResponse>('auth/register', data);
  // }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    this._currentUser.set(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  private loadUserFromStorage(): AuthUser | null {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  }
}