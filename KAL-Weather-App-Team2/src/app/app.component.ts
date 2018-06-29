import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <div style="text-align:center">
    <h1>Local Weather App</h1>
    <div>Search for your city</div>
    <div>
    <app-city-search></app-city-search></div>
    <h2>Current Weather</h2>
    <app-current-weather></app-current-weather>  
  </div>  
  `,
})
export class AppComponent {}
