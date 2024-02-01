import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { Constant } from 'src/app/core/config/constant';

export function ValidatorComplexPassword(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valueOfControl: string = control.value;
    if (!control.value) {
      return null;
    } else if (validatePassword(valueOfControl)) {
      return null;
    } else {
      return { complexPassword: true };
    }
  };

  

  function validatePassword(identity: string) {
    return !!identity.match(Constant.complexPassword);
  }
}
