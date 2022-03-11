import { Component, OnInit } from '@angular/core';
import {GuestRecommendationsReviewsComponent} from '../guest-recommendations-reviews.component';
import {GuestService} from '../../../../../core/services/guest.service';
import {UtilsService} from '../../../../../core/services/utils.service';

@Component({
  selector: 'app-guest-recommendations-reviews-mobile',
  templateUrl: './guest-recommendations-reviews-mobile.component.html',
  styleUrls: ['./guest-recommendations-reviews-mobile.component.scss']
})
export class GuestRecommendationsReviewsMobileComponent extends GuestRecommendationsReviewsComponent{

  constructor(
    public guestService: GuestService,
    public utils: UtilsService
  ) {
    super(guestService, utils);
  }

}
