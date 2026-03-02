// ─────────────────────────────────────────────────────────────────────────────
// app.ts
//
// Root component.  We inject AuthService here so the app.html template can
// read the current user and toggle nav items.
// ─────────────────────────────────────────────────────────────────────────────

import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-frontend');

  // Expose to the template so nav items can react to login state
  protected auth = inject(AuthService);
}
