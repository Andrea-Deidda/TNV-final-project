import { LoginData } from './../../models/login.model';
import { UserDataInterface } from './../../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { LoginSend } from '../../models/login.model';

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  Authorization: 'Basic ' + btoa("admin" + ":" + "admin")
});

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseURL = 'http://localhost:8080/utenti';
  public isLoggedIn: BehaviorSubject<boolean>
  constructor(private http: HttpClient) {
    const isLogged = sessionStorage.getItem("isLoggedIn") === 'true';
    this.isLoggedIn = new BehaviorSubject(isLogged);

  }
  //verifica se l'utente è loggato
  isUserLoggedIn() {
    let user = sessionStorage.getItem('username')
    //console.log(!(user === null))
    return !(user === null)
  }
  //Effettua il logout dell'utente dalla sessione
  logOut() {
    sessionStorage.clear()
  }
  //visualizza la lista di tutti gli utenti presenti nel database
  public getUsers() {
    return this.http.get<Array<UserDataInterface>>(this.baseURL + "/", { headers });
  }
  //Preleva l'utente con l'id passato
  public getUsersById(id: number) {
    return this.http.get<UserDataInterface>(this.baseURL + "/" + id, { headers });
  }
  //Preleva l'utente con lo username passato come parametro
  public getUserByUsername(username: string) {
    return this.http.get<LoginData>(this.baseURL + "/username/" + username, { headers });
  }
  //Login
  public login(loginToSend : LoginSend) {
    return this.http.post<LoginData>(this.baseURL + "/login", loginToSend, { headers });
  }
  //Preleva gli utenti che contendono nello username la stringa passata
  public getUsersByPartialUsername(partialUsername: string) {
    return this.http.get<UserDataInterface>(this.baseURL + "/username/like/" + partialUsername, { headers });
  }
  //Aggiorna tutti i dati dell'utente
  updateUser = (userId: number, newUser: UserDataInterface, username: string, password: string) => {
    return this.http.put<UserDataInterface>(this.baseURL + "/" + userId, JSON.stringify({
      "name": newUser.name,
      "surname": newUser.surname,
      "email": newUser.email,
      "username": newUser.username,
      "password": newUser.password
    }), { headers })
  }
  //Elimina l'utente con l'id passato
  deleteUser(id: number) {
    return this.http.delete(this.baseURL + "/" + id, { headers });
  }
}
