// ─────────────────────────────────────────────────────────────────────────────
// auth.guard.ts
//
// Protects routes that require the user to be logged in.
//
// How route guards work:
//   Angular calls canActivate() BEFORE navigating to a route.
//   • Return true  → navigation proceeds normally.
//   • Return false → navigation is blocked (we also redirect to /login).
//
// Usage in routes:
//   { path: 'phone/list', component: PhoneListComponent, canActivate: [authGuard] }
// ─────────────────────────────────────────────────────────────────────────────

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * authGuard – allows any logged-in user through.
 *
 * This is a "functional guard" (the modern Angular style).
 * It's just a function – no class needed.
 */
export const authGuard: CanActivateFn = () => {
  const auth   = inject(AuthService);
  const router = inject(Router);

  if (auth.isLoggedIn()) {
    return true; // user is logged in → let them through
  }

  // Not logged in → send them to the login page
  // `router.createUrlTree` builds the /login URL so Angular can also set a
  // "redirect after login" parameter in the future if needed.
  return router.createUrlTree(['/login']);
};
