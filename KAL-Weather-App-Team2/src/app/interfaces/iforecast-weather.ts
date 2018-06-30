export interface IForecastWeather {
    city:{
        name:string,
        country: string
    },
    list:[{
        main:{
            temp:number
        },
    
    weather: [{
        description: string,
        icon: string
      }],
     dt_txt: Date
    }]    
}
