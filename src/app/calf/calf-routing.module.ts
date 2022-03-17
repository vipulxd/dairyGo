import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalfComponent } from './calf.component';

const routes: Routes = [{ path: '', component: CalfComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalfRoutingModule { }
