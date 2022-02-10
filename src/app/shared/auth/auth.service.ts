import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {resolveFileWithPostfixes} from "@angular/compiler-cli/ngcc/src/utils";
import {Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    error: EventEmitter<any> = new EventEmitter();
    private serverUrl = 'http://15.207.18.171:4001/'
    constructor(private _http: HttpClient ,
    private router : Router
    ) {}
public authorize(){
        const token = localStorage.getItem('token')
    if(token) {
        this.router.navigate(['/dashboard']);
    }
}

    // User Registration service
    public register(data: UserInterface) {
        if (data) {
            const userDetails = {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: data.password,
            }
            JSON.stringify(userDetails)
            this._http.post<ResponseType>(`${this.serverUrl}register`, userDetails).subscribe(
                response => {
                    localStorage.setItem('token',response.token)
                    this.authorize();
                },
                err => {
                this.error.next(err)
                }
            )
        }
    }

    public login(d) {
        if (d) {
            const userDetails = {
                email: d.email,
                password: d.password
            }
            JSON.stringify(userDetails)
            this._http.post<ResponseType>(`${this.serverUrl}login`, userDetails).subscribe(
                res  => {
                    localStorage.setItem('token',res.token)
                    this.authorize();
                },
                err => {
                    this.error.next(err)
                }
            )

        }
    }
}

interface UserInterface {
    firstName?: string,
    lastName?: string,
    email: string,
    password: string
}
interface  ResponseType {
    _id:string,
    first_name:string,
    last_name:string,
    email:string,
    password:string,
    __v:number,
    token:string


}
