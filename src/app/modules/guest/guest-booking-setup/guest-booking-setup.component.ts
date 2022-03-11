import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {NgxMaterialTimepickerTheme} from "ngx-material-timepicker";
import {GuestService} from "../../../core/services/guest.service";
import {ActivatedRoute} from "@angular/router";
import {BookingForGuest} from "../../../models/guestview/BookingForGuest";
import {PropertyForGuest} from "../../../models/guestview/PropertyForGuest";
import * as moment from 'moment';
import {SharedSnackbarService} from "../../../shared/components/shared-snackbar/services/shared-snackbar.service";
import {SnackbarMessage} from "../../../shared/components/shared-snackbar/models/snackbar-message";
import {TranslateService} from "@ngx-translate/core";
import {UtilsService} from "../../../core/services/utils.service";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {LanguageManagementService} from "../../../core/services/language.service";
import {AbstractWindow} from '../../../core/abstract/AbstractWindow';
import {IntercomService} from '../../../core/services/IntercomService';
import {LoaderService} from "../../../core/services/LoaderService";

@Component({
  selector: 'app-guest-booking-setup',
  templateUrl: './guest-booking-setup.component.html',
  styleUrls: ['./guest-booking-setup.component.scss']
})
export class GuestBookingSetupComponent extends AbstractWindow implements OnInit {

  public guruTheme: NgxMaterialTimepickerTheme = {
    container: {
      bodyBackgroundColor: '#FFF',
      buttonColor: '#072D4D',
      primaryFontFamily: 'Barlow Semi Condensed',
    },
    dial: {
      dialBackgroundColor: '#49B1D6',
      dialActiveColor: '#FFF',
      dialInactiveColor: '#BFD7DD',
    },
    clockFace: {
      clockFaceBackgroundColor: '#F0F3F4',
      clockHandColor: '#01085C',
      clockFaceTimeInactiveColor: '#072D4D',
      clockFaceTimeDisabledColor: '#8FB0C4',
    },
  };
  property: PropertyForGuest;
  booking: BookingForGuest;
  bookingToSend: any;
  adult = 0;
  children = 0;
  infants = 0;
  pets = 0;
  double_beds = 0;
  single_beds = 0;
  sofa_beds = 0;
  baby_beds = 0;
  note: string;
  bookingId: string;
  checkin: any;
  checkout: any;
  screenWidth: number;
  disableButton: boolean = false;
  constructor(
    private loaderService: LoaderService,
    public intercomService: IntercomService,
    private guestService: GuestService,
    private route: ActivatedRoute,
    private snackbar: SharedSnackbarService,
    private translate: TranslateService,
    public utilService: UtilsService,
    private languageService: LanguageManagementService
      ) {
      super(intercomService, utilService);
      this.getScreenWidth();
  }
  urlLang = this.translate.currentLang;

  ngOnInit() {
    this.route.paramMap.subscribe( ParamMap => {
      this.bookingId =  ParamMap.get('bookingId');
      this.guestService.getPropertyAndBookingForGuest( this.bookingId , this.languageService.getLanguageInUrl()).pipe(takeUntil(this.onDestroy)).subscribe( res => {
        this.property = res.property;
        this.booking = res.booking;
        if (this.booking) {
          this.adult = this.booking.adults;
          this.children = this.booking.children;
          this.infants = this.booking.babies;
          this.pets = (this.booking.pets == null) ? 0 : this.booking.pets ;
          this.double_beds = this.booking.doubleBeds;
          this.single_beds = this.booking.singleBeds;
          this.sofa_beds = this.booking.sofaBeds;
          this.baby_beds = this.booking.babyBeds;

          if (this.booking.expectedCheckinLocalTime) {
            this.checkin = moment(this.booking.expectedCheckinLocalTime, 'hh:mm:ss').format('HH:mm')
          }
          if (this.booking.expectedCheckoutLocalTime) {
            this.checkout = moment(this.booking.expectedCheckoutLocalTime, 'hh:mm:ss').format('HH:mm')
          }

          /*if (this.property.defaultCheckInTime === '0:00') {
            this.booking.expectedCheckinLocalTime ? this.checkin = moment(this.booking.expectedCheckinLocalTime, 'hh:mm:ss').format('HH:mm') : this.checkin = '10:00';
          } else {
            this.booking.expectedCheckinLocalTime ? this.checkin = moment(this.booking.expectedCheckinLocalTime, 'hh:mm:ss').format('HH:mm') : this.checkin = this.property.defaultCheckInTime;
          }


          if (this.property.defaultCheckOutTime === '0:00') {
            this.booking.expectedCheckoutLocalTime ? this.checkout = moment(this.booking.expectedCheckoutLocalTime, 'hh:mm:ss').format('HH:mm') : this.checkout = '15:00';
          } else {
            this.booking.expectedCheckoutLocalTime ? this.checkout = moment(this.booking.expectedCheckoutLocalTime, 'hh:mm:ss').format('HH:mm') : this.checkout = this.property.defaultCheckOutTime;
          }*/

        }
      });
    });


  }
  AddType(type: string) {
    console.log(this.booking);
    switch (type) {
      case 'adult':
       this.adult++;
       break;
      case 'children':
        this.children++;
        break;
      case 'infants':
        this.infants++;
        break;
      case 'pets':
        this.pets++;
        break;
      case 'double_beds':
        this.double_beds < this.property.doubleBeds ? this.double_beds++ : this.double_beds = this.property.doubleBeds;
        break;
      case 'single_beds':
        this.single_beds < this.property.singleBeds ? this.single_beds++ : this.single_beds = this.property.singleBeds;
        break;
      case 'sofa_beds':
        this.sofa_beds < this.property.sofaBeds ? this.sofa_beds++ : this.sofa_beds = this.property.sofaBeds;
        break;
      case 'baby_beds':
        this.baby_beds < this.property.babyBeds ? this.baby_beds++ : this.baby_beds = this.property.babyBeds;
        break;
      default: {

      }
    }
  }
  removeType(type: string) {
    switch (type) {
      case 'adult':
        this.adult > 0 ? this.adult-- : this.adult = 0;
        break;
      case 'children':
        this.children > 0 ? this.children-- : this.children = 0;
        break;
      case 'infants':
        this.infants > 0 ? this.infants-- : this.infants = 0;
        break;
      case 'pets':
        this.pets > 0 ? this.pets-- : this.pets = 0;
        break;
      case 'double_beds':
        this.double_beds > 0 ? this.double_beds-- : this.double_beds = 0;
        break;
      case 'single_beds':
        this.single_beds > 0 ? this.single_beds-- : this.single_beds = 0;
        break;
      case 'sofa_beds':
        this.sofa_beds > 0 ? this.sofa_beds-- : this.sofa_beds = 0;
        break;
      case 'baby_beds':
        this.baby_beds > 0 ? this.baby_beds-- : this.baby_beds = 0;
        break;
      default: {

      }
    }
  }

  saveBookingInfo() {

    this.loaderService.dismissLoader();
    this.snackbar.dismiss();


    if (this.property.defaultCheckInTime && !this.property.canEarlyCheck) {
      if (moment(this.checkin, 'hh:mm').isBefore(moment(this.property.defaultCheckInTime, 'hh:mm'))) {
        this.snackbar.push(new SnackbarMessage(this.translate.instant('guest-setup-page.impossible-checkin-time') + ' '
          + this.property.defaultCheckInTime, 'error'));
        return;
      }
    }
    if (this.property.defaultCheckOutTime && !this.property.canEarlyCheck) {
      if (moment(this.checkout, 'hh:mm').isAfter(moment(this.property.defaultCheckOutTime, 'hh:mm'))) {
        this.snackbar.push(new SnackbarMessage(this.translate.instant('guest-setup-page.impossible-checkout-time') + ' '
          + this.property.defaultCheckOutTime, 'error'));
        return;
      }
    }

    this.disableButton = true;
    this.bookingToSend = {
      expectedCheckinLocalTime: this.checkin ,
      expectedCheckoutLocalTime: this.checkout,
      adults: this.adult,
      children: this.children,
      babies: this.infants,
      pets: this.pets,
      doubleBeds: this.double_beds,
      singleBeds: this.single_beds,
      sofaBeds: this.sofa_beds,
      babyBeds: this.baby_beds,
      guestNote: this.booking.guestNote,
      firstName: this.booking.guests[0].firstName,
      lastName: this.booking.guests[0].lastName,
      phone: this.booking.guests[0].phone,
      secondaryPhone: this.booking.guests[0].secondaryPhone,
      email: this.booking.guests[0].email,
      secondaryEmail: this.booking.guests[0].secondaryEmail,
      companyName: this.booking.guests[0].companyName
    };
    this.loaderService.showFullLoader('');
    this.guestService.saveBooking(this.booking.id , this.bookingToSend ).subscribe(resp => {
      this.loaderService.dismissLoader();
      this.disableButton = false;
      this.snackbar.push(new SnackbarMessage(this.translate.instant('guest-setup-page.guest_success_message'), 'info'));
    }, err => {
      this.loaderService.dismissLoader();
      this.disableButton = false;
      console.log('ERROR', err);
      this.snackbar.push(new SnackbarMessage(this.translate.instant('guest-setup-page.' + err.error.message), 'error'));

    });

  }

  removeAdult() {
    if (this.adult > 0) {
      this.adult--;
    }
  }

  checkDisableBtnDecre(value : number) {
    if (value<1 ) {
      return 'primary-not-valid';
    }
  }


  addAdult() {
    this.adult++;
  }

  addChild() {
    this.children++;
  }

  removeChild() {
    if (this.children > 0) {
      this.children--;
    }
  }

  addBaby() {
    this.infants++;
  }
  addPets() {
      this.pets++;
  }
  removePets() {
      if (this.pets>0) {
        this.pets--;
      }
  }
  removeBaby() {
    if (this.infants > 0) {
      this.infants--;
    }
  }

  add(type: string) {
    if (type === 'double' && this.double_beds<this.property.doubleBeds) {
      this.double_beds++;
    }
    if (type === 'single' && this.single_beds<this.property.singleBeds) {
      this.single_beds++;
    }
    if (type === 'sofa' && this.sofa_beds<this.property.sofaBeds) {
      this.sofa_beds++;
    }
    if (type === 'crib' && this.baby_beds<this.property.babyBeds) {
      this.baby_beds++;
    }
  }

  remove(type: string) {
    if (type === 'double' && this.double_beds > 0) {
      this.double_beds--;
    }
    if (type === 'single' && this.single_beds > 0) {
      this.single_beds--;
    }
    if (type === 'sofa' && this.sofa_beds > 0) {
      this.sofa_beds--;
    }
    if (type === 'crib' && this.baby_beds > 0) {
      this.baby_beds--;
    }

  }

  checkDisableBtnIncre(value : number,type: string) {
    if (type === 'double' && value > this.property.doubleBeds-1) {
      return 'primary-not-valid';
    }
    if (type === 'single' && value > this.property.singleBeds-1) {
      return 'primary-not-valid';
    }
    if (type === 'sofa' && value > this.property.sofaBeds-1) {
      return 'primary-not-valid';
    }
    if (type === 'crib' && value > this.property.babyBeds-1) {
      return 'primary-not-valid';
    }
  }

  isCotoon(): boolean {
    return (this.property.host.email.indexOf('cotoon') >= 0);
  }


}
