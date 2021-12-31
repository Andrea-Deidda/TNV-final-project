import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiPictureService {

  private url = 'https://image.tmdb.org/t/p/original';

  constructor(private http: HttpClient) { }

  getMoviePics(backdrop_path: string){
    return this.http.get<any>(this.url + backdrop_path)

  }

}
