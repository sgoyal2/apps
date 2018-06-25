import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FutureForecastComponent } from './future-forecast/future-forecast.component';

@NgModule({
  declarations: [
    AppComponent,
    FutureForecastComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
