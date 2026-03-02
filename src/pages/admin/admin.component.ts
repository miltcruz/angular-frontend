// ─────────────────────────────────────────────────────────────────────────────
// admin.ts
//
// The admin page is protected by adminGuard so only 'admin' users can reach it.
// We inject AuthService here so the template can read the current user's info
// and show/hide extra controls based on role.
// ─────────────────────────────────────────────────────────────────────────────

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.template.html',
})
export class AdminComponent {
  // Expose AuthService to the template so we can read role / email
  auth = inject(AuthService);
}