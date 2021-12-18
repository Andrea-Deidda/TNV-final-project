import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MeteoApiInterface } from '../models/data.model';

@Injectable({
  providedIn: 'root'
})
export class SuggestService {
  private baseUrl="https://api.openweathermap.org/data/2.5/weather?q="
  private apiKey="&appid=e65730ad36513a7741d41f238b46b195"
  
  constructor(private http: HttpClient) {}

    getMeteo(citta){
      return this.http.get<MeteoApiInterface>(this.baseUrl + citta + this.apiKey);

  }
}
