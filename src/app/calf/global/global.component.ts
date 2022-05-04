import {AfterViewInit, Component, OnInit} from '@angular/core';
import {CoreService} from "../../shared/core.service";

@Component({
  selector: 'app-global',
  templateUrl: './global.component.html',
  styleUrls: ['./global.component.scss']
})
export class GlobalComponent implements OnInit , AfterViewInit {

    constructor(private _coreService: CoreService) {
    }

    public coordinates = [];

    ngOnInit() {
    }

    ngAfterViewInit() {
        this._coreService.getAllLocations("COW").subscribe((val) => {
            this.loadLocations(val)
        })
    }

    public loadLocations(data: any) {
        data.res.map((item) => {
            this.coordinates.push(item)
        })
    }
}
