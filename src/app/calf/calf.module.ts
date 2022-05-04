import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalfRoutingModule } from './calf-routing.module';
import { CalfComponent } from './calf.component';
import { CowsComponent } from './cows/cows.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import {MatBadgeModule} from "@angular/material/badge";
import {MatButtonModule} from "@angular/material/button";
import { MapComponent } from './map/map.component';
import {AgmCoreModule} from "@agm/core";
import {GlobalComponent} from "./global/global.component";


@NgModule({
  declarations: [CalfComponent, CowsComponent, SubscriptionComponent,GlobalComponent, MapComponent],
  imports: [
    MatBadgeModule,
    CommonModule,
    CalfRoutingModule,
    MatButtonModule,
    AgmCoreModule,
  ]
})
export class CalfModule { }
