import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MeteoApiInterface } from '../models/data.model';

@Injectable({
  providedIn: 'root'
})
export class SuggestService {
  private baseUrl="https://api.openweathermap.org/data/2.5/weather?q="
  private apiKey="KEY"
  
  constructor(private http: HttpClient) {}

    getMeteo(citta){
      return this.http.get<MeteoApiInterface>(this.baseUrl + citta + this.apiKey);

  }
}
