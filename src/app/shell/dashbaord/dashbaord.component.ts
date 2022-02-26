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
  public isSubscribed: boolean;
  public _id: string;
  public isLoading: boolean;

  constructor(private _authService: AuthService,
              private _coreService: CoreService
  ) {
  }

  ngOnInit() {
    this._id = localStorage.getItem('id')
    this._coreService.isLoading.subscribe(val=>{
     this.isLoading = val;
   })
    this._coreService.loadProfile();
    this._coreService.data.subscribe(
      res => {
        this.processData(res);
      },
      err => {
        this.isLoading = true
      }
    )
  }


  public processData(res) {
this.isVerified = res.response

  }
  public logout(){
    this._authService.logout()
  }
}

interface ResponseInterface {
  isVerified: boolean;
  _id: string,
  first_name: string,
  last_name: string,
  email: string,

}
