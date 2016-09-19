import { Injectable } from "@angular/core";
import { getString, setString } from "application-settings";

import { User } from "./user.model";
import { BackendFirebaseService } from "./backend.firebase.service";

// const tokenKey = "token";

@Injectable()
export class LoginFirebaseService {


  get isLoggedIn(): boolean {
    return this.backend.loggedIn;
  }

  /*
  private get token(): string {
    return getString(tokenKey);
  }
  private set token(theToken: string) {
    setString(tokenKey, theToken);
  }
  */

  constructor(private backend: BackendFirebaseService) {
    /*  
    if (this.token) {
      this.backend.fb.authentication.setAuthorization(this.token, "bearer");
    }
    */
  }

  register(user: User) {
    return this.backend.fb.createUser({
      email: user.email,
      password: user.password
    }).then(function (result) {
      // console.log("User created");
    }).catch(this.handleErrors);
  }

  login(user: User) {
   return this.backend.fb.login({
      type: this.backend.fb.LoginType.PASSWORD,
      email: user.email,
      password: user.password
    }).then((data) => {
      // console.log("User Logged In");
      return Promise.resolve();
    }).catch(this.handleErrors);
  }

  // TODO: Change to promise
  logoff() {
    this.backend.clearListeners();
    this.backend.fb.logout();
  }

  resetPassword(email) {
    return this.backend.fb.resetPassword({
       email: email
    }).then (() => {
       console.log("Password Reset");
    }).catch(this.handleErrors);
  }

  // reject promise
  handleErrors(error) {
    console.log(JSON.stringify(error));
    return Promise.reject(error.message);
  }
}
