import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { LoginResponse } from './models/login-response.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private loggedIn = new BehaviorSubject<boolean>(false);
  private userDetails = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {
    this.checkLoginStatus().subscribe((isLoggedIn) => this.loggedIn.next(isLoggedIn));
    this.fetchUserDetails().subscribe((details) => this.userDetails.next(details));
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/account/register`, user, { withCredentials: true }).pipe(
      tap(() => {
        this.loggedIn.next(true)
        this.fetchUserDetails().subscribe();
      })
    );
  }

  login(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/account/login`, user, { withCredentials: true }).pipe(
      tap(() => {
        this.loggedIn.next(true)
        this.fetchUserDetails().subscribe();
      })
    );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/account/logout`, {}, { withCredentials: true }).pipe(
      tap(() => {this.loggedIn.next(false);
        this.userDetails.next(null);
      })
    );
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  getUserDetails(): Observable<boolean> {
    return this.userDetails.asObservable();
  }

  private checkLoginStatus(): Observable<boolean> {
    return this.http.get<{ isLoggedIn: boolean }>(`${this.apiUrl}/account/isLoggedIn`, { withCredentials: true }).pipe(
      map(response => response.isLoggedIn)
    );
  }

  private fetchUserDetails() : Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/account/userDetails`, {withCredentials:true}).pipe(
      tap(details => this.userDetails.next(details))
    );
  }
}
