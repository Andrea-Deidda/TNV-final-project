import { LoginService } from './../../services/login/login.service';
import { Router } from '@angular/router';
import { UserDataInterface } from './../../models/user.model';
import { NgForm } from '@angular/forms';
import { RegistrationService } from './../../services/registration/registration.service';
import { Component, OnInit } from '@angular/core';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { SignUpInfo } from '../../models/SignUpInfo';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  newUser: SignUpInfo;
  users: UserDataInterface[]; //utti gli utenti
  username: string;
  isSignedUpFailed = false;
  emailError = false;
  usernameError = false;
  errorMessageUsername = "";
  errorMessageEmail = "";

  //variabili per il controllo password "uguale"
  password: string;
  confirmPassword: string;
  passwordOk = true;

  passwordCryptata: string; //contiente la password inserita dall'utente ma cryptata

  constructor(private registrationService: RegistrationService, private router: Router, private userService: LoginService) { }

  ngOnInit(): void {

  }

  //metodo di verifica click checkbox termini e condizioni
  click(ev) {
  }
  //verifica se le password inserite dall'utente sono uguali
  checkPassword(form: NgForm): boolean {
    this.password = form.form.value.password;
    this.confirmPassword = form.form.value.confirmPassword;
    if (this.password !== this.confirmPassword) {
      return false
    }
    else {
      this.passwordCryptata = this.password;
      //this.password=
      return true
    }
  }

  //Crea un nuovo utente in base ai dati inseriti in input
  createUser(form: NgForm): void {
    let passMatched = this.checkPassword(form); //controllo password metching
    if (passMatched) {
      this.newUser = new SignUpInfo(
        form.form.value.name,
        form.form.value.surname,
        form.form.value.username,
        form.form.value.email,
        form.form.value.password
      );

      console.log(this.newUser);
      this.registrationService.addUser(this.newUser, "admin", "admin").subscribe(response => {
          this.isSignedUpFailed = false;
          this.router.navigate(['/login'])
            .then(() => {
              window.location.reload();
            })
      },
      error=>{
        console.log(error);
        this.isSignedUpFailed = true;
        var stringCheck = error.error;
        if (stringCheck == "Username già utilizzato") {
          this.emailError = false;
          this.usernameError = true;
        }
        if (stringCheck == "Email già utilizzata") {
          this.emailError = true;
          this.usernameError = false;
        }
        if (stringCheck == "Email e Username già utilizzati") {
          this.emailError = true;
          this.usernameError = true;
        }

        if(this.emailError && this.usernameError){
          this.errorMessageUsername = "Username già utilizzato";
          this.errorMessageEmail = "Email già utilizzata";
        }
        if(!this.emailError && this.usernameError){
          this.errorMessageUsername = "Username già utilizzato";
        }
        if(this.emailError && !this.usernameError){
          this.errorMessageEmail = "Email già utilizzata";
        }
      });

    } else {
      this.isSignedUpFailed = true;
    }

  }
}
