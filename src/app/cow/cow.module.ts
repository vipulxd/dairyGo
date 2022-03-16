import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CowRoutingModule } from './cow-routing.module';
import { CowComponent } from './cow.component';
import { CalfsComponent } from './calfs/calfs.component';
import { MessagesComponent } from './messages/messages.component';


@NgModule({
  declarations: [CowComponent, CalfsComponent, MessagesComponent],
  exports: [
    CowComponent
  ],
  imports: [
    CommonModule,
    CowRoutingModule
  ]
})
export class CowModule { }
