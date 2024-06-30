import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoginResponse } from './models/login-response.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/account/register`, user, {
      withCredentials: true,
    });
  }

  login(user: any): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/account/login`, user, {
        withCredentials: true,
      });
  }

  logout(): Observable<any> {
    localStorage.removeItem('token');
    return this.http.post(`${this.apiUrl}/account/logout`, {
      withCredentials: true,
    });
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
