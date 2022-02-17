import {Component, EventEmitter, OnInit} from '@angular/core';
import {AuthService} from "../../shared/auth/auth.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    public email: string;
    public password: string;
    public loading: EventEmitter<boolean>;
public error : any ;
    constructor(private _authService: AuthService) {}

    ngOnInit() {
         this._authService.loading.subscribe(
          val =>{
            this.loading = val
          }
        );
    }

    onUpdate(details) {
        switch (details.name) {
            case "email" :
                this.email = details.value
                break;
            case "password" :
                this.password = details.value
                break;
        }
    }

    public login() {
        if (this.email && this.password) {
            const data = {
                email: this.email,
                password: this.password
            }
            this._authService.login(data)
        }
    }
}
