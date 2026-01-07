import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment';
@Injectable({
  providedIn: 'root',
})
export class Auth {
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<AuthModel>(`${environment.apiUrl}/customers/login`, { email, password });
  }

  signup(name: string, email: string, password: string) {
    return this.http.post<AuthModel>(`${environment.apiUrl}/customers/register`, {
      name,
      email,
      password,
    });
  }

  logout() {
    return this.http.post(`${environment.apiUrl}/customers/logout`, {});
  }
}
