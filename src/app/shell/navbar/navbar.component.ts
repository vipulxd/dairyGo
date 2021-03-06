import {AfterViewInit, Component, OnInit} from '@angular/core';
import {CoreService} from "../../services/core.service";
import {AuthService} from "../../services/auth/auth.service";

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
    private profileUrl  = ""
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
            icon : "map"
        },
        // {
        //     name : "Messages",
        //     link : "/cow/messages",
        //     icon : "message",
        // },
        // {
        //     name : "My Account",
        //     link : "/cow/account",
        //     icon : "lock"
        // }
    ]
  constructor(private _coreService : CoreService,
              private _authService : AuthService) { }

  ngOnInit() {
       this._coreService.type.subscribe((val)=>{
           this.type =  val
       })
      this._coreService.verifyProfile()
      this.loadNavigations()
  }
  ngAfterViewInit(){
      this._coreService.profileUrl.subscribe((val)=>{
         this.profileUrl = val
      })
    this._coreService.data.subscribe((data : any) =>{
      this.type =  data.res.type
      this.profile = data;
      this.loadNavigations()
    })

    this._authService.isAuthenticated.subscribe((isAuth)=> {
      this.isAuthenticated = isAuth;
    })
    this._coreService.isAuthenticated.subscribe(isAuth =>{
      this.isAuthenticated = isAuth
    })

  }

  public loadNavigations(){
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
