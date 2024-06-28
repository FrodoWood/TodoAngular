import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css',
})
export class WeatherComponent implements OnInit {
  weatherData!: any[];

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getWeatherForecast();
  }
  getWeatherForecast() {
    this.weatherService.getWeatherForecast().subscribe({
      next: (data) => {
        this.weatherData = data;
      },
      error: (error) => {
        console.error('Error fething data', error);
      },
    });
  }
}
