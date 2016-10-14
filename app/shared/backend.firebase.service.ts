import { Injectable } from "@angular/core";



import { connectionType, getConnectionType, startMonitoring } from "connectivity";

const firebase = require("nativescript-plugin-firebase");


@Injectable()
export class BackendFirebaseService {
  fb: any;
  user: any;
  loggedIn: boolean = false;
  listeners: any[] = [];


  constructor() {
    this.fb = firebase;
    this.fb.init({
        persist: true,    // Enable offline persistance
        onAuthStateChanged: (data) => {
          this.loggedIn = data.loggedIn;
          if (data.loggedIn) {
            this.user = data.user;
          } else {
            this.user = null;
          }
          console.log("AuthStateChanged:" + this.loggedIn); // DEBUG
        }
    }).then((instance: any) => {
        console.log("firebase initialized successfully");
       // this.setupConnectionMonitoring();
    }, (error: any) => {
        console.log("firebase initialization error: " + error);
    });
  }


  clearListeners() {
    console.log("Called clearlisteners");  // DEBUG
    this.listeners.forEach(
      (lis) => {
         this.fb.removeEventListeners(
           lis.listeners,
           lis.path
         );
      }
    );
  }
}
 