import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserRegistration } from '../models/user-registration.model';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private apiUrl = 'https://localhost:7282/api/registration/register';

  constructor(private http: HttpClient) { }

  registerUser(formData: UserRegistration): Observable<any> {
    return this.http.post<any>(this.apiUrl, formData);
  }
}
