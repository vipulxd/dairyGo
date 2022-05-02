import { Component, OnInit } from '@angular/core';
import {CoreService} from "../../shared/core.service";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
profile : any ;
lat : number;
lng: number;
isMapReady : Boolean = false;
  constructor(private coreService$ : CoreService) { }

  ngOnInit() {
    this.coreService$.data.subscribe(
      (val : any) =>{

        this.profile = val.res
       this.loadMap()
      }
    )
  }
public loadMap(){
    const coordinates = this.profile.latlng.split(",");
    this.lat = Number(coordinates[0]);
    this.lng = Number(coordinates[1])
 if(this.lat && this.lng) this.isMapReady = true
}
}
