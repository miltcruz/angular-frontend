import { Component, inject, signal } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: "app-auth-login",
  templateUrl: "./login.template.html",
  imports: [ReactiveFormsModule],
})
export class LoginComponent {  

  form: FormGroup;
  private auth = inject(AuthService);

  serverError = signal<string | null>(null);
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }


   onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      console.log('Form invalid:', this.form.errors || 'see control errors');
      return;
    }

    this.serverError.set(null);

    try {
      this.auth.login(this.form?.get('email')?.value, this.form?.get('password')?.value);
      //Redirect to dashboard
      console.log('Login successful');
    }
    catch (error) {
      console.error('Login failed:', error);
      this.serverError.set('An error occurred during login. Please try again.');
    }
  }
 }