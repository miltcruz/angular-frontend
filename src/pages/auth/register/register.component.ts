import { Component, inject, signal } from "@angular/core";
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: "app-auth-register",
  templateUrl: "./register.template.html",
  imports: [ReactiveFormsModule],
})
export class RegisterComponent {  
  form: FormGroup;
  private auth = inject(AuthService);

  serverError = signal<string | null>(null);
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordConfirmation: ['', [Validators.required, Validators.minLength(8), this.passwordMatchValidator()]]
    });
  }

 passwordMatchValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const password = this.form?.get('password')?.value;
      const passwordConfirmation =  this.form?.get('passwordConfirmation')?.value;

      if (password && passwordConfirmation && password !== passwordConfirmation) {
        return new Observable(observer => {
          observer.next({ passwordMismatch: true });
          observer.complete();
        });
    }
    
    return new Observable(observer => {
      observer.next(null);
      observer.complete();
    });
  }
 }

 onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      console.log('Form invalid:', this.form.errors || 'see control errors');
      return;
    }

    this.serverError.set(null);

    try {
      this.auth.register(this.form?.get('email')?.value, this.form?.get('password')?.value);
      //Redirect to dashboard
      console.log('Registration successful');
    }
    catch (error) {
      console.error('Registration failed:', error);
      this.serverError.set('An error occurred during registration. Please try again.');
    }
  }
}