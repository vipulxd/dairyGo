import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes =
  [
    {
      path : '',
      loadChildren:() => import('./preview/preview.module').then(m=> m.PreviewModule)
    },
    {
      path:'auth',
      loadChildren: ()=> import('./authentication/authentication.module').then(m => m.AuthenticationModule)
    },
    {
      path : 'setup',
      loadChildren: ()=> import('./setup/setup.module').then(m => m.SetupModule)
    },
    {
      path : 'cow',
      loadChildren: () => import("./cow/cow.module").then(m => m.CowModule)
    },
    {
      path : 'calf',
      loadChildren: () => import('./calf/calf.module').then(m => m.CalfModule)
    },

  ]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
