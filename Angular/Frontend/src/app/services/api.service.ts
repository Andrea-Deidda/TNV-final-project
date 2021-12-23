import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MovieApiInterface } from '../models/data.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = "https://api.themoviedb.org/4";
  private apiKey = "api_key=e0e8473128438a9278efe19808edf5b1";

  constructor( private http : HttpClient) { }

  getMovies(){
    return this.http.get<MovieApiInterface>(this.baseUrl+"/list/1?"+this.apiKey);
  }
}
