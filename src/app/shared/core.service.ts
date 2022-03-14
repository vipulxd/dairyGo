import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class CoreService {
  // public validationServerUrl = 'http://15.207.18.171:4002/api/cow/userinfo'
  public globalValidationServerUrl = 'http://localhost:4002/api'
  public updateVaidationServerUrl = 'http://localhost:4002/api'

  public _isVerified: boolean = false;
  public _isSubscribed: boolean;
  public data = new Subject();
  public type: string
  public _id: string;
  public isLoading = new EventEmitter();
  public _token: string;
  public name: string;

  constructor(private _http: HttpClient,
              private router: Router
  ) {
  }


  verifyProfile() {
    this.isLoading.next(true)
    const token = localStorage.getItem('token')
    const _id = localStorage.getItem('id')
    const type = localStorage.getItem('TYPE')
    if (token !== null && type !== 'PENDING') {
      let headers = new HttpHeaders().set('x-access-token', token)
      this._http.get(`${this.globalValidationServerUrl}/${type}/${_id}`, {headers}).subscribe(
        data => {
          this.data.next(data)
          this.name = data.res.first_name;
          this.validateProfile(data)
          // this.isLoading.emit(false)
        },
        error => {
          this.processError(error)
          this.data.error(error)
          this.isLoading.next(false)
        }
      )
    } else if (token !== null && type == 'PENDING') {
      const headers = new HttpHeaders().set('x-access-token', token)
      this._http.get(`${this.globalValidationServerUrl}/${_id}`, {headers}).subscribe(
        data => {
          this.validateProfile(data)
          // this.isLoading.emit(false)
        },
        error => {
          this.processError(error)
          this.data.error(error)
          this.isLoading.next(false)
        }
      )
    } else {
      this.router.navigate(['/auth', 'login'])
    }
  }

  public validateProfile(data) {
    this.isLoading.next(false)
    switch (data.res.type) {
      case 'PENDING': {
        this.router.navigate(['setup'])
        break;
      }
      case  'COW' : {
        this.router.navigate(['cow'])
        break;
      }
      case 'CALF' : {
        this.router.navigate(['calf'])
        break;
      }
    }
  }


  public processError(err) {
    // this.isLoading.emit(true);
    const status = err.status;
    switch (status) {
      case 401: {
        // this.isLoading.emit(true)
        localStorage.clear();
        // this.isLoading.emit(false)
        this.router.navigate(['/auth', 'login'])
      }
        break;
      case 404 : {
        this.router.navigate(['..'])
      }

        break;
    }

  }

  public updateProfile(d) {
    this.isLoading.next(true)
    this._id = localStorage.getItem('id')
    this._token = localStorage.getItem('token')
    console.log(d)
// this.isLoading.emit(true)
    if (d) {
      const headers = new HttpHeaders().set('x-access-token', this._token)
      let data
      if (d.type == 'COW') {
        data = {
          profileImage:d.profileImage,
          address: d.address,
          pincode: d.pincode,
          mobileNo: d.mobileNo,
          cows: d.cows,
          goats: d.goats,
          buffalos: d.buffalos,
          type: d.type,
        }
      } else {
        data = {
          profileImage:d.profileImage,
          address: d.address,
          pincode: d.pincode,
          mobileNo: d.mobileNo,
          type: d.type
        }
      }
      console.log(data)
      this._http.post(`${this.updateVaidationServerUrl}/${d.type}/${this._id}`, data, {headers}).subscribe(
        data => {
          const type = data.res.type
          localStorage.setItem('TYPE', type)
          this.type = type
          this.validateProfile(data)
        },
        err => {
          // this.isLoading.emit(false)
          this.isLoading.next(false)
        }
      )
    }
  }

  /* GET all cows */
  public getCows(pincode: String): Observable<any> {
    const type = localStorage.getItem('TYPE')
    this._token = localStorage.getItem('token')
    const headers = new HttpHeaders().set('x-access-token', this._token)
    return this._http.get(`${this.updateVaidationServerUrl}/${type}/find/${pincode}`, {headers})
  }

  /* SUBSCRIBE to a cow */
  public subscribeToCow(cowid) {
    this.isLoading.next(true)
    const id = localStorage.getItem('id')
    this._token = localStorage.getItem('token')
    const type = localStorage.getItem('TYPE')
    console.log(cowid)
    const headers = new HttpHeaders().set('x-access-token', this._token)
    const body = {
      name: this.name,
      calfid: id,
      sub_id: 2

    }
    JSON.stringify(body)
    this._http.post(`${this.updateVaidationServerUrl}/${type}/subscribe/${cowid}`, body, {headers}).subscribe(data => {
      console.log(data)
      this.isLoading.next(false)
    },err=>{
      console.log(err)
      this.isLoading.next(false)
    })
  }

  /* GET all calf associated to a COW */
  public getAllCalfs() :Observable<any>{
    const id = localStorage.getItem('id');
    this._token = localStorage.getItem('token')
    const type = localStorage.getItem('TYPE')

    const headers = new HttpHeaders().set('x-access-token', this._token)
    return this._http.get(`${this.updateVaidationServerUrl}/${type}/find/all/${id}`,{headers})
  }

}
