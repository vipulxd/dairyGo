import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShellRoutingModule } from './shell-routing.module';

import { NgpImagePickerModule } from 'ngp-image-picker';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ShellRoutingModule,NgpImagePickerModule
  ]
})
export class ShellModule { }
