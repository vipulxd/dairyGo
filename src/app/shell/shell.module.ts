import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShellRoutingModule } from './shell-routing.module';

import { NgpImagePickerModule } from 'ngp-image-picker';
import { SubscribersComponent } from './dashbaord/subscribers/subscribers.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ShellRoutingModule,NgpImagePickerModule
  ]
})
export class ShellModule { }
