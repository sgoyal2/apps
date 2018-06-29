import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {  BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { WeatherService } from './weather/weather.service';
import {HttpClientModule} from '@angular/common/http';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatCardModule,MatToolbarModule, MatButtonModule, MatIconModule,MatFormFieldModule} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CitySearchComponent } from './city-search/city-search.component';
import { MaterialModule } from './material.module';


@NgModule({
  declarations: [
    AppComponent,
    CurrentWeatherComponent,
    CitySearchComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatFormFieldModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    BrowserAnimationsModule,

  ],
  exports:[MatToolbarModule, MatButtonModule, MatIconModule, MatCardModule,MatFormFieldModule,BrowserAnimationsModule, MaterialModule],
  providers: [WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
