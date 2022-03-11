import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GuestResolverService} from "../guest/guest-resolver.service";
import {DesktopOnlineCheckDetailsComponent} from "./desktop-online-check-details/desktop-online-check-details.component";
import {AskForPasswordComponent} from "../password/ask-for-password/ask-for-password.component";

import { OnlineCheckDetailsComponent } from './online-check-details.component';

const routes: Routes = [
  {
    path: '',
    resolve: { propertyAndBooking: GuestResolverService },
    children: [
      // {
      //   path: ':bookingId',
      //   component: MobileOnlineCheckDetailsComponent
      // },

      {
        path: ':bookingId',
        component: OnlineCheckDetailsComponent
      },
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnlinecheckRoutingModule { }
