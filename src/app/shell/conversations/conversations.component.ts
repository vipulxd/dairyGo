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
public message  : string = ''
 public selfId : string
  public type : string ;
 public cowMessages : [MESSAGES] ;
 public publicChats = [] ;
 public cowChats = [];
 public loading : boolean = true;
  constructor( public _authService : AuthService,
               public _coreService : CoreService
               ) { }

  ngOnInit() {
  }
  ngAfterViewInit(){
     this.selfId = localStorage.getItem('id')
    this._authService.isAuthenticated.subscribe((isAuth)=> {
      this.isAuthenticated = isAuth;
    })
    this._coreService.isAuthenticated.subscribe(isAuth =>{
      this.isAuthenticated = isAuth
    })
this._coreService.type.subscribe(val =>{
  this.type = val;
})

    this._coreService.isSubscribed.subscribe(val =>{
      this.isSubscribed = val
    })
  }
  public  toggleMessenger(){
    this.isOpen = !this.isOpen
      if(this.isOpen){
          this._coreService.loadMessages().subscribe(val =>{
            this.cowMessages = val.res.messages
          })
      }
      this.cowMessages.filter(val=>{

        if(val.from == this.selfId){
          this.cowChats.push(val)
        }
      })

      this.cowMessages.map(item =>{
this.filterMessage(item)
      })
  }

  public filterMessage(m: any) {

    this.publicChats.push({
      name: m.from,
      profileUrl: "http://13.233.157.142:4002/uploads/image_628511b61cd8cd1f9c9ffbaa.jpg"
    })


    // this.publicChats.filter(obj => !uniq[obj.name] && (uniq[obj.name] = true));
    this.publicChats = this.publicChats.filter((value, index, self) =>
        index === self.findIndex((t) => (
          t.name === value.name && t.name === value.name
        ))
    )
    this.loading = false
  }
  public handleChange(e){
      this.message = e.target.value
  }
  public handleSubmit() {
      if (this.message.length > 0) {
          this._coreService.sendMessage(this.message)
        const currentMessage = {
          message: this.message,
          to: '',
          timeStamp: Date.now().toString()
        }
        this.cowChats.push(currentMessage)
        this.message = ''
      }
  }
}
interface MESSAGES {
  _id ?: string,
  from ?: string,
  to ?: string,
  message: string,
  timeStamp : string
}
