import { Routes } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { AdminComponent } from '../pages/admin/admin';
import { PhoneListComponent } from '../pages/phone/list/list.component';
import { PhoneDetailComponent } from '../pages/phone/detail/detail.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'admin', component: AdminComponent},
    { path: 'phone/list', component: PhoneListComponent},
    { path: 'phone/detail/:id', component: PhoneDetailComponent}
];
