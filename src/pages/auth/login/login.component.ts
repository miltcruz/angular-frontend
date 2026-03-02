// ─────────────────────────────────────────────────────────────────────────────
// login.component.ts
//
// The login page.
//
// Concepts used here:
//   • Reactive Forms – FormBuilder builds a typed form with validators.
//   • Signals        – serverError and showPassword react to changes.
//   • inject()       – modern Angular way to get service instances.
// ─────────────────────────────────────────────────────────────────────────────

import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.template.html',
})
export class LoginComponent {

  // Get the services we need
  private fb     = inject(FormBuilder);
  private auth   = inject(AuthService);
  private router = inject(Router);

  // Signal for error messages that come back from the "server"
  // (e.g. "Invalid email or password.")
  serverError = signal<string | null>(null);

  // Toggles whether the password field shows dots or plain text
  showPassword = signal(false);

  // Build the form with two fields and their validation rules
  form: FormGroup = this.fb.group({
    email:    ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  // ── Convenience getters ─────────────────────────────────────────────────
  // These allow the template to write `email.errors` instead of
  // `form.get('email')?.errors`, which is cleaner.
  get email()    { return this.form.get('email')!; }
  get password() { return this.form.get('password')!; }

  // ── Event handlers ──────────────────────────────────────────────────────

  /** Flip the password visibility signal. */
  togglePassword(): void {
    this.showPassword.update(current => !current);
  }

  /** Called when the user clicks "Sign in". */
  onSubmit(): void {
    // If any field is invalid, mark everything as touched so errors appear
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // Clear any previous server-side error message
    this.serverError.set(null);

    try {
      // Delegate the actual credential check to AuthService
      this.auth.login(this.email.value, this.password.value);

      // Success → go to home page
      this.router.navigate(['/']);

    } catch (err: unknown) {
      // auth.login() throws a plain Error when credentials are wrong
      this.serverError.set(
        err instanceof Error ? err.message : 'Login failed. Please try again.'
      );
    }
  }
}
