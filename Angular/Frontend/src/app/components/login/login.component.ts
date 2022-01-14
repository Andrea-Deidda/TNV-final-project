//import { SecurityService } from './../../services/security/security.service';
import { SecurityService } from 'src/app/services/security/security.service';
import { UserDataInterface } from './../../models/user.model';
import { LoginService } from './../../services/login/login.service';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService : LoginService, private router: Router, private securityService:SecurityService) { }

  //variabili per l'input
  usernameInput: string;
  passwordInput: string;
  //variabile per il logged in
  invalidLogin = false;
  //variabile per l'alert password errata
  passwordErrata=false;

  userFound: UserDataInterface;
  decryptCode:string;   //accoglie la password decifrata per fare la verifica di login
  code:string;          //veicolo per accogliere la password cryptata da cryptare

  ngOnInit(){
  }
logout() {
  this.loginService.logOut();
  this.router.navigate(['login'])
  window.location.reload();
}
submitButton(){
  if(this.usernameInput != null && this.passwordInput !=null){

    this.loginService.getUserByUsername(this.usernameInput,"admin","admin").subscribe(
      (data : any)=> {
        this.userFound = data;

        this.code=this.userFound.password;
        console.log("Code: ", this.code)
        this.decryptCode=this.securityService.decrypt(this.code);
        console.log("password input ", this.passwordInput); //ricky
        console.log("test Decrypting: ", this.decryptCode);

          if(this.passwordInput===this.decryptCode){
            sessionStorage.setItem('username',this.usernameInput);
            this.invalidLogin = false;
            sessionStorage.setItem('isLoggedIn','true');
            this.router.navigate(['/movieapi']);
            window.location.reload()
        }
        else{
            console.log("Autenticazione fallita");
            this.passwordErrata=true;
        }
      },
      error => console.log(error)
    );
  }
}
}

