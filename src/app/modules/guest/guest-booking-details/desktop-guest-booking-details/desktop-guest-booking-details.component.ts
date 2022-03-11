import {Component, Sanitizer} from '@angular/core';
import {GuestBookingDetailsComponent} from '../guest-booking-details.component';
import {UtilsService} from '../../../../core/services/utils.service';
import * as moment from 'moment';
import {TranslateService} from '@ngx-translate/core';
import {GuestService} from '../../../../core/services/guest.service';
import {SharedSnackbarService} from '../../../../shared/components/shared-snackbar/services/shared-snackbar.service';
import {SnackbarMessage} from '../../../../shared/components/shared-snackbar/models/snackbar-message';
import {ClipboardService} from 'ngx-clipboard';
import {DomSanitizer} from '@angular/platform-browser';
import {InternalPropertyService} from '../../../../core/services/internal.property.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-desktop-guest-booking-details',
  templateUrl: './desktop-guest-booking-details.component.html',
  styleUrls: ['./desktop-guest-booking-details.component.scss']
})
export class DesktopGuestBookingDetailsComponent extends GuestBookingDetailsComponent {
  moment: any = moment;
  lat: number;
  long: number;

  showingMoreDescription = false;

  constructor(public utilService: UtilsService,
              public snackbar: SharedSnackbarService,
              public router: Router,
              public translateService: TranslateService,
              public guestService: GuestService,
              public clipBoardSrv: ClipboardService,
              public sanitizer: DomSanitizer,
              public propertyService: InternalPropertyService) {
    super(utilService, translateService, router, guestService, clipBoardSrv, sanitizer, propertyService);
  }

  findDirection() {
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

  partnerScroll(el: any, direction: string) {
    // TODO make a smooth scroll for partners
    el.scrollTo({
      behavior: 'smooth',
      left: direction === 'left' ? el.scrollLeft - 143 : el.scrollLeft + 143, // 143 is the bloc width set on the css
    });
  }



}
