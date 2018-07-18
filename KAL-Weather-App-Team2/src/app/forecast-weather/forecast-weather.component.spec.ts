import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastWeatherComponent } from './forecast-weather.component';
import { MaterialModule } from '../material.module';

describe('ForecastWeatherComponent', () => {
  let component: ForecastWeatherComponent;
  let fixture: ComponentFixture<ForecastWeatherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForecastWeatherComponent ],
      imports:[MaterialModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForecastWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
