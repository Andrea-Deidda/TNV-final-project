import { CurrentWeather, currentWeatherInterface } from './../../models/weather.model';
import { WeatherService } from './../../services/weatherService/weather.service';
import { Component, OnInit } from '@angular/core';
import { currentWeatherFather } from './../../models/weather.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  weatherFatherBis: currentWeatherInterface; //contiene tutti i dati meteo e previsioni

  dataConditions: any;  //contiente dati condizioni attuali meteo

  celsius: any; //contiene valore dati gradi
  celsiusStringa: string;

  constructor(private weatherService: WeatherService, private Router: Router) { }

  ngOnInit(): void {
    this.GetWeatherData();
  }


  // Funzione GET di weatherapi da weather service
  GetWeatherData() {
    this.weatherService.getWeatherData("Cagliari").subscribe((
      response: any) => {
      this.weatherFatherBis = response;
      this.dataConditions = this.weatherFatherBis.currentConditions;
      this.celsius = ((this.dataConditions.temp - 32) * 5 / 9).toFixed(1); 
    },
      error => console.log(error)
    )
  }
}