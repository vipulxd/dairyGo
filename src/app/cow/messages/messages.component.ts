import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
public messeges  = [
  {id:1,name:"kumar",lastMessage:"Hello"},
  {id:2,name:"kamal",lastMessage:"Thank you"},
  {id:3,name:"david",lastMessage:"Order recieved"}, {id:4,name:"Lily",lastMessage:"no order tmw"}
  , {id:5,name:"naman",lastMessage:"where are you"},
  {id:6,name:"Georgi",lastMessage:"i can't find you"},

]
  constructor() { }

  ngOnInit() {
  }

  /** remove message */
public remover(id){

  var index = this.messeges.findIndex(function(o){
    return o.id === id;
})
if (index !== -1) this.messeges.splice(index, 1);
}
}
interface senderProperties {
  id: number,
  name: string,
  lastMessage : string,
}
