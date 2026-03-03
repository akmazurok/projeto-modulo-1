import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function amountLessThanBalance(
  getBalance: () => number
): ValidatorFn {

  return (control: AbstractControl): ValidationErrors | null => {

    if (control.value == null) return null;

    return Number(control.value) > getBalance()
      ? { insufficientBalance: true }
      : null;
  };
}