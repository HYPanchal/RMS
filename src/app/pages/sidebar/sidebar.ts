import { Component, signal, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { SidebarService } from '../../core/services/sidebar.service';


@Component({
  selector: 'sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  private authService = inject(AuthService);
  private readonly sidebarService = inject(SidebarService);
  readonly isOpen = this.sidebarService.isOpen;

  toggleSidebar(): void {
    this.sidebarService.toggle();
  }

  closeSidebar(): void {
    this.sidebarService.close();
  }

  logout(): void {
    this.authService.logout();
  }
}
