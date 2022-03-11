import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GuestLandingPageComponent} from './guest-landing-page/guest-landing-page.component';
import {GuestHostServicesComponent} from './guest-host-services/guest-host-services.component';
import {GuestPlatformServicesComponent} from './guest-platform-services/guest-platform-services.component';
import {GuestBookingDetailsComponent} from './guest-booking-details/guest-booking-details.component';
import {GuestUsefulnumberComponent} from './guest-usefulnumber/guest-usefulnumber.component';
import {GuestGuidesListComponent} from "./guest-guides-list/guest-guides-list.component";
import {GuestGuidesDetailDesktopComponent} from "./guest-guides-detail-desktop/guest-guides-detail-desktop.component";
import {GuestGuidePhotoDetailComponent} from "./guest-guide-photo-detail/guest-guide-photo-detail.component";
import {GuestUsefulnumberFullListDesktopComponent} from "./guest-usefulnumber-full-list-desktop/guest-usefulnumber-full-list-desktop.component";
import { RecommendationsCreateComponent } from './guest-recommendations/recommendations-create/recommendations-create.component';
import {GuestPropertyGalleryPhotoComponent} from "./guest-booking-details/mobile-guest-booking-details/guest-property-gallery-photo/guest-property-gallery-photo.component";
import {GuestReviewComponent} from "./guest-review/guest-review.component";
import {GuestPropertyGalleryComponent} from "./guest-property-gallery/guest-property-gallery.component";
import {GuestReviewTeamamteComponent} from "./guest-review/guest-review-teamamte/guest-review-teamamte.component";
import { GuestResolverService } from "./guest-resolver.service";
import {GuestRecommendationsViewComponent} from './guest-recommendations/guest-recommendations-view/guest-recommendations-view.component';
import {GuestBookingSetupComponent} from './guest-booking-setup/guest-booking-setup.component';
import {GuestInventoryComponent} from './guest-inventory/guest-inventory.component';
import {GuestMessagingComponent} from './guest-messaging/guest-messaging.component';
import {UpsaleSelectorComponent} from "./upsale/upsale-selector/upsale-selector.component";
import {UpsaleBasketComponent} from "./upsale/upsale-basket/upsale-basket.component";
import {AskForPasswordComponent} from "../password/ask-for-password/ask-for-password.component";


const routes: Routes = [
  {
  path: '',
  //component: GuestLandingPageComponent,
  resolve: { propertyAndBooking: GuestResolverService },
  children: [
    {
      path: ':bookingId',
      component: GuestLandingPageComponent
    },
    {
      path: ':bookingId/details',
      component: GuestLandingPageComponent,
    },
    {
      path: ':bookingId/recommendations',
      component: GuestLandingPageComponent,
    },
    {
      path: ':bookingId/guides',
      component: GuestLandingPageComponent,
    },
    {
      path: ':bookingId/guides/:guideId',
      component: GuestLandingPageComponent,
    },
    {
      path: ':bookingId/services',
      component: GuestLandingPageComponent,
    },
    {
      path: ':bookingId/hygienes',
      component: GuestLandingPageComponent,
    },
    {
      path: ':bookingId/usefulnumber',
      component: GuestLandingPageComponent,
    },
    {
      path: ':bookingId/gallery-photo-mobile',
      component: GuestPropertyGalleryPhotoComponent,
    },
    {
      path: ':bookingId/property-gallery',
      component: GuestPropertyGalleryComponent,
    },
    {
      path: ':bookingId/host-services',
      component: GuestHostServicesComponent,
    },
    {
      path: ':bookingId/guru-services',
      component: GuestPlatformServicesComponent,
    },
    {
      path: ':bookingId/recommendations',
      component: GuestRecommendationsViewComponent,
    },
    {
      path: ':bookingId/recommendations/create',
      component: RecommendationsCreateComponent,
    },
    {
      path: ':bookingId/useful-number',
      component: GuestUsefulnumberFullListDesktopComponent,
      /*component: GuestUsefulnumberComponent,*/
    },
    {
      path: ':bookingId/useful-number-full-list',
      component: GuestUsefulnumberFullListDesktopComponent,
    },
    {
     path: ':bookingId/guide-full-detail',
     component: GuestGuidesDetailDesktopComponent,
    },
    {
      path: ':bookingId/guide-detail-photo',
      component: GuestGuidePhotoDetailComponent,
    },
    {
      path: ':bookingId/review',
      component: GuestReviewComponent,
    },
    {
      path: ':bookingId/review-teammate',
      component: GuestReviewTeamamteComponent,
    },
    {
      path: ':bookingId/booking-setup',
      component: GuestBookingSetupComponent,
    },
    {
      path: ':bookingId/inventory',
      component: GuestInventoryComponent,
    },
    {
      path: ':bookingId/messaging',
      component: GuestMessagingComponent,
    },
    {
      path: ':bookingId/upsaleselector',
      component: UpsaleSelectorComponent
    },
    {
      path: ':bookingId/basket',
      component: UpsaleBasketComponent
    }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuestRoutingModule { }
