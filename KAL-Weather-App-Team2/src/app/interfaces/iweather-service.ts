import { ICurrentWeather } from "./icurrent-weather";
import { Observable } from "rxjs";

export interface IWeatherService{
  getCurrentWeather(city:string|number,country:string):Observable<ICurrentWeather>
  getForecastWeather(city:string,country:string):Observable<ICurrentWeather[]>
}