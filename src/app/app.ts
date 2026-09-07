import { Component, signal, inject } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { Login } from './pages/login/login';
import { Header } from './pages/header/header';
import { SnackBar } from './pages/snack-bar/snack-bar';
import { Dashboard } from "./pages/dashboard/dashboard";
import { Properties } from "./pages/dashboard/properties/properties";
import { Tenants } from "./pages/dashboard/tenants/tenants";
import { Billing } from './pages/dashboard/billing/billing';
import { Revenue } from "./pages/dashboard/revenue/revenue";
import { UserSignup } from "./pages/user-signup/user-signup";
import { RoomDetails } from './pages/dashboard/room/room-details/room-details';
import { AddRoom } from './pages/dashboard/room/add-room/add-room';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Login, Header, Dashboard, Properties, Tenants, Billing, Revenue, UserSignup, RoomDetails, AddRoom, SnackBar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('RentalManagementSystem'); 
  private router = inject(Router);

  showHeader = signal(!this.router.url.startsWith('/dashboard'));

  constructor() {
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(() => {
      this.showHeader.set(!this.router.url.startsWith('/dashboard'));
    });
  }
}
