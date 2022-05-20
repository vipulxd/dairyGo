import { Component, OnInit} from '@angular/core';
import {CoreService} from "./shared/core.service";
import {AuthService} from "./shared/auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'dairyGo';
  loading : Boolean = false
  isAuthenticated : Boolean = false;
  constructor(private _coreService : CoreService,
              private _authService : AuthService
              ) {
  }
  ngOnInit() {
    this._coreService.isLoading.subscribe(state => {
      this.loading = state;
    });
    // this._authService.loading.subscribe(state => {
    //   this.loading = state
    // })
    this._authService.isAuthenticated.subscribe( state =>{
      this.isAuthenticated = state
    })
    this._coreService.isAuthenticated.subscribe(s=> {
      this.isAuthenticated = s
    })
  }
}
