import { IWeatherService } from "../interfaces/iweather-service";
import { ICurrentWeather } from "../interfaces/icurrent-weather";
import { Observable, of } from "rxjs";

export class WeatherServiceFake implements IWeatherService{
  private fakeWeather:ICurrentWeather={
    city:'Charlotte',
    country:'US',
    date:new Date(),
    image:'',
    temperature:200.34,
    description:'Sunny',
  }
  
  public getCurrentWeather(city:string|number,country:string):Observable<ICurrentWeather>{
    return of(this.fakeWeather)
  }

  public getForecastWeather(city:string|number,country:string):Observable<ICurrentWeather[]>{
    return of([this.fakeWeather])
  }
}