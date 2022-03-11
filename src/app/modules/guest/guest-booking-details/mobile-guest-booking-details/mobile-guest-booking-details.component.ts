import {Component, Input, Sanitizer, ViewChild} from '@angular/core';
import {PropertyForGuest} from '../../../../models/guestview/PropertyForGuest';
import {BookingForGuest} from '../../../../models/guestview/BookingForGuest';
import {UtilsService} from '../../../../core/services/utils.service';
import {GuestBookingDetailsComponent} from '../guest-booking-details.component';
import {TranslateService} from '@ngx-translate/core';
import {GuestService} from '../../../../core/services/guest.service';
import { InternalPropertyService } from '../../../../core/services/internal.property.service';
import {ClipboardService} from 'ngx-clipboard';
import {SnackbarMessage} from '../../../../shared/components/shared-snackbar/models/snackbar-message';
import {SharedSnackbarService} from '../../../../shared/components/shared-snackbar/services/shared-snackbar.service';
import {DomSanitizer} from '@angular/platform-browser';
import {Router} from '@angular/router';
import * as moment from 'moment';

declare var google: any;
declare var MarkerClusterer: any;

@Component({
  selector: 'app-mobile-guest-booking-details',
  templateUrl: './mobile-guest-booking-details.component.html',
  styleUrls: ['./mobile-guest-booking-details.component.scss']
})
export class MobileGuestBookingDetailsComponent extends GuestBookingDetailsComponent  {
  /*@Input() property: PropertyForGuest;
  @Input() booking: BookingForGuest;
  photos: object[] = [];
  @ViewChild('gMap', null) gMapElement: any;
  @ViewChild('container', null) gContainerElement: any;*/
  //public map: any;
  //public markers = [];
  // listStyleWith: any;
  // screenWidth: number;

  moment: any = moment;
  lat: number;
  long: number;

  bookingId: string;
  showingMoreDescription = false;

  constructor(public utilService: UtilsService,
              public translateService: TranslateService,
              public snackbar: SharedSnackbarService,
              public guestService: GuestService,
              public clipBoardSrv: ClipboardService,
              public router: Router,
              public sanitizer: DomSanitizer,
              public propertyService: InternalPropertyService) {
    super(utilService, translateService, router, guestService, clipBoardSrv, sanitizer, propertyService);
  }


  findDirection() {
    this.snackbar.push(new SnackbarMessage(this.translateService.instant('direction opened'), 'info'));
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.long = position.coords.longitude;
        const currentGps = this.lat + ',' + this.long;
        const distGps = this.property.poi.y + ',' + this.property.poi.x;
        this.getDirection(currentGps, distGps);
      }, err => {
        this.snackbar.push(new SnackbarMessage(this.translateService.instant('guest-view-booking-details.geolocation-error'), 'error'));
      });
    } else {
      this.snackbar.push(new SnackbarMessage(this.translateService.instant('guest-view-booking-details.geolocation-error'), 'error'));
    }
  }

  getDirection(currentGps, distGps) {
    // document.location.href = 'https://www.google.com/maps/place/' + address;
    window.open(
      'https://www.google.com/maps/dir/' + currentGps + '/' + distGps,
      '_blank' // <- This is what makes it open in a new window.
    );
  }

  getTrimedText(text: string, max: number) {
    if (text.length < max) {
      return text;
    }
    return this.showingMoreDescription ? text : text.substr(0, max) + '...';
  }

  showMoreLessDescription() {
    this.showingMoreDescription = !this.showingMoreDescription;
    if (!this.showingMoreDescription) {
        document.getElementById('checkingSection')
          .scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
    }
  }
}
