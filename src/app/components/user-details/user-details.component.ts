import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


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
        password: ['', Validators.required],
        passwordConfirm: ['', Validators.required],
        email: ['', Validators.email]
      }));
    }
  }

  get userDetails(): FormGroup {
    return this.parentForm.get('userDetails') as FormGroup;
  }
}
