// ─────────────────────────────────────────────────────────────────────────────
// admin.guard.ts
//
// Protects routes that require the "admin" role.
//
// If the user is not logged in → redirect to /login.
// If the user is logged in but NOT admin → redirect to / (home page).
// If the user is admin → let them through.
//
// Usage in routes:
//   { path: 'admin', component: AdminComponent, canActivate: [adminGuard] }
// ─────────────────────────────────────────────────────────────────────────────

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * adminGuard – allows only users with role 'admin' through.
 */
export const adminGuard: CanActivateFn = () => {
  const auth   = inject(AuthService);
  const router = inject(Router);

  // Step 1: is anyone logged in?
  if (!auth.isLoggedIn()) {
    return router.createUrlTree(['/login']); // not logged in → login page
  }

  // Step 2: are they an admin?
  if (auth.getRole() === 'admin') {
    return true; // admin → let them through
  }

  // Logged in but not admin → back to home
  return router.createUrlTree(['/']);
};
