import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CowRoutingModule } from './cow-routing.module';
import { CowComponent } from './cow.component';
import { CalfsComponent } from './calfs/calfs.component';


@NgModule({
  declarations: [CowComponent, CalfsComponent],
  exports: [
    CowComponent
  ],
  imports: [
    CommonModule,
    CowRoutingModule
  ]
})
export class CowModule { }
