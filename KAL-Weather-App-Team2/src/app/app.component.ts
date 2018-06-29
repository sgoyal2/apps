import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <div style="text-align:center">
    <mat-toolbar color="primary">Weather App</mat-toolbar>
    <div>
    <app-city-search></app-city-search>
    </div>
  </div>  
  `
})
export class AppComponent {}
