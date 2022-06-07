import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
 public firstName: string ;
 public lastName : string ;
 public email : string;
 public password: string;
    public loading :boolean = false;
    public error  :string;
  constructor( public _authService : AuthService) {
      this._authService.error.subscribe(
          error=>{
              this.error = error;
              if(this.error){
                  this.loading = false;
              }

          }
      )
  }

  ngOnInit() {
this._authService.authorize()
  }
public onUpdate(d){
   switch(d.name) {
       case 'firstName' : this.firstName = d.value;
       break;
       case 'lastName' : this.lastName = d.value;
       break;
       case 'email' : this.email = d.value;
       break ;
       case 'password' : this.password =  d.value;
   }
}
public register(){
      this.loading = true;
  const data  =  {
      firstName  : this.firstName,
      lastName : this.lastName,
      email: this.email,
      password : this.password
  }
  this._authService.register(data)
}
}
