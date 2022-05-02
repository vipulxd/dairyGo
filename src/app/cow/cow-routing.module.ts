import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CowComponent } from './cow.component';
import {MapComponent} from "./map/map.component";

const routes: Routes = [{ path: '', component: CowComponent},
  {path:'subscribers', component:MapComponent} ,
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CowRoutingModule { }
