import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors, AsyncValidatorFn, FormArray } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Component({
  selector: 'app-input-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './input-form.html'
})
export class InputFormComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), this.forbiddenNameValidator(/admin/i)]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', { validators: [Validators.required], asyncValidators: [this.uniqueUsernameValidator()], updateOn: 'blur' }],
      items: this.fb.array([this.fb.control('Item 1', Validators.required)])
    });
  }

  get items(): FormArray {
    return this.form.get('items') as FormArray;
  }

  addItem() {
    this.items.push(this.fb.control('', Validators.required));
  }

  removeItem(index: number) {
    this.items.removeAt(index);
  }

  forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      return nameRe.test(control.value) ? { forbiddenName: { value: control.value } } : null;
    };
  }

  uniqueUsernameValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) return of(null);
      const taken = ['taken', 'admin', 'user'];
      return of(taken.includes(String(control.value).toLowerCase())).pipe(delay(500), map(isTaken => isTaken ? { usernameTaken: true } : null));
    };
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      console.log('Form invalid:', this.form.errors || 'see control errors');
      return;
    }
    console.log('Form value:', this.form.value);
  }
}
