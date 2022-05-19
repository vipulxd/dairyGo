import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {CoreService} from "../../../shared/core.service";

@Component({
  selector: 'app-chat-view',
  templateUrl: './chat-view.component.html',
  styleUrls: ['./chat-view.component.scss']
})
export class ChatViewComponent implements OnInit , OnChanges {
@Input('selectedID') public selectedID
    @Input('chats') public chats : [MESSAGE]
public filteredChats = []
public isProcessing : boolean = true
    public cowId = localStorage.getItem('id')
  constructor() { }

  ngOnInit() {
     
  }

    ngOnChanges(changes: SimpleChanges) {
        this.filteredChats = []
        console.log(changes.chats)
        if (changes.chats.firstChange) {
            changes.chats.currentValue.map(item => {
                if (item.to == this.selectedID || item.from == this.selectedID) {
                    this.filteredChats.push(item)
                }
            })
            this.isProcessing = false;
        } else {
                changes.chats.previousValue.map(item => {
                    if (item.to == this.selectedID || item.from == this.selectedID) {
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