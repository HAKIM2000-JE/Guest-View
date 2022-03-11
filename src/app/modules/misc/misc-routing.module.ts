import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GuestLostComponent} from './guest-lost/guest-lost.component';


const routes: Routes = [
  {
    path: 'lost',
    component: GuestLostComponent,
  },
  {
    path: '',
    component: GuestLostComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MiscRoutingModule { }
