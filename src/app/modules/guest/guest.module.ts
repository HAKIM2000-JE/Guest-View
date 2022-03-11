import { NgModule } from '@angular/core';
import {
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatSliderModule
} from '@angular/material';
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxGoogleAnalyticsModule } from "ngx-google-analytics";
import { NgxMasonryModule } from 'ngx-masonry';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SharedPipesModule } from '../../pipes/shared-pipes.module';
import { SharedModule } from '../../shared/shared.module';
import { DesktopGuestBookingDetailsComponent } from './guest-booking-details/desktop-guest-booking-details/desktop-guest-booking-details.component';
import { GuestBookingDetailsComponent } from './guest-booking-details/guest-booking-details.component';
import { GuestPropertyGalleryPhotoComponent } from './guest-booking-details/mobile-guest-booking-details/guest-property-gallery-photo/guest-property-gallery-photo.component';
import { MobileGuestBookingDetailsComponent } from './guest-booking-details/mobile-guest-booking-details/mobile-guest-booking-details.component';
import { GuestBookingSetupComponent } from './guest-booking-setup/guest-booking-setup.component';
import { GuestFooterPageComponent } from './guest-footer-page/guest-footer-page.component';
import { GuestGalleryDetailMobileComponent } from './guest-gallery-detail-mobile/guest-gallery-detail-mobile.component';
import { GuestGuideDetailComponent } from './guest-guide-detail/guest-guide-detail.component';
import { GuestGuidePhotoDetailComponent } from './guest-guide-photo-detail/guest-guide-photo-detail.component';
import { GuestGuidesDetailDesktopComponent } from './guest-guides-detail-desktop/guest-guides-detail-desktop.component';
import { ImagesCarouselComponent } from './guest-guides-detail-desktop/images-carousel/images-carousel.component';
import { GuestGuidesListComponent } from './guest-guides-list/guest-guides-list.component';
import { GuestHostServicesComponent } from './guest-host-services/guest-host-services.component';
import { GuestHygieneDesktopComponent } from './guest-hygiene/desktop/guest-hygiene-desktop.component';
import { GuestHygieneComponent } from './guest-hygiene/guest-hygiene.component';
import { GuestHygieneMobileComponent } from './guest-hygiene/mobile/guest-hygiene-mobile.component';
import { Yaagov2HygieneComponent } from './guest-hygiene/yaagov2-hygiene/yaagov2-hygiene.component';
import { GuestLandingPageComponent } from './guest-landing-page/guest-landing-page.component';
import { GuestLoginComponent } from './guest-login/guest-login.component';
import { GuestMenuDesktopComponent } from './guest-menu-desktop/guest-menu-desktop.component';
import { GuestMenuMobileComponent } from './guest-menu-mobile/guest-menu-mobile.component';
import { GuestPlatformServicesDesktopComponent } from './guest-platform-services/desktop/guest-platform-services-desktop.component';
import { GuestPlatformServicesComponent } from './guest-platform-services/guest-platform-services.component';
import { GuestPlatformServicesMobileComponent } from './guest-platform-services/mobile/guest-platform-services-mobile.component';
import { Yaagov2ServicesForGuestsComponent } from './guest-platform-services/yaagov2-services-for-guests/yaagov2-services-for-guests.component';
import { GuestPropertyGalleryComponent } from './guest-property-gallery/guest-property-gallery.component';
import { GuestPropertyGuidesDesktopComponent } from './guest-property-guides/desktop/guest-property-guides-desktop.component';
import { GuestPropertyGuidesComponent } from './guest-property-guides/guest-property-guides.component';
import { GuestPropertyGuidesMobileComponent } from './guest-property-guides/mobile/guest-property-guides-mobile.component';
import { GuestRecommendationV2MiniCardComponent } from './guest-recommendations/guest-recommendation-v2-mini-card/guest-recommendation-v2-mini-card.component';
import { GuestRecommendationsCardDesktopComponent } from './guest-recommendations/guest-recommendations-card/guest-recommendations-card-desktop/guest-recommendations-card-desktop.component';
import { GuestRecommendationsCardMobileComponent } from './guest-recommendations/guest-recommendations-card/guest-recommendations-card-mobile/guest-recommendations-card-mobile.component';
import { GuestRecommendationsCardComponent } from './guest-recommendations/guest-recommendations-card/guest-recommendations-card.component';
import { GuestRecommendationsMapDesktopComponent } from './guest-recommendations/guest-recommendations-map/guest-recommendations-map-desktop/guest-recommendations-map-desktop.component';
import { GuestRecommendationsMapMobileComponent } from './guest-recommendations/guest-recommendations-map/guest-recommendations-map-mobile/guest-recommendations-map-mobile.component';
import { GuestRecommendationsMapComponent } from './guest-recommendations/guest-recommendations-map/guest-recommendations-map.component';
import { GuestRecommendationsReviewsDesktopComponent } from './guest-recommendations/guest-recommendations-reviews/guest-recommendations-reviews-desktop/guest-recommendations-reviews-desktop.component';
import { GuestRecommendationsReviewsMobileComponent } from './guest-recommendations/guest-recommendations-reviews/guest-recommendations-reviews-mobile/guest-recommendations-reviews-mobile.component';
import { GuestRecommendationsReviewsComponent } from './guest-recommendations/guest-recommendations-reviews/guest-recommendations-reviews.component';
import { GuestRecommendationsViewDesktopComponent } from './guest-recommendations/guest-recommendations-view/guest-recommendations-view-desktop/guest-recommendations-view-desktop.component';
import { GuestRecommendationsViewMobileComponent } from './guest-recommendations/guest-recommendations-view/guest-recommendations-view-mobile/guest-recommendations-view-mobile.component';
import { GuestRecommendationsViewComponent } from './guest-recommendations/guest-recommendations-view/guest-recommendations-view.component';
import { GuestRecommendationsComponent } from './guest-recommendations/guest-recommendations.component';
import { RecommendationsCreateComponent } from './guest-recommendations/recommendations-create/recommendations-create.component';
import { GuestReviewTeamamteComponent } from './guest-review/guest-review-teamamte/guest-review-teamamte.component';
import { GuestReviewComponent } from './guest-review/guest-review.component';
import { GuestRoutingModule } from './guest-routing.module';
import { GuestToppageDesktopComponent } from './guest-toppage/desktop/guest-toppage-desktop.component';
import { GuestToppageComponent } from './guest-toppage/guest-toppage.component';
import { GuestToppageMobileComponent } from './guest-toppage/Mobile/guest-toppage-mobile.component';
import { GuestUsefulnumberFullListDesktopComponent } from './guest-usefulnumber-full-list-desktop/guest-usefulnumber-full-list-desktop.component';
import { CardNumberDesktopComponent } from './guest-usefulnumber/card-number-desktop/card-number-desktop.component';
import { CardNumberMobileComponent } from './guest-usefulnumber/card-number-mobile/card-number-mobile.component';
import { DesktopGuestUsefulnumberComponent } from './guest-usefulnumber/desktop-guest-usefulnumber/desktop-guest-usefulnumber.component';
import { GuestUsefulnumberComponent } from './guest-usefulnumber/guest-usefulnumber.component';
import { MobileGuestUsefulnumberComponent } from './guest-usefulnumber/mobile-guest-usefulnumber/mobile-guest-usefulnumber.component';
import { SliderComponent } from './slider/slider.component';
import { StarRatingComponent } from './star-raiting/star-rating.component';
import { Yaago2YaagoFooterComponent } from './yaago2-yaago-footer/yaago2-yaago-footer.component';
import {MatRippleModule} from "@angular/material/core";
import {GuestGuideDetailsComponent} from "./guest-guides/guest-guide-details/guest-guide-details.component";
import { GuestInventoryComponent } from './guest-inventory/guest-inventory.component';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {DeletePhotoComponent} from './guest-inventory/delete-photo/delete-photo.component';
import { GuestMessagingComponent } from './guest-messaging/guest-messaging.component';
import { FooterBookletReviewsComponent } from './footer-booklet-reviews/footer-booklet-reviews.component';
import { UpsaleCategoryListComponent } from './upsale/upsale-category-list/upsale-category-list.component';
import { UpsaleSelectorComponent } from './upsale/upsale-selector/upsale-selector.component';
import { UpsaleBasketComponent } from './upsale/upsale-basket/upsale-basket.component';
import {MatRadioModule} from "@angular/material/radio";
import { GuestArrivedLeftComponent } from './guest-arrived-left/guest-arrived-left.component';
import { MobileGuestArrivedLeftComponent } from './guest-arrived-left/mobile-guest-arrived_left/mobile-guest-arrived-left.component';
import { DesktopGuestArrivedLeftComponent } from './guest-arrived-left/desktop-guest-arrived_left/desktop-guest-arrived-left.component';
import {Yaago2PoweredByFooterComponent} from "./yaago2-poweredby-footer/yaago2-powered-by-footer.component";

@NgModule({
  declarations: [
    GuestLoginComponent,
    GuestBookingDetailsComponent,
    GuestLandingPageComponent,
    GuestHostServicesComponent,
    GuestPlatformServicesComponent,
    MobileGuestBookingDetailsComponent,
    DesktopGuestBookingDetailsComponent,
    MobileGuestArrivedLeftComponent,
    DesktopGuestArrivedLeftComponent,
    GuestPropertyGuidesComponent,
    GuestUsefulnumberComponent,
    GuestHygieneComponent,
    GuestToppageComponent,
    GuestFooterPageComponent,
    MobileGuestUsefulnumberComponent,
    DesktopGuestUsefulnumberComponent,
    GuestToppageDesktopComponent,
    GuestToppageMobileComponent,
    GuestMenuDesktopComponent,
    GuestPropertyGuidesDesktopComponent,
    GuestPropertyGuidesMobileComponent,
    GuestPlatformServicesMobileComponent,
    GuestPlatformServicesDesktopComponent,
    GuestHygieneDesktopComponent,
    GuestHygieneMobileComponent,
    GuestGuidesDetailDesktopComponent,
    ImagesCarouselComponent,
    GuestGuidePhotoDetailComponent,
    GuestUsefulnumberFullListDesktopComponent,
    RecommendationsCreateComponent,
    GuestGalleryDetailMobileComponent,
    GuestPropertyGalleryPhotoComponent,
    GuestReviewComponent,
    GuestPropertyGalleryComponent,
    GuestReviewTeamamteComponent,
    GuestRecommendationsMapComponent,
    GuestRecommendationsMapDesktopComponent,
    GuestRecommendationsMapMobileComponent,
    GuestRecommendationsCardComponent,
    GuestRecommendationsCardDesktopComponent,
    GuestRecommendationsCardMobileComponent,
    GuestRecommendationsReviewsComponent,
    GuestRecommendationsReviewsDesktopComponent,
    GuestRecommendationsReviewsMobileComponent,
    SliderComponent,
    GuestRecommendationsViewComponent,
    GuestRecommendationsViewDesktopComponent,
    GuestRecommendationsViewMobileComponent,
    GuestMenuMobileComponent,
    GuestBookingSetupComponent,
    GuestGuideDetailComponent,
    GuestGuidesListComponent,
    GuestRecommendationsComponent,
    CardNumberDesktopComponent,
    CardNumberMobileComponent,
    StarRatingComponent,
    Yaagov2HygieneComponent,
    Yaagov2ServicesForGuestsComponent,
    Yaago2YaagoFooterComponent,
    GuestGuideDetailsComponent,
    GuestRecommendationV2MiniCardComponent,
    GuestInventoryComponent,
    DeletePhotoComponent,
    GuestMessagingComponent,
    FooterBookletReviewsComponent,
    UpsaleCategoryListComponent,
    UpsaleSelectorComponent,
    UpsaleBasketComponent,
    Yaago2PoweredByFooterComponent,
    GuestArrivedLeftComponent
  ],
    imports: [
        SharedModule,
        GuestRoutingModule,
        SharedPipesModule,
        CarouselModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatDialogModule,
        MatSliderModule,
        MatSelectModule,
        MatMenuModule,
        MatToolbarModule,
        MatSidenavModule,
        MatExpansionModule,
        NgxMaterialTimepickerModule,
        NgxMasonryModule,
        MatCheckboxModule,
        NgxGoogleAnalyticsModule,
        MatRippleModule,
        PerfectScrollbarModule,
        MatProgressSpinnerModule,
        MatRadioModule
    ],
  entryComponents: [DeletePhotoComponent]

})
export class GuestModule {
}
