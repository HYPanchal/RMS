import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { Login } from './pages/login/login'; 
import { Tenants } from './pages/dashboard/tenants/tenants';
import { Billing } from './pages/dashboard/billing/billing';
import { Revenue } from './pages/dashboard/revenue/revenue';
import { Room } from './pages/dashboard/room/room';
import { RoomDetails } from './pages/dashboard/room/room-details/room-details';
import { Properties } from './pages/dashboard/properties/properties';
import { AddProperty } from './pages/dashboard/properties/add-property/add-property';
import { AddRoom } from './pages/dashboard/room/add-room/add-room';
import { AddTenant } from './pages/dashboard/tenants/add-tenant/add-tenant';
import { TenantService } from './core/services/tenant.service';
import { TenantDetails } from './pages/dashboard/tenants/tenant-details/tenant-details';

export const routes: Routes = [
    // {path: 'login', component: Login},
    {
        path: 'dashboard', 
        component: Dashboard, 
        children:[
            {path: 'properties', component: Properties},
            {path: 'properties/add-property', component: AddProperty},
            {path: 'rooms/:propertyId/:propertyName/add-room', component: AddRoom},
            {path: 'rooms/:propertyId/:propertyName',component: Room},
            {path: 'room/:propertyId/:propertyName/:roomId', component: RoomDetails},
            {path: 'room',component: Room},
            {path: 'tenants', component: Tenants},
            {path: 'tenants/add', component: AddTenant},
            {path: 'tenants/:id', component: TenantDetails},
            {path: 'billing', component: Billing},
            {path: 'revenue', component: Revenue}
        ]
    },
    // {path: '', redirectTo: 'login', pathMatch: 'full'}   
];
