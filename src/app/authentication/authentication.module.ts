import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";

@NgModule({
  declarations: [ LoginComponent, RegisterComponent ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    AuthenticationRoutingModule,
    MatFormFieldModule,
  ]
})
export class AuthenticationModule { }
