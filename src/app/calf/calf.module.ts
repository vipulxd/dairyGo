import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalfRoutingModule } from './calf-routing.module';
import { CalfComponent } from './calf.component';
import { CowsComponent } from './cows/cows.component';
import { SubscriptionComponent } from './subscription/subscription.component';


@NgModule({
  declarations: [CalfComponent, CowsComponent, SubscriptionComponent],
  imports: [
    CommonModule,
    CalfRoutingModule
  ]
})
export class CalfModule { }
