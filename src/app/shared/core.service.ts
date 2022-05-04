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
  public isSubscribed = new EventEmitter();
  isAuthenticated : EventEmitter<Boolean> = new EventEmitter<Boolean>()
  public data = new Subject();
  public type: string
  public _id: string;
  public isLoading = new EventEmitter();
  public _token: string;
  public name: string;
public selfLocation : string ;
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
        (data : any) => {
          console.log(data)
          this.data.next(data)
          this.name = data.first_name;
          this.selfLocation = data.latlng
          this.validateProfile(data)
          this.isAuthenticated.emit(true)
          this.isSubscribed.emit(data.isSubscribed);
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
          this.isLoading.emit(false)
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

/** VALIDATE a profile type */
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

/** Process the ERRORS */
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

  /**UPDATE a user either COW or CALF */
  public updateProfile(d) {
    this.isLoading.next(true)
    this._id = localStorage.getItem('id')
    this._token = localStorage.getItem('token')
    this.isSubscribed = d.isSubscribed;
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
          latlng: d.latlng,
          buffalos: d.buffalos,
          type: d.type,
        }
      } else {
        data = {
          profileImage:d.profileImage,
          address: d.address,
          pincode: d.pincode,
          mobileNo: d.mobileNo,
          latlng: d.latlng,
          type: d.type
        }
      }
      this._http.post(`${this.updateVaidationServerUrl}/${d.type}/${this._id}`, data, {headers}).subscribe(
        (data: any) => {
          const type = data.res.type
          localStorage.setItem('TYPE', type)
          this.type = type
          this.validateProfile(data)
        },
        () => {
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
    const headers = new HttpHeaders().set('x-access-token', this._token)
    const body = {
      name: this.name,
      calfid: id,
      sub_id: 2

    }

    this._http.post(`${this.updateVaidationServerUrl}/${type}/subscribe/${cowid}`, body, {headers}).subscribe(() => {
      this.isSubscribed.emit(true)
      this.isLoading.next(false)
    },()=>{
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

  /** GET locations for cow **/
  
  public getAllLocations( t : string) : Observable<any>{
      const headers =  new HttpHeaders().set('x-access-token',this._token)
      return  this._http.get(`${this.updateVaidationServerUrl}/${t}/map/location`,{headers})
  }

  /** GET location by ID **/
  public getLocationById(id:string) : Observable<any>{
      const TYPE = 'CALF'
      const headers = new HttpHeaders().set('x-access-token',this._token)
      return this._http.get(`${this.updateVaidationServerUrl}/${TYPE}/map/${id}`,{headers})
  }


}
