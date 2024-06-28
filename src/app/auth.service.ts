import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoginResponse } from './models/login-response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = '/api';

  constructor(private http: HttpClient) {}

  register(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/account/register`, user, {
      withCredentials: true,
    });
  }

  login(user: any): Observable<any> {
    return this.http
      .post<LoginResponse>(`${this.baseUrl}/account/login`, user, {
        withCredentials: true,
      })
      .pipe(
        tap((response) => {
          if (response && response.token) {
            localStorage.setItem('token', response.token);
          }
        })
      );
  }

  logout(): Observable<any> {
    localStorage.removeItem('token');
    return this.http.post(`${this.baseUrl}/account/logout`, {
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
