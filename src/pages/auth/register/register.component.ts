// ─────────────────────────────────────────────────────────────────────────────
// register.component.ts
//
// The registration page.
//
// Extra compared to login:
//   • A "confirm password" field that must match the password field.
//   • A cross-field validation function (passwordMatchValidator).
//   • A more detailed password strength rule (uppercase + digit required).
// ─────────────────────────────────────────────────────────────────────────────

import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

// ── Custom validator ─────────────────────────────────────────────────────────
//
// A "cross-field validator" reads multiple controls inside a FormGroup.
// Angular passes the whole group to the function; we look up individual
// controls by name and compare their values.
//
// Return null   → valid (no error)
// Return object → invalid (the key describes the problem)

function passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
  const password        = group.get('password')?.value;
  const confirmPassword = group.get('confirmPassword')?.value;

  // Only report mismatch when both fields have values
  if (password && confirmPassword && password !== confirmPassword) {
    return { passwordMismatch: true };
  }
  return null;
}

// ─────────────────────────────────────────────────────────────────────────────

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.template.html',
})
export class RegisterComponent {

  private fb     = inject(FormBuilder);
  private auth   = inject(AuthService);
  private router = inject(Router);

  serverError  = signal<string | null>(null);
  showPassword = signal(false);

  // The second argument to fb.group() is the options object.
  // We plug our cross-field validator in here so Angular runs it on the group.
  form: FormGroup = this.fb.group(
    {
      email: ['', [Validators.required, Validators.email]],

      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          // Must contain at least one uppercase letter AND one digit
          Validators.pattern(/^(?=.*[A-Z])(?=.*\d)/),
        ],
      ],

      confirmPassword: ['', Validators.required],
    },
    { validators: passwordMatchValidator } // <-- group-level validator
  );

  // Convenience getters
  get email()           { return this.form.get('email')!; }
  get password()        { return this.form.get('password')!; }
  get confirmPassword() { return this.form.get('confirmPassword')!; }

  togglePassword(): void {
    this.showPassword.update(v => !v);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.serverError.set(null);

    try {
      this.auth.register(this.email.value, this.password.value);
      // After successful registration the user is automatically logged in
      this.router.navigate(['/']);
    } catch (err: unknown) {
      this.serverError.set(
        err instanceof Error ? err.message : 'Registration failed. Please try again.'
      );
    }
  }
}
