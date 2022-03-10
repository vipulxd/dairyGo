import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CowComponent } from './cow.component';

const routes: Routes = [{ path: '', component: CowComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CowRoutingModule { }
