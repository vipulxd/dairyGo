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
public profileImage ;
  acceptedUserAggrement : boolean = false
  ngOnInit() {
    this._coreService.verifyProfile()
    this.profileImage = '/assets/images/default-image.png';
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
    console.log(d)
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
      case 'profileImage' : this.profileImage = d.files[0];
      break;
    }
  }
  public saveCowData(){
    console.log(this.profileImage)
    var data ;
    if(this.cow){
      data ={
        address:this.address,
        name:this.name,
        pincode:this.pincode,
        mobileNo:this.mobileNo,
        cows:this.cows,
        buffalos:this.buffalos,
        profileImage : this.profileImage,
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
        type:"CALF",
        profileImage:this.profileImage
      }
      this._coreService.updateProfile(data)
    }

  }
  onFileChanged(event) {
    const files = event.target.files;
    if (files.length === 0)
      return;

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      // this.message = "Only images are supported.";
      return;
    }

    const reader = new FileReader();
    const imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.profileImage = reader.result;
    }
  }

}