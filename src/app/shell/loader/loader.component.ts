import { Component, OnInit } from '@angular/core';
import {CoreService} from "../../shared/core.service";

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
public isLoading : boolean;
  constructor(private _coreService : CoreService) { }

  ngOnInit() {
    this._coreService.isLoading.subscribe(val =>{
      this.isLoading = val;
    })
  }
}
