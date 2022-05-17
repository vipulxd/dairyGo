import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AuthService} from "../../shared/auth/auth.service";
import {CoreService} from "../../shared/core.service";

@Component({
  selector: 'app-conversations',
  templateUrl: './conversations.component.html',
  styleUrls: ['./conversations.component.scss']
})
export class ConversationsComponent implements OnInit , AfterViewInit{
public isAuthenticated : Boolean = false
  public isOpen : Boolean = false;
public isSubscribed : Boolean = false;
testChats = [
  {
    name:"Vipul Dev",
    profileUrl:"http://13.233.157.142:4002/uploads/image_627744cfff3363bf7263a336.jpeg"
  },{
    name:"Aman Srivaastave",
    profileUrl:"http://13.233.157.142:4002/uploads/image_627744cfff3363bf7263a336.jpeg"
  },{
    name:"Rattan Chauhan",
    profileUrl:"http://13.233.157.142:4002/uploads/image_627744cfff3363bf7263a336.jpeg"
  },{
    name:"Abhishek",
    profileUrl:"http://13.233.157.142:4002/uploads/image_627744cfff3363bf7263a336.jpeg"
  },{
    name:"Abhinash",
    profileUrl:"http://13.233.157.142:4002/uploads/image_627744cfff3363bf7263a336.jpeg"
  },{
    name:"Rahul",
    profileUrl:"http://13.233.157.142:4002/uploads/image_627744cfff3363bf7263a336.jpeg"
  },{
    name:"Kaushik Uttal",
    profileUrl:"http://13.233.157.142:4002/uploads/image_627744cfff3363bf7263a336.jpeg"
  }
]
  public type : string ;
  constructor( public _authService : AuthService,
               public _coreService : CoreService
               ) { }

  ngOnInit() {
  }
  ngAfterViewInit(){
    this._authService.isAuthenticated.subscribe((isAuth)=> {
      this.isAuthenticated = isAuth;
    })
    this._coreService.isAuthenticated.subscribe(isAuth =>{
      this.isAuthenticated = isAuth
    })
this._coreService.type.subscribe(val =>{
  this.type = val;
})
    console.log(this.type)
    this._coreService.isSubscribed.subscribe(val =>{
      this.isSubscribed = val
    })
  }
  public  toggleMessenger(){
    this.isOpen = !this.isOpen
  }
}
