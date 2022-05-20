import {AfterViewInit, Component, OnInit} from '@angular/core';
import {CoreService} from "../../shared/core.service";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
    lat : number = 28.7041;
    lng: number = 77.1025;
    public coordinates  = []
    isMapReady : Boolean = false;
    subArray : []
  constructor(public _coreService : CoreService) { }

  ngAfterViewInit(){
            this.loadSubscribers()
  }
  public loadSubscribers(){
      let data  = this._coreService.subscribersArray;
      data.map((item: any) =>{
          let id  = item.id
          this._coreService.getSubscribersInfo(id).subscribe((val)=>{
              this.coordinates.push(val.res.latlng)
          })
      })
      this.isMapReady =   true
  } 
  
    public getLat(i: any) {
        if (i) {
            let latitude = i.split(",")[0]
            return Number(latitude)
        }
    }

    public getLang(i: any) {
        if (i) {
            let longitude = i.split(",")[1]
            return Number(longitude)
        }
    }

}
