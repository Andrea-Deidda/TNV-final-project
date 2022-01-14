import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserDataInterface } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private baseURL = 'http://localhost:8080/utenti';

  constructor(private http: HttpClient) { }

  addUser = (newUser: UserDataInterface, username: string, password:string) =>{

    const headers=new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization : 'Basic '+ btoa(username+":"+password)});  //btoa= binari to ask
    return this.http.post<UserDataInterface>(this.baseURL +"/", JSON.stringify({
    "name": newUser.name,
    "surname": newUser.surname,
    "email": newUser.email,
    "username": newUser.username,
    "password": newUser.password,
    "enabled": newUser.enabled,
    }),{headers})
  }

}