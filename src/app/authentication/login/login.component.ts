import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../shared/auth/auth.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    public email: string;
    public password: string;
    public loading: boolean;
public error : any ;
    constructor(private _authService: AuthService) {
        this._authService.error.subscribe(
            error=>{
                this.error = error.error;
                if(this.error){
                    this.loading = false;
                }

            }
        )
    }

    ngOnInit() {
        this._authService.authorize();
        this.loading = false;
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
        this.loading = true
        if (this.email && this.password) {
            const data = {
                email: this.email,
                password: this.password
            }
            this._authService.login(data)
        }
    }
}
