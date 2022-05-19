import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AuthService} from "../../shared/auth/auth.service";
import {CoreService} from "../../shared/core.service";

@Component({
    selector: 'app-conversations',
    templateUrl: './conversations.component.html',
    styleUrls: ['./conversations.component.scss']
})
export class ConversationsComponent implements OnInit, AfterViewInit {
    public isAuthenticated: Boolean = false
    public isOpen: Boolean = false;
    public isSubscribed: Boolean = true;
    public message: string = ''
    public selfId: string
    public type: string;
public chats : [MESSAGES];
    public publicChats = [];
    public cowChats = [];
    public selectedID : string = localStorage.getItem('id')
    public loading: boolean = true;
public isClicked : boolean = false;
    constructor(public _authService: AuthService,
                public _coreService: CoreService
    ) {
    }

    ngOnInit() {
    }


    ngAfterViewInit() {
        this.selfId = localStorage.getItem('id')
        this._authService.isAuthenticated.subscribe((isAuth) => {
            this.isAuthenticated = isAuth;
        })
        this._coreService.isAuthenticated.subscribe(isAuth => {
            this.isAuthenticated = isAuth
        })
        this._coreService.type.subscribe(val => {
            this.type = val;
        })
        if (this.type == 'COW') {
        this.getMessages()
    }
        this._coreService.isSubscribed.subscribe(val => {
            this.isSubscribed = val
        })
    }

 public back(){
        this.isClicked = false;
        
 }
    /** Message toggler **/
    public toggleMessenger() {
        this.getMessages()
        this.isOpen = !this.isOpen
        if(this.isClicked){
            this.isClicked = false;
        }
           
    }
    public getMessages(){
        this._coreService.loadMessages().subscribe(val => {
            this.chats = val.res.messages
            val.res.messages.map(item => {
                if (item.from == this.selfId) {
                    this.cowChats.push(item)
                }
                this.filterMessage(item)
            })
        },(error)=>{
            console.error(error)
        })
    }

    /** Filter message based upon current calf ID **/
    public filterMessage(m: any) {
        this.publicChats.push({
            name: m.from,
            profileUrl: "http://13.233.157.142:4002/uploads/image_628511b61cd8cd1f9c9ffbaa.jpg"
        })

        this.publicChats = this.publicChats.filter((value, index, self) =>
                index === self.findIndex((t) => (
                    t.name === value.name && t.name === value.name
                ))
        )
        this.loading = false
    }

    /** Detect changes in input **/
    public handleChange(e) {
        this.message = e.target.value
    }

public handleSelection(name: string){
        if(this.type == "COW") {
            this.selectedID = name;
        }else {
            this.selectedID = localStorage.getItem('id')
        }
        this.isClicked = !this.isClicked
}
    public handleSubmit() {
        if (this.message.length > 0) {
            this._coreService.sendMessage(this.message,this.selectedID)
            const currentMessage = {
                from:localStorage.getItem('id'),
                message: this.message,
                to: this.selectedID,
                timeStamp: Date.now().toString()
            }
            this.chats.push(currentMessage)
            this.message = ''
            this.getMessages()
        }
    }
}

interface MESSAGES {
    from: string,
    to: string,
    message: string,
    timeStamp: string
}
