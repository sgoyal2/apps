import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { WeatherService } from '../weather/weather.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-city-search',
  templateUrl: './city-search.component.html',
  styleUrls: ['./city-search.component.css']
})
export class CitySearchComponent implements OnInit {
  search = new FormControl('')
  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.search.valueChanges.pipe(debounceTime(400)).subscribe((searchInput: string) => {
      this.weatherService
        .getCurrentWeather(searchInput).subscribe(data => (this.weatherService.currentWeather.next(data)))
    })
  }  
}  
