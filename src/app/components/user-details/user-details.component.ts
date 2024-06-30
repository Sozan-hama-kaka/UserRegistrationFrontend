import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  @Input() parentForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    if (!this.parentForm.get('userDetails')) {
      this.parentForm.addControl('userDetails', this.fb.group({
        name: ['', Validators.required],
        firstName: ['', Validators.required],
        loginName: ['', Validators.required],
        password: ['', [
          Validators.required,
          Validators.minLength(6),
          this.patternValidator(/\d/, { hasDigit: true }),
          this.patternValidator(/[A-Z]/, { hasUpperCase: true }),
          this.patternValidator(/\W/, { hasNonAlphanumeric: true })
        ]],
        passwordConfirm: ['', Validators.required],
        email: ['', Validators.email]
      }));
    }

    // Add custom validator for password match
    this.parentForm.get('userDetails.passwordConfirm')?.setValidators(this.passwordMatchValidator());
    // Update validity status on change
    this.parentForm.get('userDetails.password')?.valueChanges.subscribe(() => {
      this.parentForm.get('userDetails.passwordConfirm')?.updateValueAndValidity();
    });
  }

  // Custom validator function for patterns
  patternValidator(regex: RegExp, validatorOptions: any): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        // if control is empty return no error
        return null;
      }
      // test the value of the control against the regexp supplied
      const valid = regex.test(control.value);
      // if true, return no error (no error), else return error passed in the second parameter
      return valid ? null : validatorOptions;
    };
  }

  // Custom validator function for password match
  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const password = this.parentForm.get('userDetails.password')?.value;
      const confirmPassword = control.value;
      return password === confirmPassword ? null : { 'passwordMismatch': true };
    };
  }

  get userDetails(): FormGroup {
    return this.parentForm.get('userDetails') as FormGroup;
  }
}
