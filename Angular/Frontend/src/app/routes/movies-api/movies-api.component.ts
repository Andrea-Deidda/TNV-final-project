import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weatherService/weather.service';
import { Router } from '@angular/router';
import { ConditionsInterface, CurrentWeather, currentWeatherFather, currentWeatherInterface } from 'src/app/models/weather.model';
import { MoviesApiService } from 'src/app/services/moviesapi.service';

@Component({
  selector: 'app-movies-api',
  templateUrl: './movies-api.component.html',
  styleUrls: ['./movies-api.component.css']
})
export class MoviesApiComponent implements OnInit {

  movies: any;
  results: any[];

  weatherFatherBis: currentWeatherInterface; //contiene tutti i dati meteo e previsioni
  currentWeatherBis: ConditionsInterface[];
  data: any;

  dataConditions: any;  //contiente dati condizioni attuali meteo

  celsius: any; //contiene valore dati gradi
  celsiusStringa: string;
  city: string;

  
  todaysWeather: string

  public weatherFather: currentWeatherFather;
  public weatherArray: CurrentWeather[];
  public currentWeather: CurrentWeather;

  orarioAttuale: number

  mattina: boolean = false
  pomeriggio: boolean = false
  sera: boolean = false

  constructor(private apiService: MoviesApiService, private weatherService: WeatherService, private router: Router) { }

  ngOnInit(): void {
    this.GetWeatherData();
    this.getMovieByCurrentWeather();
  }
  GetWeatherData() {
    this.city="newyork"
    this.weatherService.getWeatherData(this.city).subscribe((
      response: any) => {
      this.weatherFatherBis = response;
      this.dataConditions = this.weatherFatherBis.currentConditions;
      this.celsius = ((this.dataConditions.temp - 32) * 5 / 9).toFixed(1); 
    },
      error => console.log(error)
    )
  }

  // METEO FUNZIONI
  getMovieByCurrentWeather() {

    this.weatherService.getWeatherData(this.city).subscribe((
      response: any) => {
      //se è andato tutto bene, allora:
      this.weatherFatherBis = response;
      console.log("weatherFatherBis: ", this.weatherFatherBis);
      this.data = this.weatherFatherBis.currentConditions;
      console.log("Data: ", this.data);

      this.todaysWeather = this.data.conditions;
      console.log("  Dato Test" + this.todaysWeather);

      this.orarioAttuale = parseInt(this.data.datetime);

      // COSTRUTTI CONDIZIONALI SUGGERIMENTI FILM IN BASE AL METEO E ALLìORARIO DELLA GIORNATA:
      //se MATTINA
      if (this.orarioAttuale >= 7 && this.orarioAttuale < 13) {
        if (this.todaysWeather == "Clear") {
          this.getAnimationMovieListOnComponent();
        }
        if (this.todaysWeather == "Rain") {
          this.getComedyMovieListOnComponent();
        }
        if (this.todaysWeather == "Thunderstorm") {
          this.getRomanceFictionListOnComponent();
        }
        if (this.todaysWeather == "Partially cloudy") {
          this.getScienceFictionListOnComponent();
        }
        else {
          this.getScienceFictionListOnComponent();
        }
      }
      //se POMERIGGIO
      if (this.orarioAttuale >= 13 && this.orarioAttuale < 19) {
        if (this.todaysWeather == "Clear") {
          this.getWesternMovieListOnComponent();
        }
        if (this.todaysWeather == "Rain") {
          this.getFamilyMovieListOnComponent();
        }
        if (this.todaysWeather == "Thunderstorm") {
          this.getThrillerMovieListOnComponent();
        }
        if (this.todaysWeather == "Partially cloudy") {
          this.getComedyMovieListOnComponent();
        }
        else {
          this.getWesternMovieListOnComponent();
        }
      }
      //se SERA
      if (this.orarioAttuale >= 19 && this.orarioAttuale < 24) {
        if (this.todaysWeather == "Clear") {
          this.getAdventuresMovieListOnComponent();
        }
        if (this.todaysWeather == "Rain") {
          this.getDramasMovieListOnComponent();
        }
        if (this.todaysWeather == "Thunderstorm") {
          this.getHorrorMovieListOnComponent();
        }
        if (this.todaysWeather == "Partially cloudy") {
          this.getThrillerMovieListOnComponent();
        }
        else {
          this.getDramasMovieListOnComponent();
        }
      }
      //se NOTTE
      if (this.orarioAttuale >= 0 && this.orarioAttuale < 7) {
        if (this.todaysWeather == "Clear") {
          this.getScienceFictionListOnComponent();
        }
        if (this.todaysWeather == "Rain") {
          this.getRomanceFictionListOnComponent();
        }
        if (this.todaysWeather == "Thunderstorm") {
          this.mattina = true;
          this.getHorrorMovieListOnComponent();
        }
        if (this.todaysWeather == "Partially cloudy") {
          this.mattina = true;
          this.getAdventuresMovieListOnComponent();
        }
        else {
          this.getThrillerMovieListOnComponent();
        }
      }
    },
      error => console.log(error)
    )
  }

  getterWeatherDataOnComponent() {
    this.weatherService.getWeatherData(this.city).subscribe((
      response: any) => {
      this.weatherFatherBis = response;
      console.log("weatherFatherBis: ", this.weatherFatherBis)
      this.data = this.weatherFatherBis.currentConditions;
      console.log("Data: ", this.data);
      console.log("data conditions" + this.data.conditions);
      this.todaysWeather = this.data.conditions;
      console.log("  Dato Test" + this.todaysWeather)
    },
      error => console.log(error)
    )
  }

  exGetterWeatherData() {
    this.weatherService.getWeatherData(this.city).subscribe((
      response: any) => {
      console.log("Previsioni meteo: ")
      this.weatherFather = response;
      console.log(this.weatherFather)
      this.weatherArray = this.weatherFather.days;
      console.log(this.weatherFather.days)
    },
      error => console.log(error)
    )

  }
  //visualizza la lista dei film Marvel
  getMarvelListOnComponent() {
    this.apiService.getMarvelList().subscribe(
      response => {
        //se è andato tutto bene, allora:
        this.movies = response;
        console.log("Dati dei film: ", this.movies);
        this.results = this.movies.results;
        console.log("Results: ", this.results)
        //console.log("I dati stringify: " + JSON.stringify(this.movies))
      },
      error => console.log(error)
    )
  }
  //Visualizza i film science fiction
  getScienceFictionListOnComponent() {
    this.apiService.getScienceFictionList().subscribe(
      response => {
        this.movies = response;
        this.results = this.movies.results;
        console.log("Sci-fi Movies: ", this.results)
      },
      error => console.log(error)
    )
  }
  //visualizza i film Drama
  getDramasMovieListOnComponent() {
    this.apiService.getDramaMovieList().subscribe(
      response => {
        this.movies = response;
        this.results = this.movies.results;
        console.log(this.results)
      },
      error => console.log(error)
    )
  }
  //Visualizza i film comedy
  getComedyMovieListOnComponent() {
    this.apiService.getComedyMovieList().subscribe(
      response => {
        this.movies = response;
        this.results = this.movies.results;
        console.log(this.results)
      },
      error => console.log(error)
    )
  }
  //Visualizza i film romantici
  getRomanceFictionListOnComponent() {
    this.apiService.getRomanceFictionList().subscribe(
      response => {
        this.movies = response;
        this.results = this.movies.results;
        console.log(this.results)
      },
      error => console.log(error)
    )
  }

  //animazione
  getAnimationMovieListOnComponent() {
    this.apiService.getAnimationMovieList().subscribe(
      response => {
        this.movies = response;
        this.results = this.movies.results;
        console.log(this.results)
      },
      error => console.log(error)
    )
  }
  //triller
  getThrillerMovieListOnComponent() {
    this.apiService.getThrillerMovieList().subscribe(
      response => {
        this.movies = response;
        this.results = this.movies.results;
        console.log(this.results)
      },
      error => console.log(error)
    )
  }
  //adventures
  getAdventuresMovieListOnComponent() {
    this.apiService.getAdventuresMovieList().subscribe(
      response => {
        this.movies = response;
        this.results = this.movies.results;
        console.log(this.results)
      },
      error => console.log(error)
    )
  }
  //family
  getFamilyMovieListOnComponent() {
    this.apiService.getFamilyMovieList().subscribe(
      response => {
        this.movies = response;
        this.results = this.movies.results;
        console.log(this.results)
      },
      error => console.log(error)
    )
  }
  //Horror
  getHorrorMovieListOnComponent() {
    this.apiService.getHorrorMovieList().subscribe(
      response => {
        this.movies = response;
        this.results = this.movies.results;
        console.log(this.results)
      },
      error => console.log(error)
    )
  }
  //Western
  getWesternMovieListOnComponent() {
    this.apiService.getWesternMovieList().subscribe(
      response => {
        this.movies = response;
        this.results = this.movies.results;
        console.log(this.results)
      },
      error => console.log(error)
    )
  }
}
