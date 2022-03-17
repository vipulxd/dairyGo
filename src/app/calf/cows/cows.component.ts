import {Component, Input, OnInit} from '@angular/core';
import {CoreService} from "../../shared/core.service";

@Component({
  selector: 'app-cows',
  templateUrl: './cows.component.html',
  styleUrls: ['./cows.component.scss']
})
export class CowsComponent implements OnInit {
@Input() pincode : String
  public data;
public amount
  constructor(public _coreService : CoreService) { }

  ngOnInit() {
    this._coreService.getCows(this.pincode).subscribe( cow =>{
      this.amount = cow.res.length;
      this.data = cow
    },err=>{
        console.log(err)
      }
      )
  }
  public subscribeToCow(id:string){
    console.log(id)
    this._coreService.subscribeToCow(id)
  }

}
