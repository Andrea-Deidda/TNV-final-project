import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserDataInterface } from '../../models/user.model';
import { SignUpInfo } from '../../models/SignUpInfo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private baseURL = 'http://localhost:8080/utenti';

  constructor(private http: HttpClient) { }

  addUser (newUser: SignUpInfo, username: string, password:string): Observable<string> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        Authorization : 'Basic '+ btoa(username+":"+password),  //btoa= binari to ask
      }),responseType: 'text' as 'json'
    };

    return this.http.post<string>(this.baseURL +"/", newUser, httpOptions)
  }

}
