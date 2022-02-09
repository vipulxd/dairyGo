import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShellRoutingModule } from './shell-routing.module';
import { DashbaordComponent } from './dashbaord/dashbaord.component';


@NgModule({
  declarations: [DashbaordComponent],
  imports: [
    CommonModule,
    ShellRoutingModule
  ]
})
export class ShellModule { }
