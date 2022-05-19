import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class CoreService {
    public globalValidationServerUrl = 'http://13.233.157.142:4002/api'
    public rootimageUrl = 'http://13.233.157.142:4002/'
    public messagesServiceUrl = 'http://localhost:4003/messages'

    public isSubscribed = new EventEmitter();
    isAuthenticated: EventEmitter<Boolean> = new EventEmitter<Boolean>()
    public data = new Subject();
    public type: EventEmitter<string> = new EventEmitter<string>()
    public selfType : string
    public _id: string;
    public isLoading = new EventEmitter();
    public _token: string;
    public name: string;
    public profileUrl: EventEmitter<string> = new EventEmitter<string>();
    public selfLocation: string;
    public cow_id : string;

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
                (data: any) => {
                    this.data.next(data)
                    this.name = data.first_name;
                    this.selfLocation = data.latlng
                    this.validateProfile(data)
                    this.cow_id = data.res.sub_id
                    this.selfType =  data.res.type
                    this._id = data.res._id;
                    this.isAuthenticated.emit(true)
                    this.isSubscribed.emit(data.res.isSubscribed);
                    this.profileUrl.emit(`${this.rootimageUrl}${data.res.profileImage}`)
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
                    this.isAuthenticated.emit(false)
                }
            )
        } else {
            this.router.navigate(['/auth', 'login'])
        }
    }

    /** Load messages **/
    public  loadMessages() : Observable<any>{
      this.selfType = localStorage.getItem('TYPE')
        let id ;
        if(this.selfType == 'COW') {
          id = localStorage.getItem('id')
        }else {
          id = this.cow_id
        }
          const token = localStorage.getItem('token')
        const headers = new HttpHeaders().set('x-access-token',token)
        console.log(token , id , this.selfType)
       if(token && id && this.selfType ) {
          return this._http.get(`${this.messagesServiceUrl}/${id}`,{headers})
       }
    }

    /** SEND message **/
    public sendMessage(m: string , senderId: string){
        const id = localStorage.getItem('id')
        const type =  localStorage.getItem('TYPE')
        const token = localStorage.getItem('token')
        const headers = new HttpHeaders().set('x-access-token',token)
        let data 
        if(type == 'CALF') {
            data = {
                from: id,
                to: this.cow_id,
                message: m , 
                type : type
            }
        }else {
            data = {
                from : id,
                to : senderId,
                message : m ,
                type : type
            }
        }
        JSON.stringify(data)
        
        if(id && token){
            this._http.post(`${this.messagesServiceUrl}/message/cow`, data, {headers}).subscribe((val)=>{
                console.log(val)
            }, (e)=>{
                console.error(e)
            })
        }
    }

    /** VALIDATE a profile type */
    public validateProfile(data) {
        this.isLoading.next(false)
        this.type.emit(data.res.type)
        switch (data.res.type) {
            case 'PENDING': {
                this.type = data.res.type;
                this.router.navigate(['setup'])
                break;
            }
            case  'COW' : {
                this.type = data.res.type
                this.router.navigate(['cow'])
                break;
            }
            case 'CALF' : {
                this.type = data.res.type
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
                    address: d.address,
                    pincode: d.pincode,
                    mobileNo: d.mobileNo,
                    latlng: d.latlng,
                    type: d.type
                }
            }
            this._http.post(`${this.globalValidationServerUrl}/${d.type}/${this._id}`, data, {headers}).subscribe(
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
        if (pincode) {
            const type = localStorage.getItem('TYPE')
            this._token = localStorage.getItem('token')
            const headers = new HttpHeaders().set('x-access-token', this._token)
            return this._http.get(`${this.globalValidationServerUrl}/${type}/find/${pincode}`, {headers})
        }
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

        this._http.post(`${this.globalValidationServerUrl}/${type}/subscribe/${cowid}`, body, {headers}).subscribe(() => {
            this.isSubscribed.emit(true)
            this.isLoading.next(false)
        }, () => {
            this.isLoading.next(false)
        })
    }

    /* GET all calf associated to a COW */
    public getAllCalfs(): Observable<any> {
        const id = localStorage.getItem('id');
        this._token = localStorage.getItem('token')
        const type = localStorage.getItem('TYPE')

        const headers = new HttpHeaders().set('x-access-token', this._token)
        return this._http.get(`${this.globalValidationServerUrl}/${type}/find/all/${id}`, {headers})
    }

    /** GET locations for cow **/

    public getAllLocations(t: string): Observable<any> {
        const headers = new HttpHeaders().set('x-access-token', this._token)
        return this._http.get(`${this.globalValidationServerUrl}/${t}/map/location`, {headers})
    }

    /** GET location by ID **/
    public getLocationById(id: string): Observable<any> {
        const TYPE = 'CALF'
        const headers = new HttpHeaders().set('x-access-token', this._token)
        return this._http.get(`${this.globalValidationServerUrl}/${TYPE}/map/${id}`, {headers})
    }

    /** Upload image **/
    upload(f: any) {
        let formData = new FormData();
        for (var i = 0; i < f.length; i++) {

            formData.append("image", f[i], f[i].name);
        }
        this._http.post(`${this.globalValidationServerUrl}/upload/image/${this._id}`, formData)
            .subscribe((res: any) => {
                this.profileUrl = res.res.path
            })
    }

}
