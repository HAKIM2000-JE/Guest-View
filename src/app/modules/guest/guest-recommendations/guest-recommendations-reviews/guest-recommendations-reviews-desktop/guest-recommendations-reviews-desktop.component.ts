import { Component, OnInit } from '@angular/core';
import {GuestService} from '../../../../../core/services/guest.service';
import {UtilsService} from '../../../../../core/services/utils.service';
import {GuestRecommendationsReviewsComponent} from '../guest-recommendations-reviews.component';

@Component({
  selector: 'app-guest-recommendations-reviews-desktop',
  templateUrl: './guest-recommendations-reviews-desktop.component.html',
  styleUrls: ['./guest-recommendations-reviews-desktop.component.scss']
})
export class GuestRecommendationsReviewsDesktopComponent extends GuestRecommendationsReviewsComponent{

  constructor(
    public guestService: GuestService,
    public utils: UtilsService
  ) {
    super(guestService, utils);
  }

}
