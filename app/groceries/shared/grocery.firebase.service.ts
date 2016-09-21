import { Injectable, NgZone } from "@angular/core";
import { BehaviorSubject } from "rxjs/Rx";

import { BackendFirebaseService, LoginFirebaseService } from "../../shared";
import { FirebaseGrocery } from "./grocery.firebase.model";

@Injectable()
export class GroceryFirebaseService {
  items: BehaviorSubject<Array<FirebaseGrocery>> = new BehaviorSubject([]);

  private allItems: Array<FirebaseGrocery> = [];

  groceriesRef: string = "";

  constructor(
    private zone: NgZone,
    private backend: BackendFirebaseService,
    private userService: LoginFirebaseService) {
      this.groceriesRef = "/items/" + this.backend.user.uid;
    }

  load() {
    return new Promise( (resolve, reject) => {
      try {
        this.addListeners();
        resolve();
      } catch (ex) {
        reject(ex);
      }
    });
  }

  private addListeners() {
    this.backend.fb.addChildEventListener((result) => {
        console.log(JSON.stringify(result));  // DEBUG
        if (this.backend.loggedIn) {
          if (result.type === "ChildAdded" || result.type === "ChildChanged") {
            let newItem = new FirebaseGrocery(
              result.key,
              result.value.name,
              result.value.done || false,
              result.value.deleted || false,
              result.value.dateCreated
            );
            this.updateListItem(newItem);
            // this.allItems.push(newItem);
          } else if (result.type === "ChildRemoved") {
            this.deleteListItem(result.key);
          }
        }
    }, this.groceriesRef).then( (listenerWrapper) => {

      // save for latter removal
      console.log("listener:" + JSON.stringify(listenerWrapper));  // DEBUG

      if (listenerWrapper) {
        this.backend.listeners.push({
          "path": listenerWrapper.path,
          "listeners": listenerWrapper.listeners
        });
      }

      console.log("Grocery listener added...");  // DEBUG

      // return Promise.resolve(this.allItems);
    }).catch(this.handleErrors);
  }

  add(name: string) {
    let newGrocery = new FirebaseGrocery("", name, false, false, Date.now());

    // Since we have an addChildEvent listener this will result in
    //  an extra item added to the listview.
    // this.allItems.unshift(newGrocery);

    // this.publishUpdates();
    // Don't save key in data item body
    return this.backend.fb
      .push(this.groceriesRef, {
        "name" : newGrocery.name,
        "done": newGrocery.done,
        "deleted": newGrocery.deleted,
        "dateCreated": newGrocery.dateCreated
      })
      .then((data) => {
        newGrocery.key = data.key;
        return Promise.resolve(newGrocery);
      })
      .catch(this.handleErrors);
  }

  setDeleteFlag(item: FirebaseGrocery) {
    const newItem = new FirebaseGrocery(item.key, item.name, false, true, item.dateCreated);
    // this.updateSingleItem(item, newItem);
    // this.publishUpdates();
    return this.syncItem(newItem);
  }

  toggleDoneFlag(item: FirebaseGrocery, skipSync: boolean = false) {
    const newItem = new FirebaseGrocery(item.key, item.name, !item.done, item.deleted, item.dateCreated);
    // this.updateSingleItem(item, newItem);
    // this.publishUpdates();
    if (skipSync) {
      this.updateListItem(newItem);
      return Promise.resolve(true);
    } else {
      return this.syncItem(newItem);
    }

  }

  restore() {

    return new Promise((resolve, reject) => {
      try {
        this.allItems.forEach((grocery) => {
          if (grocery.deleted && grocery.done) {
            grocery.done = false;
            grocery.deleted = false;
            this.syncItem(grocery);
          }
        });
        // this.publishUpdates()
        resolve();
      } catch (ex) {
           reject(ex);
      }
    });
 }


  syncItem(item: FirebaseGrocery) {
    return this.backend.fb.update(this.groceriesRef + "/" + item.key, {
      "name": item.name,
      "done": item.done,
      "deleted": item.deleted,
      "dateCreated": item.dateCreated
    }).catch(this.handleErrors);
  }

  /*
  private updateSingleItem(item: FirebaseGrocery, newItem: FirebaseGrocery) {
    const index = this.allItems.indexOf(item);
    this.allItems.splice(index, 1, newItem);
  }
  */

  private indexOfKey(key: string) {
    let currItem: FirebaseGrocery = null;
    this.allItems.forEach((gr) => {
      if (gr.key && gr.key === key) {
        currItem = gr;
      }
    });
    return this.allItems.indexOf(currItem);
  }

  private updateListItem(item: FirebaseGrocery) {

    const index = this.indexOfKey(item.key);
    if (index !== -1) {
      this.allItems.splice(index, 1, item);
    } else {
      console.log("Adding:" + JSON.stringify(item));
      this.allItems.push(item);
    }
    this.publishUpdates();
  }

  private deleteListItem(key: string) {
     const index = this.indexOfKey(key);
     if (index !== -1) {
       this.allItems.splice(index, 1);
       this.publishUpdates();
     }

  }

  private publishUpdates() {
    // Make sure all updates are published inside NgZone so that change detection is triggered if needed
    this.zone.run(() => {
      // must emit a *new* value (immutability!)
      this.items.next([...this.allItems]);
    });
  }

  private handleErrors(error) {
    console.log(JSON.stringify(error));
    return Promise.reject(error.message);
  }

}

