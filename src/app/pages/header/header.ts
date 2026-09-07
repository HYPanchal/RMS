import { Component, signal, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private router = inject(Router);
  isMenuOpen = signal(false);

  toggleMenu(): void {
    this.isMenuOpen.update((v) => !v);
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }

  navigateSignup(role: 'OWNER' | 'TENANT'): void {
    this.closeMenu();
    this.router.navigate(['/signup'], { queryParams: { role } });
  }
}
