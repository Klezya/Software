import { AbstractControl, ValidationErrors } from '@angular/forms';
import { validate } from 'rut.js';

export class CustomValidators {
  static rutValidator(control: AbstractControl): ValidationErrors | null {
    const rut = control.value;
    if (!validate(rut)) {
      return { invalidRut: true };
    }
    return null;
  }

  static fechaValidator(control: AbstractControl): ValidationErrors | null {
    const fecha = new Date(control.value);
    const hoy = new Date();
    if (fecha < hoy) {
      return { invalidDate: true };
    }
    return null;
  }
}