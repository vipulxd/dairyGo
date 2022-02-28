import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PreviewRoutingModule} from "./preview/preview-routing.module";
import {IntroductionComponent} from "./preview/introduction/introduction.component";
import {AuthenticationRoutingModule} from "./authentication/authentication-routing.module";
import {LoginComponent} from "./authentication/login/login.component";
import {RegisterComponent} from "./authentication/register/register.component";
import {ShellRoutingModule} from "./shell/shell-routing.module";
import {SpinnerDottedModule} from "spinners-angular/spinner-dotted";
import {DashbaordComponent} from "./shell/dashbaord/dashbaord.component";
import {HttpClientModule} from '@angular/common/http';
import {UserSetupComponent} from "./shell/user-setup/user-setup.component";
import {LoaderComponent} from "./shell/loader/loader.component";
import {SpinnerCircularModule} from "spinners-angular/spinner-circular";
import {SpinnerCircularSplitModule} from "spinners-angular/spinner-circular-split";
import {ShellModule} from "./shell/shell.module";
import {SubscribersComponent} from "./shell/dashbaord/subscribers/subscribers.component";

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    IntroductionComponent,
    LoginComponent,
    RegisterComponent,
    DashbaordComponent,
    SubscribersComponent,
    UserSetupComponent,
  ],
  imports: [

    BrowserModule,
    HttpClientModule,
    PreviewRoutingModule,
    AuthenticationRoutingModule,
    ShellRoutingModule,
    SpinnerDottedModule,
    AppRoutingModule,
    SpinnerCircularModule,
    SpinnerCircularSplitModule,



  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
