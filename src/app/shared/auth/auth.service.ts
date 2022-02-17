import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  error: EventEmitter<any> = new EventEmitter();
  private serverUrl = 'http://15.207.18.171:4001/'
 loading : EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private _http: HttpClient,
              private router: Router,
  ) {
    this.loading.emit(true)
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
          this.setLocalItem(response)

        },
        err => {
          this.error.next(err)
        }
      )
    }
  }

  public setLocalItem(res: ResponseType) {
    localStorage.setItem('token', res.token)
    localStorage.setItem('id', res._id)
    this.router.navigate(['/dashboard']);
  }

  public login(d) {
    if (d) {
      const userDetails = {
        email: d.email,
        password: d.password
      }
      JSON.stringify(userDetails)
      this._http.post<ResponseType>(`${this.serverUrl}login`, userDetails).subscribe(
        res => {
          this.setLocalItem(res)
          this.loading.emit(false)
        },
        err => {
          this.error.next(err)
          this.loading.emit(false)
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

interface ResponseType {
  _id: string,
  first_name: string,
  last_name: string,
  email: string,
  password: string,
  __v: number,
  token: string


}
