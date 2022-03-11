import {Component, HostListener, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Property} from '../../../models/Property';
import {GuestService} from '../../../core/services/guest.service';
import {InternalPropertyService} from '../../../core/services/internal.property.service';
import {UsefulNumber} from '../../../models/UsefulNumber';
import {Person} from '../../../models/Person';
import {PropertyForGuest} from '../../../models/guestview/PropertyForGuest';
import {ActivatedRoute, Router} from "@angular/router";
import {GuestServiceIntern} from "../guest.service";
import {UtilsService} from "../../../core/services/utils.service";
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-guest-usefulnumber',
  templateUrl: './guest-usefulnumber.component.html',
  styleUrls: ['./guest-usefulnumber.component.scss']
})
export  class GuestUsefulnumberComponent implements OnInit {

  @Input() property: PropertyForGuest;

  numberOfItems: number;
  @ViewChild('mytemplate', null) mytmpl: any;
  detailPage: boolean = false;
  landingNumber;
  bookingId: string;
  screenWidth: number;



  constructor(public guestService: GuestService,
              public  propertyService: InternalPropertyService,
              public route: ActivatedRoute,
              public router: Router,
              public guestServiceIntern: GuestServiceIntern,
              public translateService: TranslateService,
              public utilService: UtilsService
            ) {
    this.getScreenWidth();
  }

  ngOnInit() {
    this.propertyService.getCurrentProperty().subscribe(property => {
      if (property) {
        this.property = property;
        console.log(this.property);
        this.getUsefullnumber(this.property);
      } else {/*
        this.route.paramMap.subscribe(params => {
          if (params.get('bookingId')) {
            this.guestService.getPropertyAndBookingForGuest(params.get('bookingId'), this.guestService.languageInUrl).subscribe(data => {
              this.property = data.property;
              this.getUsefullnumber(this.property);
            });
          }
        });*/
      }
    });

    const url = this.route.snapshot.routeConfig.path;
    const lastPath = url.split('/').pop();

    if (lastPath === 'useful-number' || lastPath === 'useful-number-full-list') {
      this.detailPage = true;
      if (this.property) {
        this.landingNumber = this.property.usefulNumbers;
      }
    }
    this.route.params.subscribe(params => {
      if (params.bookingId) {
        this.bookingId = params.bookingId;
      }
    });
  }

  getUsefullnumber(property) {
    if (property) {
      if (!this.isDesktopMode()) {
        this.landingNumber = property.usefulNumbers.slice(0, 4);
      } else {
        this.landingNumber = property.usefulNumbers.slice(0, 8);
      }
      this.numberOfItems = /*this.landingNumber.length*/ property.usefulNumbers.length;
      console.log(this.landingNumber);
    }
  }

  Call(use , type) {
    if (type !== 'usefull') {
      document.location.href = 'tel:' + use.phone;
    } else {
      document.location.href = 'tel:' + use.phoneNumber;
    }
  }

  Message(use, type) {
    if (type !== 'usefull') {
      document.location.href = 'sms:' + use.phone;
    } else {
      document.location.href = 'sms:' + use.phoneNumber;
    }
  }


  emailPerson(use) {
    if (use.email) {
      document.location.href = 'mailto:' + use.email;
    }
  }


  getDirection(address) {
   // document.location.href = 'https://www.google.com/maps/place/' + address;
    window.open(
      'https://www.google.com/maps/dir/' + address + '/' + this.property.fullAddress,
      '_blank' // <- This is what makes it open in a new window.
    );
  }

  isDesktopMode(): boolean {
    return this.utilService.isDesktop(this.screenWidth);
  }

  @HostListener('window:resize', ['$event'])
  getScreenWidth(event?) {
    this.screenWidth = window.innerWidth;
  }

}
