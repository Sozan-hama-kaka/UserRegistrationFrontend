import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  mainForm: FormGroup;
  @ViewChild('stepper') stepper!: MatStepper;

  constructor(private fb: FormBuilder) {
    this.mainForm = this.fb.group({
      companyDetails: this.fb.group({
        companyName: [''],
        industryId: ['']
      }),
      userDetails: this.fb.group({
        name: [''],
        firstName: [''],
        loginName: [''],
        password: [''],
        passwordConfirm: [''],
        email: ['']
      }),
      approvalDetails: this.fb.group({
        termsOfService: [false],
        privacyPolicy: [false]
      })
    });
  }

  resetForm() {
    this.mainForm.reset();
    this.stepper.reset();
  }
}
