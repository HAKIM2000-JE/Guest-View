import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BookingRating, PropertyRating} from '../../../models/guestview/BookingRating';
import {GuestService} from "../../../core/services/guest.service";
import {ApiService} from "../../../core/http/api.service";
import {GuestServiceIntern} from "../guest.service";
import {InternalPropertyService} from "../../../core/services/internal.property.service";
import {PropertyForGuest} from "../../../models/guestview/PropertyForGuest";
import {SnackbarMessage} from "../../../shared/components/shared-snackbar/models/snackbar-message";
import {SharedSnackbarService} from "../../../shared/components/shared-snackbar/services/shared-snackbar.service";
import {TranslateService} from "@ngx-translate/core";
import {UtilsService} from "../../../core/services/utils.service";
import {BookingForGuest} from "../../../models/guestview/BookingForGuest";
import { StarRatingComponent } from '../star-raiting/star-rating.component';

@Component({
  selector: 'app-guest-review',
  templateUrl: './guest-review.component.html',
  styleUrls: ['./guest-review.component.scss']
})
export class GuestReviewComponent implements OnInit {
  urlLang: string;
  @ViewChild('drawer',{static: false}) drawer;
  targetsElement = [null];
  property: PropertyForGuest;
  booking: BookingForGuest;
  bookingId;
  bookingRating: BookingRating = new BookingRating();
  propertyRating: PropertyRating = new PropertyRating();
  screenWidth: number;
  constructor(public route: ActivatedRoute,
              public guestServiceIntern: InternalPropertyService,
              public apiService: ApiService,
              public router: Router,
              public snackbar: SharedSnackbarService,
              public translate: TranslateService,
              public utilService: UtilsService,
              public internGuestService: GuestServiceIntern
              ) { this.getScreenWidth(); }



  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      if (params.get('bookingId')) {
        this.bookingId = params.get('bookingId');
      }
      this.urlLang = this.translate.currentLang;
    });
    this.bookingRating.ratingItems = [
      {type: 'cleanliness' , rating: 0},
      {type: 'communication' , rating: 0},
      {type: 'checkin' , rating: 0},
      {type: 'location' , rating: 0},
      {type: 'accuracy' , rating: 0},
      {type: 'value' , rating: 0}
      ];
    this.guestServiceIntern.getCurrentProperty().subscribe(property  => {
      console.log('PROPERTY', property);
      if (property) {
        this.property = property;
      }
    });

    this.internGuestService.getBookingForGuest().subscribe(booking => {
      console.log('BOOKING', booking);
      if (booking) {
        this.booking = booking;
        if (booking.propertyRating) {
          this.bookingRating = booking.propertyRating;
        }
      }
    });
  }

  saveReview() {

    if (!this.bookingRating.ratingComment) {
      this.snackbar.push(new SnackbarMessage(this.translate.instant('guest-message.note-error'), 'error'));
    } else {
      this.apiService.savePropertyRating(this.bookingId , this.bookingRating).subscribe(resp => {
          this.snackbar.push(new SnackbarMessage(this.translate.instant('guest-message.success'), 'info'));
          this.router.navigate(['guest', this.bookingId]);
        },
        error => {
          this.utilService.handleYaagoErrorCode(error);
        });
    }
  }

  validatePropertyRating() {

  }

  saveReviewLivretSeul() {
    if (!this.bookingRating.ratingComment) {
      this.snackbar.push(new SnackbarMessage(this.translate.instant('guest-message.note-error'), 'error'));
    } else {
      this.propertyRating.ratingItems = this.bookingRating.ratingItems;
      this.propertyRating.ratingComment = this.bookingRating.ratingComment;
      this.propertyRating.propertyId = this.property.id;

      this.apiService.savePropertyRatingLivretSeul(this.propertyRating).subscribe(resp => {
          this.snackbar.push(new SnackbarMessage(this.translate.instant('guest-message.success'), 'info'));
          this.router.navigate(['guest', this.property.id]);
        },
        error => {
          this.utilService.handleYaagoErrorCode(error);
        });
    }
  }

  teamateReview() {
    if (!this.bookingRating.ratingComment) {
      this.snackbar.push(new SnackbarMessage(this.translate.instant('guest-message.note-error'), 'error'));
    } else {
      this.apiService.saveTeammateRating(this.bookingId , this.bookingRating).subscribe(resp => {
          this.snackbar.push(new SnackbarMessage(this.translate.instant('guest-message.success'), 'info'));
          this.router.navigate(['guest', this.bookingId]);
        },
        error => {
          this.utilService.handleYaagoErrorCode(error);
          // this.snackbar.push(new SnackbarMessage(this.translate.instant('guest-message.error'), 'error'));

        });
    }
  }

  setData() {
    this.internGuestService.setBookingForGuest(this.booking);
    this.guestServiceIntern.setCurrentProperty(this.property);
  }
  isDesktopMode(): boolean {
    return this.utilService.isDesktop(this.screenWidth);
  }
  isDesktopForMenu(): boolean {
    return this.utilService.isDesktopForMenu(this.screenWidth);
  }

  @HostListener('window:resize', ['$event'])
  getScreenWidth(event?) {
    this.screenWidth = window.innerWidth;
  }

  scrollToElement($element, manuel): void {
    this.drawer.toggle();
    console.log('targetsElement', this.targetsElement);
    if ($element) {
      $element.nativeElement.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
    } else {
      let element = null;
      document.location.href = '/#/guest/' + this.bookingId;
      const elements: any = document.getElementsByTagName(manuel);
      setTimeout(() => {
        element = elements.item(0);
        console.log('element', element)
        element.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
      }, 20);
    }

  }
}
