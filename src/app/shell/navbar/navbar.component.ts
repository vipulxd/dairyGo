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
  isOpen : Boolean = false;
  opacity : Number = 0
    public type  : string ;
  constructor(private _coreService : CoreService,
              private _authService : AuthService) { }

  ngOnInit() {

  }
  ngAfterViewInit(){
    this._coreService.verifyProfile();
      this._coreService.data.subscribe((data : any) =>{
      this.profile = data;
    })
    this._authService.isAuthenticated.subscribe((isAuth)=> {
      this.isAuthenticated = isAuth;
    })
    this._coreService.isAuthenticated.subscribe(isAuth =>{
      this.isAuthenticated = isAuth
    })
     this.type =  this._coreService.type 
      this.loadNavigations()
  }
  public loadNavigations(){
      
  }
  public logout(){
    this._authService.logout()
  }
 public close(){
    this.isOpen = !this.isOpen
 }
}
