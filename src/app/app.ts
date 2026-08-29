import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Login } from './pages/login/login';
import { Header } from './pages/header/header';
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
  imports: [RouterOutlet, Login, Header, Dashboard, Properties, Tenants, Billing, Revenue, UserSignup, RoomDetails, AddRoom],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('RentalManagementSystem'); 
}
