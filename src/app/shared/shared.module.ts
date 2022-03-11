import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonComponent} from './components/button/button.component';
import {MatBadgeModule, MatButtonModule, MatIconModule} from '@angular/material';
import {SharedSnackbarComponent} from './components/shared-snackbar/shared-snackbar.component';
import {TranslateModule} from '@ngx-translate/core';
import {GuestGalleryDetailComponent} from './components/guest-gallery-detail/guest-gallery-detail.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {SharedDirectivesModule} from '../directives/shared-directives.module';
import {AmenitiesCounterComponent} from './components/amenities-counter/amenities-counter.component';
import {TooltipComponent} from './components/tooltip/tooltip.component';
import {ClipboardModule} from 'ngx-clipboard';
import {NgxGoogleAnalyticsModule} from 'ngx-google-analytics';
import { AudioPlayComponent } from './components/audio-play/audio-play.component';
import {VbcaFooterComponent} from './components/footers/vbca-footer/vbca-footer.component';
import { CotoonFooterComponent } from './components/footers/cotoon-footer/cotoon-footer.component';
import {TabsMenuComponent} from './components/tabs-menu/tabs-menu.component';
import {ExternalVideoBoxComponent} from "./components/external-video-box/external-video-box.component";
import {QrCodeComponent} from "./components/qr-code/qr-code.component";
import {SharedUploadComponent} from './components/shared-upload/shared-upload.component';
import {LoaderComponent} from "./components/loader/loader.component";
import {LottieModule} from "ngx-lottie";
import { RentatranquilleFooterComponent } from './components/footers/rentatranquille/rentatranquille-footer.component';
import { GuestAdomFooterComponent } from './components/footers/guest-adom/guest-adom-footer.component';
import { KeylodgeFooterComponent } from './components/footers/keylodge/keylodge-footer.component';


@NgModule({
  declarations: [ButtonComponent, SharedSnackbarComponent, GuestGalleryDetailComponent,
  AmenitiesCounterComponent,
    SharedUploadComponent,
  TooltipComponent, VbcaFooterComponent,
  AudioPlayComponent,
  CotoonFooterComponent,
    ExternalVideoBoxComponent,
    QrCodeComponent,
    LoaderComponent,
    TabsMenuComponent,
    RentatranquilleFooterComponent,
    GuestAdomFooterComponent,
    KeylodgeFooterComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    TranslateModule,
    RouterModule,
    SharedDirectivesModule,
    ClipboardModule,
    NgxGoogleAnalyticsModule,
    LottieModule
  ],
    exports: [
        CommonModule,
        TranslateModule,
        MatButtonModule,
        MatBadgeModule,
        ButtonComponent,
        SharedSnackbarComponent,
        GuestGalleryDetailComponent,
      SharedUploadComponent,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        SharedDirectivesModule,
        AmenitiesCounterComponent,
        TooltipComponent,
        ClipboardModule,
        NgxGoogleAnalyticsModule,
        AudioPlayComponent,
        VbcaFooterComponent,
        CotoonFooterComponent,
      ExternalVideoBoxComponent,
      QrCodeComponent,
      TabsMenuComponent,
      LoaderComponent,
      RentatranquilleFooterComponent,
      GuestAdomFooterComponent,
      KeylodgeFooterComponent

    ],
  entryComponents: [
    GuestGalleryDetailComponent
  ]
})
export class SharedModule { }
