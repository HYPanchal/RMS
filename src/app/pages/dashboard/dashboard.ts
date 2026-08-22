import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from '../sidebar/sidebar';

@Component({
  selector: 'dashboard',
  standalone: true,
  imports: [RouterOutlet, Sidebar],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  // private authService = inject(AuthService);

  // currentUser = this.authService.currentUser;
}
