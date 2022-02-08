import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreviewRoutingModule } from './preview-routing.module';
import { IntroductionComponent } from './introduction/introduction.component';


@NgModule({
  declarations: [IntroductionComponent],
  imports: [
    CommonModule,
    PreviewRoutingModule
  ]
})
export class PreviewModule { }
