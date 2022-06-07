import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {CoreService} from "../../../services/core.service";

@Component({
  selector: 'app-chat-view',
  templateUrl: './chat-view.component.html',
  styleUrls: ['./chat-view.component.scss']
})
export class ChatViewComponent implements OnInit , OnChanges , OnDestroy {
@Input('selectedID') public selectedID
    @Input('chats') public chats : [MESSAGE]
public filteredChats = []
public isProcessing : boolean = true
    public cowId = localStorage.getItem('id')
    public sub_id ;
  constructor(public _coreService : CoreService) { }

  ngOnInit() {
      this.sub_id  =  this._coreService.cow_id;
  }
 ngOnDestroy() {
      this.filteredChats = []
 }

    ngOnChanges(changes: SimpleChanges) {
        this.filteredChats = []

        if( changes.chats.previousValue) {
            if (changes.chats.previousValue.length >= changes.chats.currentValue.length) {
                changes.chats.previousValue.map(item => {
                    if ( item.from == this.selectedID || item.from  == this.cowId || item.from == this.sub_id) {
                        this.filteredChats.push(item)
                    }
                })
                this.isProcessing = false;
            }
        }else {
                changes.chats.currentValue.map(item => {
                    if (item.from == this.selectedID || item.from == this.cowId || item.from == this.sub_id) {
                        this.filteredChats.push(item)
                    }
                })
                this.isProcessing = false;
            }


    }


}
interface MESSAGE {
    from : string,
    to: string,
    message: string
}
