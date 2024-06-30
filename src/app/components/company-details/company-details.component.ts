import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent implements OnInit {
  @Input() parentForm!: FormGroup;
  industries: any[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    if (!this.parentForm.get('companyDetails')) {
      this.parentForm.addControl('companyDetails', this.fb.group({
        companyName: ['', Validators.required],
        industryId: ['', Validators.required]
      }));
    }

    this.loadIndustries();
  }

  get companyDetails(): FormGroup {
    return this.parentForm.get('companyDetails') as FormGroup;
  }

  loadIndustries() {
    this.http.get<any[]>('https://localhost:7282/api/industry')
      .subscribe(data => {
        this.industries = data;
      });
  }
}
