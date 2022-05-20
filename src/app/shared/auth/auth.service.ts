import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated  = new EventEmitter<boolean>()
  error: EventEmitter<any> = new EventEmitter();
  profile : Subject<any> = new Subject<any>()
  // private serverUrl = 'http://65.2.71.121:4000/'
  private serverUrl =  "http://13.233.157.142:4001/"
 loading : EventEmitter<boolean> = new EventEmitter<boolean>() ;
  constructor(private _http: HttpClient,
              private router: Router,
  ) {
  }
  public authorize(){
    if(localStorage.getItem('token') != null && localStorage.getItem('id') != null){
      const type  = localStorage.getItem('TYPE')
      this.processUser(type)
    }
  }

  // User Registration service
  public register(data: UserInterface) {
    this.loading.emit(true)
    if (data) {
      const userDetails = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      }
      JSON.stringify(userDetails)
      this._http.post<ResponseType>(`${this.serverUrl}register`, userDetails).subscribe(
        (res : any) => {
         this.profile.next(res.res)
         this.setLocalItem(res.res)
        },
        err => {
          this.error.next(err.error.res)
          this.loading.emit(false)
        }
      )
    }
  }

  public setLocalItem(res: ResponseType) {
    localStorage.setItem('token', res.token)
    localStorage.setItem('id', res._id)
    localStorage.setItem('TYPE',res.type)
    this.processUser(res.type)
    }



  private processUser(type:String){
    this.loading.emit(false)

    switch(type){
      case 'PENDING':{
        this.isAuthenticated.emit(false)
        this.router.navigate(['setup'])
    break;
      }
      case  'CALF' :{
        this.isAuthenticated.emit(true)
        this.router.navigate(['calf'])
        break;
      }
      case 'COW':{
        this.isAuthenticated.emit(true)
        this.router.navigate(['cow'])
      break;
      }
    }
  }

  // User login
  public logout() {
    this.loading.emit(true)
    localStorage.clear()
      this.isAuthenticated.emit(false)

      if (localStorage.getItem('token') == null) {
      setTimeout(() => {
        this.loading.emit(false)
        this.router.navigate(['/'])
      }, 2000)
    }

  }
  public login(d) {
    this.loading.emit(true)
    if (d) {
      const userDetails = {
        email: d.email,
        password: d.password
      }
      JSON.stringify(userDetails)
      this._http.post<ResponseType>(`${this.serverUrl}login`, userDetails).subscribe(
        (res: any) => {
          this.profile.next(res)
          this.setLocalItem(res)
        },
        err => {
          this.error.next(err.error.res)
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
  user: ResponseType,
  _id: string,
  first_name: string,
  last_name: string,
  email: string,
  password: string,
  __v: number,
  token: string,
type:string

}
