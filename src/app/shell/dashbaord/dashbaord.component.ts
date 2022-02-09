import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../shared/auth/auth.service";

@Component({
  selector: 'app-dashbaord',
  templateUrl: './dashbaord.component.html',
  styleUrls: ['./dashbaord.component.scss']
})
export class DashbaordComponent implements OnInit {

  constructor(private _authService : AuthService) { }

  ngOnInit() {
      this._authService.authorize();
  }

}
