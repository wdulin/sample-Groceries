import { Injectable } from "@angular/core";

import { connectionType, getConnectionType, startMonitoring } from "connectivity";

const firebase = require("nativescript-plugin-firebase");


@Injectable()
export class BackendFirebaseService {
  fb: any;

    // private lastOnlineState;

  constructor() {
    this.fb = firebase;
    this.fb.init({
        persist: true    // Enable offline persistance
    }).then((instance: any) => {
        console.log("firebase initialized successfully");
       // this.setupConnectionMonitoring();
    }, (error: any) => {
        console.log("firebase initializatopm error: " + error);
    });
  }

  /*
  setupConnectionMonitoring() {
    this.handleOnlineOffline();
    this.lastOnlineState = getConnectionType();
    startMonitoring(() => {

     this.handleOnlineOffline();

      // If the user comes back online sync any changes they
      // made while offline.
      if (getConnectionType() !== connectionType.none
        && this.lastOnlineState === connectionType.none) {
        this.fb.sync();
      }

      this.lastOnlineState = getConnectionType();
    });
  }
  */

  // Everlive must be explicitly set to online or offline mode
  // el.offline - sets the SDK to work offline
  // el.online - sets the SDK to work online
  /*
  private handleOnlineOffline() {
    if (getConnectionType() === connectionType.none) {
      this.fb.offline();
    } else {
      this.fb.online();
    }
  }
  */
}
 