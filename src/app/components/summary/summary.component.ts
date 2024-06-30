import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { RegistrationService } from '../../services/user-registration.service'; // Adjust the path based on your project structure
import { UserRegistration } from '../../models/user-registration.model'; 

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  @Input() parentForm!: FormGroup;
  @Output() reset = new EventEmitter<void>();
  
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private registrationService: RegistrationService // Inject RegistrationService
  ) {}

  ngOnInit() {
    if (!this.parentForm.get('approvalDetails')) {
      this.parentForm.addControl('approvalDetails', this.fb.group({
        termsOfService: [false, Validators.requiredTrue],
        privacyPolicy: [false, Validators.requiredTrue]
      }));
    }
  }

  get approvalDetails(): FormGroup {
    return this.parentForm.get('approvalDetails') as FormGroup;
  }

  onSubmit() {
    if (this.parentForm.valid) {
      const formData: UserRegistration = {
        companyName: this.parentForm.get('companyDetails.companyName')?.value,
        industryId: this.parentForm.get('companyDetails.industryId')?.value,
        userName: this.parentForm.get('userDetails.name')?.value,
        firstName: this.parentForm.get('userDetails.firstName')?.value,
        login: this.parentForm.get('userDetails.loginName')?.value,
        password: this.parentForm.get('userDetails.password')?.value,
        passwordConfirmation: this.parentForm.get('userDetails.passwordConfirm')?.value,
        email: this.parentForm.get('userDetails.email')?.value,
        termsAccepted: this.parentForm.get('approvalDetails.termsOfService')?.value,
        privacyPolicyAccepted: this.parentForm.get('approvalDetails.privacyPolicy')?.value,
      };

      this.registrationService.registerUser(formData).subscribe(
        (response: any) => {
          console.log('Registration successful: ', response);
          alert('Registration successful!');
          this.reset.emit();  // Emit reset event on successful submission
        },
        (error: HttpErrorResponse) => {
          console.error('Error submitting registration: ', error);
          if (error.error instanceof ErrorEvent) {
            // Client-side error
            alert('An error occurred: ' + error.error.message);
          } else {
            // Server-side error
            alert('Server error: ' + error.status + ' - ' + error.error);
            if (error.error.errors) {
              alert('Validation errors: ' + error.error.errors.join(', '));
            }
          }
        }
      );
    } else {
      alert('Please complete all required fields.');
    }
  }

  onReset() {
    if (confirm('Are you sure you want to reset all form data?')) {
      this.reset.emit();
    }
  }

  getIndustryName(id: number): string {
    return id === 1 ? 'Technology' : id === 2 ? 'Finance' : 'Other';
  }
}
