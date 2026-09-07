import { Injectable, signal } from '@angular/core';

export type SnackbarType = 'success' | 'error' | 'info' | 'warning';

export interface SnackbarState {
  message: string;
  type: SnackbarType;
}

@Injectable({ providedIn: 'root' })
export class SnackbarService {
  private readonly _state = signal<SnackbarState | null>(null);
  readonly state = this._state.asReadonly();

  private timeoutId: ReturnType<typeof setTimeout> | null = null;

  show(message: string, type: SnackbarType = 'success', duration = 3000): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    this._state.set({ message, type });

    this.timeoutId = setTimeout(() => this.dismiss(), duration);
  }

  success(message: string, duration = 5000): void {
    this.show(message, 'success', duration);
  }

  error(message: string, duration = 5000): void {
    this.show(message, 'error', duration);
  }

  dismiss(): void {
    this._state.set(null);
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }
}