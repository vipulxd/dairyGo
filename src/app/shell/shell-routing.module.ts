import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashbaordComponent} from "./dashbaord/dashbaord.component";


const routes: Routes = [
    {path:'dashboard', component: DashbaordComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShellRoutingModule { }
