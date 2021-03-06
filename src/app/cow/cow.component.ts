import { Component, OnInit } from '@angular/core';
import {CoreService} from "../services/core.service";
import {AuthService} from "../services/auth/auth.service";

@Component({
  selector: 'app-cow',
  templateUrl: './cow.component.html',
  styleUrls: ['./cow.component.scss']
})
export class CowComponent implements OnInit {
public  type : String = "COW"
  public profile ;

  constructor(public _coreService : CoreService,
              public _authService : AuthService
  ) { }

  ngOnInit() {
    this._coreService.verifyProfile()
    this._coreService.data.subscribe(data =>{
      this.profile = data
    })
  }



}
