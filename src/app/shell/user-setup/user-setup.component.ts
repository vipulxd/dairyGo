import { Component, OnInit } from '@angular/core';
import {ImagePickerConf} from "ngp-image-picker";

@Component({
  selector: 'app-user-setup',
  templateUrl: './user-setup.component.html',
  styleUrls: ['./user-setup.component.scss']
})
export class UserSetupComponent implements OnInit {

  constructor() { }
acceptedUserAggrement : boolean = false
  ngOnInit() {
  }
  public config1: ImagePickerConf = {
    borderRadius: '16px',
    language: 'en',
  };
  initialImage = 'https://havanatursa.com/assets/images/carousel/Hoteles.webp';
 public onCheck(){
   this.acceptedUserAggrement = !this.acceptedUserAggrement
 }

}
