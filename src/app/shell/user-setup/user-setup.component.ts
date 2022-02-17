import { Component, OnInit } from '@angular/core';
import {ImagePickerConf} from "ngp-image-picker";
import {CoreService} from "../../shared/core.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-user-setup',
  templateUrl: './user-setup.component.html',
  styleUrls: ['./user-setup.component.scss']
})
export class UserSetupComponent implements OnInit {
 public name : string;
 public address : string;
 public pincode : number;
 public mobileNo : string;
 public cows : number;
 public buffalos: number;
 public goats : number ;
  constructor(
    private _coreServices : CoreService
  ) { }
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
public onChange(d){
const name = d.name;
switch (name){
  case 'name': this.name = d.value;
  break;
  case 'address': this.address = d.value;
    break;
  case 'pincode': this.pincode = d.value;
    break;
  case 'mobileNo': this.mobileNo = d.value;
    break;
  case 'cows': this.cows = d.value;
    break;
  case 'buffalos': this.buffalos = d.value;
    break;
  case 'goats': this.goats = d.value;
    break;
}
}
public saveData(){
   const data ={
     address:this.address,
     name:this.name,
     pincode:this.pincode,
     mobileNo:this.mobileNo,
     cows:this.cows,
     buffalos:this.buffalos,
     goats:this.goats,
   }
   this._coreServices.updateProfile(data)
}
}
