import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {CoreService} from "../../shared/core.service";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit , AfterViewInit {
    profile : any ;
    lat : number = 28.7041;
    lng: number = 77.1025;
    isMapReady : Boolean = false;
    public coordinates  = []
    constructor(private coreService$ : CoreService) { }
    public cowUrl = '/assets/images/cow-image.png'
    ngOnInit() {

    }
    ngAfterViewInit(){
        this.coreService$.getAllLocations('COW').subscribe(
            (val : any) =>{
              console.log(val)
              if(val.res && val.res.length > 0) {
                  this.coordinates = val.res
                  this.isMapReady = true
              }
            }
        )
        this.lat = Number(this.coreService$.selfLocation.split(",")[0])
        this.lng = Number(this.coreService$.selfLocation.split(",")[1])
    }
    public getLat(i: any) {
        let latitude = i.split(",")[0]
        return Number(latitude)
    }

    public getLang(i: any) {
        let longitude = i.split(",")[1]
        return Number(longitude)
    }
}
