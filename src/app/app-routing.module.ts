import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'misc',
    pathMatch: 'full'
  },
  {
    path: 'guest',
    loadChildren: () => import('./modules/guest/guest.module').then(mod => mod.GuestModule)
  },
  {
    path: 'onlinecheck',
    loadChildren: () => import('./modules/onlinecheck/onlinecheck.module').then(mod => mod.OnlinecheckModule)
  },

 
  {
    path: 'rental',
    loadChildren: () => import('./modules/guest/guest.module').then(mod => mod.GuestModule)
  },
  {
    path: 'misc',
    loadChildren: () => import('./modules/misc/misc.module').then(mod => mod.MiscModule)
  },
  {
    path: 'pwd',
    loadChildren: () => import('./modules/password/password.module').then(mod => mod.PasswordModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true, enableTracing: false, anchorScrolling: "enabled"})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
