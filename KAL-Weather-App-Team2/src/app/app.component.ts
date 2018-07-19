import { Component } from '@angular/core';
import { ICurrentWeather } from './icurrent-weather';
import { WeatherService } from './weather/weather.service';

@Component({
  selector: 'app-root',
  template: `
  <div style="text-align:center">
    <mat-toolbar color="primary">Weather App</mat-toolbar>
    <div>
    <app-city-search (searchEvent)="doSearch($event)"></app-city-search>
    <mat-tab-group>
    <mat-tab label="Current Weather">
    <app-current-weather [current]="currentWeather"></app-current-weather>
    </mat-tab> 
    <mat-tab label="Forecast Weather">
    <app-forecast-weather [forecast]="forecast"></app-forecast-weather>
    </mat-tab>
    </mat-tab-group>
    </div>
  </div>  
  `
})
export class AppComponent {
  currentWeather:ICurrentWeather
  forecast:ICurrentWeather[]
  constructor(private weatherService:WeatherService){}
  doSearch(searchInput){
    const userInput=searchInput.split(',').map(s=>s.trim())
        this.weatherService.getCurrentWeather(
          userInput[0],
          userInput.length>1?userInput[1]:undefined
        )
        .subscribe(data=>this.currentWeather=data)

        this.weatherService.getForcastWeather(
          userInput[0],
          userInput.length>1?userInput[1]:undefined
        )
        .subscribe(data=>this.forecast=data)
        
  }
 
}
