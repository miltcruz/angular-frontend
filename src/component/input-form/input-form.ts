import {Component} from '@angular/core';
import {FormGroup, FormControl, ReactiveFormsModule} from '@angular/forms';
@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.html',
  imports: [ReactiveFormsModule],
})
export class InputFormComponent {

    form = new FormGroup({
        firstName: new FormControl(''),
        lastName: new FormControl(''),
    });

    onSubmit() {
    // TODO: Use EventEmitter with form value
        console.warn(this.form.value);
    }
}