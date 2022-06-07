import { Component, OnInit } from '@angular/core';
import {CoreService} from "../services/core.service";
import {AuthService} from "../services/auth/auth.service";

@Component({
  selector: 'app-calf',
  templateUrl: './calf.component.html',
  styleUrls: ['./calf.component.scss']
})
export class CalfComponent implements OnInit {
public type : String =  "CALF"
 public profile ;
public pincode
public isSubscribed : Boolean;
constructor(private _coreService : CoreService,
  public _authService : AuthService
  ) { }

  ngOnInit() {
    this._coreService.verifyProfile()
    this._coreService.isSubscribed.subscribe(val =>{
      this.isSubscribed =  val
    })


    this._coreService.data.subscribe((data : any )  =>{
      this.profile = data
      this.pincode = data.res.pincode
    })
  }
  public logout(){
  // Remove auth key and clear localStorage
    this._authService.logout()
  }

}
