import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <div style="text-align:center">
<<<<<<< HEAD
    <mat-toolbar color="primary">Weather App</mat-toolbar>
=======
    <h1>Local Weather App</h1>
    <div>Search for your city</div>
>>>>>>> f057825e1da21ed2aacfb9fc397ab27728378edf
    <div>
    <app-city-search></app-city-search>
      </div>
  </div>  
  `
})
export class AppComponent {}
