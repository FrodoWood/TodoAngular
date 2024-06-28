import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private baseUrl = '/WeatherForecast/';

  constructor(private http: HttpClient) {}

  getWeatherForecast(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl, { withCredentials: true });
  }
}
