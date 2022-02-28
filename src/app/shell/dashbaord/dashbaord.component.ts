import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../shared/auth/auth.service";
import {CoreService} from "../../shared/core.service";

@Component({
  selector: 'app-dashbaord',
  templateUrl: './dashbaord.component.html',
  styleUrls: ['./dashbaord.component.scss']
})
export class DashbaordComponent implements OnInit {
  public isVerified: boolean = true;
  public isLoading: boolean;
  public userInfo ;
  public name : string;
  public phoneNo: string;
  public  userAddress : string;
  constructor(private _authService: AuthService,
              private _coreService: CoreService
  ) {
  }

  ngOnInit() {
   this.isLoading = true
    this._coreService.loadProfile()
    this._coreService.data.subscribe(
      res => {
        this.processData(res);
        this.userInfo =  res;
        this.loadProfile()
      },
      err => {
        this.isLoading = true
      }
    )
  }
public loadProfile(){
  this.name = this.userInfo.response.first_name + this.userInfo.response.last_name
  this.phoneNo = this.userInfo.response.mobileNo;
  this.userAddress = this.userInfo.response.address;


}
  public processData(res) {
    if(res.response.isVerified)  {
      this.isVerified =  true

      this.isLoading = false
    }else {
      this.isVerified = false
      this.isLoading = false
    }

  }
  public logout(){
    this._authService.logout()
  }
}
