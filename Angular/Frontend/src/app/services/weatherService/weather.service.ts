import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private baseURL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"; // URL Statico

  private apiKey = "9T96JX2DTRZ4M9WVXWYEF7BD5" 
  private currentWeather = "&include=current"

  constructor(private http: HttpClient) { }

  getWeatherData( city ) {
    return this.http.get<any>(this.baseURL + city + "%2C%2088%2C%20IT?unitGroup=us&key=" + this.apiKey + this.currentWeather);
  }
  

   }
