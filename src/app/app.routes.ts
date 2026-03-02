// ─────────────────────────────────────────────────────────────────────────────
// app.routes.ts
//
// Route guards are added via the `canActivate` property.
//   authGuard  → any logged-in user can access the route
//   adminGuard → only users with role 'admin' can access the route
// ─────────────────────────────────────────────────────────────────────────────

import { Routes } from '@angular/router';
import { HomeComponent }       from '../pages/home/home.component';
import { AdminComponent }      from '../pages/admin/admin';
import { PhoneListComponent }  from '../pages/phone/list/list.component';
import { PhoneDetailComponent } from '../pages/phone/detail/detail.component';
import { LoginComponent }      from '../pages/auth/login/login.component';
import { RegisterComponent }   from '../pages/auth/register/register.component';
import { authGuard }           from '../guards/auth.guard';
import { adminGuard }          from '../guards/admin.guard';

export const routes: Routes = [
  // Public routes – anyone can visit these
  { path: '',         component: HomeComponent },
  { path: 'login',    component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // Protected: logged-in users only
  { path: 'phone/list',       component: PhoneListComponent,  canActivate: [authGuard] },
  { path: 'phone/detail/:id', component: PhoneDetailComponent, canActivate: [authGuard] },

  // Protected: admin role only
  { path: 'admin', component: AdminComponent, canActivate: [adminGuard] },
];
