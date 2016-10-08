import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { getString, setString } from "application-settings";

import { User } from "./user.model";
import { BackendFirebaseService } from "./backend.firebase.service";


@Injectable()
export class LoginFirebaseService {


  get isLoggedIn(): boolean {
    return this.backend.loggedIn;
  }


  constructor(private backend: BackendFirebaseService, private router: Router) {
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
   console.log("Login Service : login - " + JSON.stringify(user));
   return this.backend.fb.login({

      type: this.backend.fb.LoginType.PASSWORD,
      email: user.email,
      password: user.password
    }).then((data) => {
      // console.log("User Logged In");
      console.log("Login:" + JSON.stringify(data)); // DEBUG
      return Promise.resolve();
    }).catch(this.handleErrors);
  }

  // TODO: Change to promise
  logoff() {
    this.backend.clearListeners();
    this.backend.fb.logout().then( () => {
      this.router.navigate(["/login"]);
      console.log("Log Out"); // DEBUG
    }).catch(this.handleErrors);
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
