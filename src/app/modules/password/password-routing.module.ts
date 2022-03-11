import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AskForPasswordComponent} from "./ask-for-password/ask-for-password.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: ':bookingId/ask4pwd',
        component: AskForPasswordComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PasswordRoutingModule { }
