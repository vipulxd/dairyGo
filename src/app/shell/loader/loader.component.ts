import { Component, OnInit } from '@angular/core';
import {CoreService} from "../../shared/core.service";
import {AuthService} from "../../shared/auth/auth.service";

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
public isLoading : boolean;
  constructor(private _authService : AuthService  ) { }

  ngOnInit() {
    this._authService.loading.subscribe(val =>{
      console.log(val)
      this.isLoading = val;
    })
  }
}
