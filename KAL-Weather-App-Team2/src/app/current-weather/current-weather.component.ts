import { Component, OnInit } from '@angular/core';
import { ICurrentWeather } from '../icurrent-weather';
import { WeatherServiceService } from '../weather-service/weather-service.service';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css']
})
export class CurrentWeatherComponent implements OnInit {
  current: ICurrentWeather
  constructor(private weatherService: WeatherServiceService) {}

  ngOnInit() {
    this.weatherService.getCurrentWeather('Bethesda', 'US')
      .subscribe((data) => this.current = data)
  }

}