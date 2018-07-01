import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather/weather.service';
import { ICurrentWeather } from '../icurrent-weather';

@Component({
  selector: 'app-forecast-weather',
  templateUrl: './forecast-weather.component.html',
  styleUrls: ['./forecast-weather.component.css']
})
export class ForecastWeatherComponent implements OnInit {

  forecastWeathers :ICurrentWeather []
  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.weatherService.getForcastWeather('', '').subscribe((data) => this.forecastWeathers = data)
  }

}
