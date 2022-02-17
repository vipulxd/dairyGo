import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Subject} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class CoreService {
  public _isVerified: boolean;
  public _isSubscribed: boolean;
  public data = new Subject();
  public validationServerUrl = 'http://15.207.18.171:4002/api/cow/userinfo'
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
      this.isLoading.emit(true)
      const headers = new HttpHeaders().set('x-access-token', token)
      this._http.get(`${this.validationServerUrl}/${this._id}`, {headers}).subscribe(
        data => {
          this.data.next(data)
          this.isLoading.emit(false)
        },
        error => {
          console.log(error)
          this.processError(error)
          this.data.error(error)
        }
      )
    }else {
      this.router.navigate(['/mmauth','login'])
    }


  }
public processError(err){
    this.isLoading.emit(true);
    const status = err.status;
    switch(status){
      case 401: {
        localStorage.clear();
        this.router.navigate(['/auth','login'])
      }
        break;
    }

}
public updateProfile(d) {
  console.log(d)
  if (d) {
    const data = {
      name:d.name,
      address: d.address,
      pincode: d.pincode,
      mobileNo: d.mobileNo,
      cows: d.cows,
      goats: d.goats,
      buffalos: d.buffalos,
    }

    const headers = new HttpHeaders().set('x-access-token', this._token)
    this._http.post(`${this.validationServerUrl}/${this._id}`, data, {headers}).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    )
  }
}
}
