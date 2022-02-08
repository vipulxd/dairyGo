import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {PreviewRoutingModule} from "./preview/preview-routing.module";
import {IntroductionComponent} from "./preview/introduction/introduction.component";
import {AuthenticationRoutingModule} from "./authentication/authentication-routing.module";
import {AuthComponent} from "./authentication/auth/auth.component";
import {LoginComponent} from "./authentication/login/login.component";
import {RegisterComponent} from "./authentication/register/register.component";
import {ShellRoutingModule} from "./shell/shell-routing.module";
import {SpinnerDottedModule} from "spinners-angular/spinner-dotted";

@NgModule({
  declarations: [
    AppComponent,
    IntroductionComponent,
    AuthComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    PreviewRoutingModule,
    AuthenticationRoutingModule,
    ShellRoutingModule,
    SpinnerDottedModule,
    AppRoutingModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
