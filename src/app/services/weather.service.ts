import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiUrl = environment.weatherUrl;

  constructor(private http: HttpClient) {}

  getWeatherForecast(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`, 
      { withCredentials: true });
  }
}
