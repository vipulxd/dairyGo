import {AfterViewInit, Component, OnInit} from '@angular/core';
import {CoreService} from "../../shared/core.service";
import {AuthService} from "../../shared/auth/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit , AfterViewInit {
  isAuthenticated : Boolean = false
  profile : any
  constructor(private _coreService : CoreService,
              private _authService : AuthService) { }

  ngOnInit() {

  }
  ngAfterViewInit(){
    this._coreService.data.subscribe((data : any) =>{
      console.log(data)
      this.profile = data;
    })
    this._authService.isAuthenticated.subscribe((isAuth)=> {
      console.log(isAuth)
      this.isAuthenticated = isAuth;
    })
    this._coreService.isAuthenticated.subscribe(isAuth =>{
      this.isAuthenticated = isAuth
    })
  }
  public logout(){
    this._authService.logout()
  }

}
