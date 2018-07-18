import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { CitySearchComponent } from './city-search/city-search.component';
import { WeatherService } from './weather/weather.service';
import { ForecastWeatherComponent } from './forecast-weather/forecast-weather.component';
import { WeatherServiceFake } from './weather/weather.service.fake';
import {MaterialModule} from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        CurrentWeatherComponent,
        CitySearchComponent,
        ForecastWeatherComponent,
      ],
      imports:[
        MaterialModule,
        FormsModule,ReactiveFormsModule,FlexLayoutModule
      ],
      providers:[{provide:WeatherService,
                  useClass:WeatherServiceFake}]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  
});

