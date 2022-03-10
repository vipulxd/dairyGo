import { Component, OnInit } from '@angular/core';
import {CoreService} from "../shared/core.service";
import {AuthService} from "../shared/auth/auth.service";

@Component({
  selector: 'app-calf',
  templateUrl: './calf.component.html',
  styleUrls: ['./calf.component.scss']
})
export class CalfComponent implements OnInit {
public type : String =  "CALF"
 public profile ;
public pincode
  constructor(private _coreService : CoreService,
  public _authService : AuthService
  ) { }

  ngOnInit() {
    this._coreService.verifyProfile()
    this._coreService.data.subscribe(data  =>{
      this.profile = data
      this.pincode = data.res.pincode
    })
  }
  public logout(){
    this._authService.logout()
  }

}
