import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor() { }

  loginUser(credential) {
    return new Promise((accept, reject) => {
        accept("Login correcto");
    });
  }
}
