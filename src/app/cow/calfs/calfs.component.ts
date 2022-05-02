import { Component, OnInit } from '@angular/core';
import {CoreService} from "../../shared/core.service";

@Component({
  selector: 'app-calfs',
  templateUrl: './calfs.component.html',
  styleUrls: ['./calfs.component.scss']
})
export class CalfsComponent implements OnInit {
  public calfs;
  constructor(private _coreService : CoreService) { }

  ngOnInit() {
    this._coreService.getAllCalfs().subscribe(data=>{
      this.calfs  = data.res;
      console.log(data.res)
    })
  }

}
