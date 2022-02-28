import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {SpinnerDottedComponent} from "spinners-angular/spinner-dotted";

@NgModule({
  declarations: [ LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    SpinnerDottedComponent,
    AuthenticationRoutingModule
  ]
})
export class AuthenticationModule { }
