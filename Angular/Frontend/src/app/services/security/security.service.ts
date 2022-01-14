import { Injectable } from '@angular/core';
const SECRET_KEY = 'secret_key';
import CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor() {}

  encrypt(code) {
    //   code = CryptoJS.AES.decrypt(code, SECRET_KEY);
     //  code = code.toString(CryptoJS.enc.Utf8);
     var codeEncrypted =btoa(code);
     return codeEncrypted;
     }

   // Encrypt input data
   //encrypt(code) {
    //code = CryptoJS.AES.encrypt(code, SECRET_KEY);
    //code = code.toString();
     // return code;
  //}

  // Decrypt input data
  decrypt(code) {
 //   code = CryptoJS.AES.decrypt(code, SECRET_KEY);
  //  code = code.toString(CryptoJS.enc.Utf8);
  var codeDecrypted =atob(code);
  console.log(codeDecrypted);
  return  codeDecrypted;
  }

}
