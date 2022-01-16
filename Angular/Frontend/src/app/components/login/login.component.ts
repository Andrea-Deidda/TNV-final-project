import { LoginData, LoginSend } from './../../models/login.model';

import { LoginService } from './../../services/login/login.service';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }

  //variabili per l'input
  usernameInput: string;
  passwordInput: string;
  //variabile per il logged in
  invalidLogin = false;
  //variabile per l'alert password errata
  passwordErrata = false;

  userFound: LoginData;
  decryptCode: string;   //accoglie la password decifrata per fare la verifica di login
  code: string;          //veicolo per accogliere la password cryptata da cryptare

  ngOnInit() {
  }
  logout() {
    this.loginService.logOut();
    this.router.navigate(['login'])
    window.location.reload();
  }
  submitButton() {

    if (this.usernameInput != null && this.passwordInput != null) {
      var loginToSend: LoginSend = {
        "username": this.usernameInput,
        "password": this.passwordInput
      };
      this.loginService.login(loginToSend).subscribe(response => {
        this.userFound = response;
        var match = this.userFound.match;
        var validation = this.userFound.validation;
        if (match && validation) {
          sessionStorage.setItem('username', this.userFound.username);
          this.invalidLogin = false;
          this.loginService.saveLoggedIn();
          this.router.navigate(['/movieapi'])
            .then(() => {
              window.location.reload();
            });

        }
        else if (!(match && validation)) {
          console.log("Autenticazione fallita");
          this.passwordErrata = true;
        }
      }), err => {
        console.log(err);
      }
    }
  }
}
