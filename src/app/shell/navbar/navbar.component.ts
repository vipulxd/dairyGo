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
  isOpen : Boolean = true;
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
            link : "/cow/subscrbers",
            icon : "verified_user"
        },
        {
            name : ""
        }
    ]
  opacity : Number = 0
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
this.type =  this._coreService.type
      this.loadNavigations()
  }
  
  public loadNavigations(){
      if(this.type){
          if(this.type == 'CALF'){
              
              
              
          }else if (this.type == 'COW'){
              
              
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
