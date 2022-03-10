import { Component, OnInit } from '@angular/core';
import {CoreService} from "../shared/core.service";
import {ImagePickerConf} from "ngp-image-picker";

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit {
public type = "PENDING"
  constructor(private _coreService : CoreService) { }

  public cow : boolean  =false;
  public  calf : boolean = true
  public name : string;
  public address : string;
  public pincode : number;
  public mobileNo : string;
  public cows : number;
  public buffalos: number;
  public goats : number ;
  public email : string;

  acceptedUserAggrement : boolean = false
  ngOnInit() {
    this._coreService.verifyProfile()
  }
  public toogleCalf(){
    this.cow = false;
    this.calf =  true;
  }
  public  toogleCow(){
    this.calf  =false
    this.cow =  true
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
    }
  }
  public saveCowData(){
    var data ;
    if(this.cow){
      data ={
        address:this.address,
        name:this.name,
        pincode:this.pincode,
        mobileNo:this.mobileNo,
        cows:this.cows,
        buffalos:this.buffalos,
        type:"COW"
      }
      this._coreService.updateProfile(data)
    }else {
      data ={
        address:this.address,
        name:this.name,
        pincode:this.pincode,
        mobileNo:this.mobileNo,
        email:this.email,
        type:"CALF"
      }
      this._coreService.updateProfile(data)
    }

  }

}
