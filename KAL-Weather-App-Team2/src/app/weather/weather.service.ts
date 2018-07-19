import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ICurrentWeather } from '../icurrent-weather';
import { IForecastWeather } from '../interfaces/iforecast-weather';
import { IWeatherService } from '../interfaces/iweather-service';

interface ICurrentWeatherData {
  weather: [{
    description: string,
    icon: string,
  }],
  main: {
    temp: number
  },
  sys: {
    country: string
  },
  dt: Date,
  name: string
}


@Injectable({
  providedIn: 'root'
})


export class WeatherService implements IWeatherService{
  

  forecast=[]

  constructor(private httpClient: HttpClient) { }

  getCurrentWeather(
    search: string|number,
    country?:string
    ):Observable<ICurrentWeather>{
      let uriParams=''
      if(typeof search==='string'){
        uriParams=`q=${search}`
      }
      else{
        uriParams=`zip=${search}`
      }
      if(country){
        uriParams=`${uriParams},${country}`
      }
      return this.getCurrentWeatherHelper(uriParams);
    }


    private getCurrentWeatherHelper(uriParams:string):Observable<ICurrentWeather> {
      return this.httpClient
      .get<ICurrentWeatherData>(
        `http://api.openweathermap.org/data/2.5/weather?` +
      `${uriParams}&appid=${environment.appID}`
      )
      .pipe(map(data=>this.transformToICurrentWeather(data)));
    }

    private transformToICurrentWeather(data: ICurrentWeatherData): ICurrentWeather {
      return {
      city: data.name,
      country: data.sys.country,
      date:  new Date(),
      image: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
      temperature: this.convertKelvinToFahrenheit(data.main.temp),
      description: data.weather[0].description
    }
  }
  private convertKelvinToFahrenheit(kelvin: number): number {
    return kelvin * 9 / 5 - 459.67
  }

  getForcastWeather(search:string|number,
                    country?:string):Observable<ICurrentWeather[]>{
                      let uriParams=''
      if(typeof search==='string'){
        uriParams=`q=${search}`
      }
      else{
        uriParams=`zip=${search}`
      }
      if(country){
        uriParams=`${uriParams},${country}`
      }
      return this.getForcastWeatherHelper(uriParams);
    
                    }

      private getForcastWeatherHelper(uriParams:string):Observable<ICurrentWeather[]>{
        return this.httpClient.get<IForecastWeather>(
          `${environment.baseUrl}api.openweathermap.org/data/2.5/forecast?` +
          `${uriParams}&units=imperial&appid=${environment.appID}`
        ).pipe(map(data => this.transformForecastWeather(data)));
      }
  

  private transformForecastWeather(data: IForecastWeather): ICurrentWeather [] {
        
      this.forecast=[]
      for(let i=2; i<data.list.length; i= i+8){
        const forecastWeather = {city: data.city.name,
                                country: data.city.country,
                                description: data.list[i].weather[0].description,
                                temperature: data.list[i].main.temp,
                                date: data.list[i].dt_txt,
                                image: `${environment.imageUrl}${data.list[i].weather[0].icon}.png`,
         };
         //console.log(forecastWeather);
         //console.log(this.forecast)
         this.forecast.push(forecastWeather);
        }
      //console.log(this.forecast);
       return this.forecast;
    }
  }

 