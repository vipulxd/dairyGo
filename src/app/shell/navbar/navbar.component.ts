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
    public type : String;
  isOpen : Boolean = false;
  public navigation  = []
  calf_navigations = [
      {
          name : "Dashboard",
          link : "/calf/",
          icon : "home"
      },
      {
          name: "My Subscriptions",
          link : "/calf/subscription",
          icon : "verified_user"
      },
      {
          name : "Messages",
          link : "/calf/messages",
          icon : "message"
      },
      {
          name : "My Account",
          link : "/calf/account",
          icon : "lock"
      },
  ]
    cowNavigations = [
        {
            name : "Dashboard",
            link : "/cow/",
            icon : "home"
        },
        {
            name : "My Subscribers",
            link : "/cow/subscribers",
            icon : "verified_user"
        },
        {
            name : "Messages",
            link : "/cow/messages",
            icon : "message",
        },
        {
            name : "My Account",
            link : "/cow/account",
            icon : "lock"
        }
    ]
  constructor(private _coreService : CoreService,
              private _authService : AuthService) { }

  ngOnInit() {
      this.type =  this._coreService.type
      this.loadNavigations()
  }
  ngAfterViewInit(){
    this._coreService.data.subscribe((data : any) =>{
      this.type =  data.res.type
      this.profile = data;
      this.loadNavigations()
    })
    this._authService.isAuthenticated.subscribe((isAuth)=> {
      console.log(isAuth)
      this.isAuthenticated = isAuth;
    })
    this._coreService.isAuthenticated.subscribe(isAuth =>{
      this.isAuthenticated = isAuth
    })

  }
  
  public loadNavigations(){
      console.log(this.type)
      if(this.type){
          if(this.type == 'CALF'){
              this.navigation = this.calf_navigations
          }else if (this.type == 'COW'){
              this.navigation =  this.cowNavigations
          }
      }
  }
  
  
  public logout(){
    this._authService.logout()
  }
 public close(){
    this.isOpen = !this.isOpen
 }
}
