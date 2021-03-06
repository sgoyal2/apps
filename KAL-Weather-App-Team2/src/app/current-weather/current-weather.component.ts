import { Component, OnInit, Input } from '@angular/core';
import { ICurrentWeather } from '../interfaces/icurrent-weather';
import { WeatherService } from '../weather/weather.service';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css'],
  animations: [
    trigger('enterLeave', [
      transition('void => *', [
        style({
          opacity: 0.2,
          transform: 'translateX(-100vw)'
        }),
        animate('1000ms ease-in',
          style({
            opacity: 1,
            transform: 'scale(1.2)'
          })
        )
      ])
    ])
  ]
  
})
export class CurrentWeatherComponent implements OnInit {
  @Input() current: ICurrentWeather
  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.weatherService.getCurrentWeather('Seattle','US').subscribe(data => (this.current = data))
  }
}