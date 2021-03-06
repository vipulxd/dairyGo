import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CowRoutingModule } from './cow-routing.module';
import { CowComponent } from './cow.component';
import { CalfsComponent } from './calfs/calfs.component';
import { MessagesComponent } from './messages/messages.component';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatGridListModule} from "@angular/material/grid-list";
import { MapComponent } from './map/map.component';
import {AgmCoreModule} from "@agm/core";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";


@NgModule({
  declarations: [CowComponent, CalfsComponent, MessagesComponent, MapComponent],
    exports: [
        CowComponent,
    ],
    imports: [
        MatButtonModule,
        MatGridListModule,
        MatIconModule,
        CommonModule,
        CowRoutingModule,
        AgmCoreModule,
        MatProgressSpinnerModule
    ]
})
export class CowModule { }
