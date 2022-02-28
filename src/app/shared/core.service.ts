import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Subject} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class CoreService {
  // public validationServerUrl = 'http://15.207.18.171:4002/api/cow/userinfo'
  public globalValidationServerUrl = 'http://localhost:4002/api'
  public updateVaidationServerUrl =  'http://localhost:4002/api'
  public _isVerified: boolean = false;
  public _isSubscribed: boolean;
  public data = new Subject();s
public type :string
  public _id: string;
  public isLoading = new EventEmitter();
  public _token : string;
  constructor(public _http: HttpClient,
  public router : Router
  ) {
    this._id = localStorage.getItem('id')
  this._token = localStorage.getItem('token')
  }

  public authorize(){
    const token =  localStorage.getItem('token')
    if(token != null) {
      return token
    }
    return
  }

  loadProfile() {
    const token = this.authorize();
    if( token != null) {
      const headers = new HttpHeaders().set('x-access-token', token)
      this._http.get(`${this.globalValidationServerUrl}/${this._id}`, {headers}).subscribe(
        data => {
          this.data.next(data)
          this.isLoading.emit(false)
        },
        error => {
          this.processError(error)
          this.data.error(error)
        }
      )
    }else {
      this.router.navigate(['/auth','login'])
    }


  }
  validateProfile() {
    const token = this.authorize();
    if( token != null) {
      const headers = new HttpHeaders().set('x-access-token', token)
      this._http.get(`${this.globalValidationServerUrl}/${this.type}/${this._id}`, {headers}).subscribe(
        data => {
          this.data.next(data)
          this.isLoading.emit(false)
        },
        error => {
          this.processError(error)
          this.data.error(error)
        }
      )
    }else {
      this.router.navigate(['/auth','login'])
    }


  }
public processError(err){
    this.isLoading.emit(true);
    const status = err.status;
    switch(status){
      case 401: {
        this.isLoading.emit(true)
        localStorage.clear();
        this.isLoading.emit(false)
        this.router.navigate(['/auth','login'])
      }
        break;
    }

}
public updateProfile(d,type) {
this.isLoading.emit(true)
  this.type =  type;
  if (d) {
    const headers = new HttpHeaders().set('x-access-token', this._token)
var data ;
    if (type == 'cow') {
       data = {
        name: d.name,
        address: d.address,
        pincode: d.pincode,
        mobileNo: d.mobileNo,
        cows: d.cows,
        goats: d.goats,
        buffalos: d.buffalos,
        type: type,
      }
    }else {
      data = {
        name: d.name,
        address: d.address,
        pincode: d.pincode,
        mobileNo: d.mobileNo,
        type: type,
        email: d.email,
      }
    }
    console.log(data)
      this._http.post(`${this.updateVaidationServerUrl}/${type}/${this._id}`, data, {headers}).subscribe(
        res => {
          this.validateProfile()
        },
        err => {
          this.isLoading.emit(false)
          console.log(err);
        }
      )
    }
  }
}
