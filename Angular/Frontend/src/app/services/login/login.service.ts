import { UserDataInterface } from './../../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseURL = 'http://localhost:8080/utenti';
  public isLoggedIn: BehaviorSubject<boolean>
  constructor(private http : HttpClient) {
    const isLogged=sessionStorage.getItem("isLoggedIn")==='true';
    this.isLoggedIn=new BehaviorSubject(isLogged);

  }

  public login(usernameAuth:string, passwordAuth:string){
    const headers=new HttpHeaders({
      Authorization : 'Basic '+ btoa(usernameAuth+":"+passwordAuth)});  //btoa= binari to ask
    return this.http.get<any>(this.baseURL + "/", {headers, responseType:'text' as 'json'}).pipe(map(
        userData => {
         sessionStorage.setItem('username',usernameAuth);
         return userData;
        }
      )
      );
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
  public getUsers(usernameAuth:string, passwordAuth:string){
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization : 'Basic '+ btoa(usernameAuth+":"+passwordAuth)});
    return this.http.get<Array<UserDataInterface>>(this.baseURL + "/", {headers});
    }
//Preleva l'utente con l'id passato
  public getUsersById(id: number, usernameAuth:string, passwordAuth:string){
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization : 'Basic '+ btoa(usernameAuth+":"+passwordAuth)});
      return this.http.get<UserDataInterface>(this.baseURL + "/" + id, {headers});
    }
//Preleva l'utente con lo username passato come parametro
    public getUserByUsername(username : string, usernameAuth:string, passwordAuth:string){
      const headers = new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization : 'Basic '+ btoa(usernameAuth+":"+passwordAuth)});
      return this.http.get<UserDataInterface>(this.baseURL + "/username/" + username, {headers});
    }
//Preleva gli utenti che contendono nello username la stringa passata
  public getUsersByPartialUsername(partialUsername: string, usernameAuth:string, passwordAuth:string){
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization : 'Basic '+ btoa(usernameAuth+":"+passwordAuth)});
    return this.http.get<UserDataInterface>(this.baseURL + "/username/like/" + partialUsername, {headers});
  }
//Aggiorna tutti i dati dell'utente
  updateUser =(userId:number, newUser : UserDataInterface, username:string, password:string) => {
    const headers=new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization : 'Basic '+ btoa(username+":"+password)});  //btoa= binari to ask
    return this.http.put<UserDataInterface>(this.baseURL +"/" +userId, JSON.stringify({
    "name": newUser.name,
    "surname": newUser.surname,
    "email": newUser.email,
    "username": newUser.username,
    "password": newUser.password,
    "enabled": newUser.enabled,
    }),{headers})
  }
//Elimina l'utente con l'id passato
  deleteUser(id: number, usernameAuth:string, passwordAuth:string ){
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization : 'Basic '+ btoa(usernameAuth+":"+passwordAuth)});
    return this.http.delete(this.baseURL + "/"+id, {headers});
  }
}
