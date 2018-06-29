import { Component, OnInit } from '@angular/core';
import { ICurrentWeather } from '../icurrent-weather';
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
    // DEFAULT STATES
    trigger('enterLeave', [
      // :ENTER TRANSITION
      // Transition Styles
      transition('void => *', [
        // 'From' styles
        style({
          opacity: 0.2,
          transform: 'translateX(-100vw)'
        }),
        animate('1000ms ease-in',
          // 'To' styles
          // 1 - Comment this to remove the item's grow...
          style({
            opacity: 1,
            transform: 'scale(1.2)'
          })
        )
      ]),
    ]), 
  ]
})
export class CurrentWeatherComponent implements OnInit {
  current: ICurrentWeather
  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.weatherService.currentWeather.subscribe(data => (this.current = data))
  }

}