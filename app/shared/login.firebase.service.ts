import { Injectable } from "@angular/core";
import { getString, setString } from "application-settings";

import { User } from "./user.model";
import { BackendFirebaseService } from "./backend.firebase.service";

// const tokenKey = "token";

@Injectable()
export class LoginService {

  currentUser: any;

  get isLoggedIn(): boolean {
    return !(this.currentUser === null);
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
    return this.backend.fb.createUser({ email: user.email, password: user.password} )
        .then(function (result) {
            this.currentUser = result;
        },
        function (error) {
            this.handleErrors(error);
        }
      );
  }

  login(user: User) {
    return this.backend.fb.login(
        {
            type: this.backend.fb.LoginType.PASSWORD,
            email: user.email,
            password: user.password
        }).then(
            (data) => {
                this.currentUser = data;
                return Promise.resolve();
            }).catch(this.handleErrors);
  }

  logoff() {
    this.backend.fb.logout();
    this.currentUser = null;
  }

  resetPassword(email) {
    return this.backend.fb.resetPassword(
        { email: email }).then (
           () => {
                console.log("Password Reset");
            },
            (errors) => {
                this.handleErrors(errors);
            }
        );
  }

  handleErrors(error) {
    console.log(JSON.stringify(error));
    return Promise.reject(error.message);
  }
}
