import { NativeScriptModule } from "nativescript-angular/platform";
import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { authProviders, appRoutes } from "./app.routing";
import { AppComponent } from "./app.component";
import { setStatusBarColors, BackendFirebaseService, LoginFirebaseService } from "./shared";

import { LoginModule } from "./login/login.module";
import { GroceriesModule } from "./groceries/groceries.module";

setStatusBarColors();

@NgModule({
  providers: [
    BackendFirebaseService,
    LoginFirebaseService,
    authProviders
  ],
  imports: [
    NativeScriptModule,
    NativeScriptRouterModule,
    NativeScriptRouterModule.forRoot(appRoutes),
    LoginModule,
    GroceriesModule,
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
