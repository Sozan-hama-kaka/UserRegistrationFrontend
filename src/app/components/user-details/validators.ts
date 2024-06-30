import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('passwordConfirm');

  if (!password || !confirmPassword) {
    return null;
  }

  if (confirmPassword.value && confirmPassword.dirty) {
    return password.value !== confirmPassword.value ? { 'passwordMismatch': true } : null;
  }

  return null;
};
