import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {CoreService} from "../../shared/core.service";

@Component({
  selector: 'app-cows',
  templateUrl: './cows.component.html',
  styleUrls: ['./cows.component.scss']
})
export class CowsComponent implements OnInit , OnChanges {
@Input() pincode : String
  public data;
public amount
  constructor(public _coreService : CoreService) { }

  ngOnInit() {

  }
  ngOnChanges(changes: SimpleChanges) {
      this._coreService.getCows(this.pincode).subscribe( cow =>{
              this.amount = cow.res.length;
              this.data = cow
          },err=>{
          }
      )
}

    public subscribeToCow(id:string){
    this._coreService.subscribeToCow(id)
  }

}
