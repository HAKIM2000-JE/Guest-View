import { Component, OnInit } from '@angular/core';
import {GuestReviewComponent} from "../guest-review.component";
import {ActivatedRoute, Router} from "@angular/router";
import {GuestService} from "../../../../core/services/guest.service";
import {InternalPropertyService} from "../../../../core/services/internal.property.service";
import {ApiService} from "../../../../core/http/api.service";
import {SharedSnackbarService} from "../../../../shared/components/shared-snackbar/services/shared-snackbar.service";
import {TranslateService} from "@ngx-translate/core";
import {UtilsService} from "../../../../core/services/utils.service";
import {GuestServiceIntern} from "../../guest.service";

@Component({
  selector: 'app-guest-review-teamamte',
  templateUrl: './guest-review-teamamte.component.html',
  styleUrls: ['../guest-review.component.scss', './guest-review-teamamte.component.scss']
})
export class GuestReviewTeamamteComponent extends GuestReviewComponent implements OnInit {

  constructor(public route: ActivatedRoute,
              public guestServiceIntern: InternalPropertyService,
              public apiService: ApiService,
              public router: Router,
              public snackbar: SharedSnackbarService,
              public translate: TranslateService,
              public utilService: UtilsService,
              public internGuestService: GuestServiceIntern
  ) {
    super(route, guestServiceIntern, apiService, router, snackbar, translate, utilService, internGuestService);
  }

  ngOnInit() {
    this.bookingRating.ratingItems = [
      {type: 'communication' , rating: 0},
      {type: 'checkin' , rating: 0},
      {type: 'checkout', rating: 0}
    ];
    console.log(this.bookingRating.ratingItems);
    this.route.paramMap.subscribe(data => {
      if (data.get('bookingId')) {
        this.bookingId = data.get('bookingId');
      }
    });
    this.urlLang = this.translate.currentLang;
    this.guestServiceIntern.getCurrentProperty().subscribe(property  => {
      if (property) {
        this.property = property;
      }
    });
    this.internGuestService.getBookingForGuest().subscribe(booking => {
      if (booking) {
        this.booking = booking;
        if (booking.teammateRating) {
          this.bookingRating = booking.teammateRating;
        }
      }
    });
  }

}
