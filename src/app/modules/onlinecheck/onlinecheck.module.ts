import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OnlinecheckRoutingModule } from './onlinecheck-routing.module';
import { DesktopOnlineCheckDetailsComponent } from './desktop-online-check-details/desktop-online-check-details.component';
import { OnlineCheckWaitingComponent } from './online-check-waiting/online-check-waiting.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {TranslateModule} from "@ngx-translate/core";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {SharedModule} from "../../shared/shared.module";
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatDialogModule} from "@angular/material/dialog";
import { MatStepperModule } from '@angular/material';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { DeletePhotoComponent } from '../guest/guest-inventory/delete-photo/delete-photo.component';
import { Yaago2PoweredByFooterComponent } from '../guest/yaago2-poweredby-footer/yaago2-powered-by-footer.component';
import { MomentPipe } from 'src/app/pipes/moment.pipe';
import { SharedPipesModule } from 'src/app/pipes/shared-pipes.module';
import { GuestModule } from '../guest/guest.module';
import { OnlineCheckDetailsComponent } from './online-check-details.component';
import { MobileOnlineCheckDetailsComponent } from './mobile-online-check-details/mobile-online-check-details.component';
import { MobileOnlineCheckWaitingComponent } from './mobile-online-check-waiting/mobile-online-check-waiting.component';



@NgModule({
  declarations: [ OnlineCheckWaitingComponent, DesktopOnlineCheckDetailsComponent, MobileOnlineCheckDetailsComponent, OnlineCheckDetailsComponent, MobileOnlineCheckWaitingComponent ],
  imports: [
    CommonModule,
    OnlinecheckRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    TranslateModule,
    FormsModule,
    SharedModule,
    PerfectScrollbarModule,
    MatProgressSpinnerModule,
    MatProgressSpinnerModule,
    MatStepperModule,
    NgxDocViewerModule,
    SharedPipesModule,
    GuestModule

  ],
  // entryComponents:[
  //   DeletePhotoComponent
  // ]
})
export class OnlinecheckModule { }
