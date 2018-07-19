import { Component, OnInit, Input } from "@angular/core";
import { WeatherService } from "../weather/weather.service";
import { ICurrentWeather } from "../interfaces/icurrent-weather";

@Component({
  selector: "app-forecast-weather",
  templateUrl: "./forecast-weather.component.html",
  styleUrls: ["./forecast-weather.component.css"]
})
export class ForecastWeatherComponent implements OnInit {
  @Input() forecast: ICurrentWeather[];
  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.weatherService
      .getForcastWeather("Seattle", "US")
      .subscribe(data => (this.forecast = data));
  }
}
