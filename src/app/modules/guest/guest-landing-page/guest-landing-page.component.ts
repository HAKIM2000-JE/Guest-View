import {
  AfterContentChecked,
  AfterViewInit,
  Component,
  EventEmitter,
  HostListener,
  Inject,
  OnChanges,
  OnDestroy,
  OnInit,
  Output, SimpleChanges,
  ViewChild
} from '@angular/core';
import {GuestService} from '../../../core/services/guest.service';
import {InternalPropertyService} from '../../../core/services/internal.property.service';
import {Photo} from '../../../models/Photo';
import {Property} from '../../../models/Property';
import SwipeListener from 'swipe-listener';
import {UtilsService} from '../../../core/services/utils.service';
import {PropertyBooking} from '../../../models/PropertyBooking';
import {ImageService} from '../../../core/services/image.service';
import * as moment from 'moment';
import {PropertyForGuest} from '../../../models/guestview/PropertyForGuest';
import {BookingForGuest} from '../../../models/guestview/BookingForGuest';
import {PlatformAffiliateServices} from '../../../models/guestview/PlatformAffiliateServices';
import {ActivatedRoute, NavigationEnd, Params, Router} from '@angular/router';
import {switchMap, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {DOCUMENT} from '@angular/common';
import {TranslateService} from '@ngx-translate/core';
import {GuestServiceIntern} from '../guest.service';
import {LanguageManagementService} from '../../../core/services/language.service';
import {SharedSnackbarService} from '../../../shared/components/shared-snackbar/services/shared-snackbar.service';
import {IntercomService} from '../../../core/services/IntercomService';
import {GuideService} from '../../../core/services/GuideService';
import {BookletReviews} from '../../../models/BookletReviews';
import {Corporate} from "../../../models/guestview/Corporate";
import {LoaderService} from "../../../core/services/LoaderService";
import {UpsaleCategoryAndProductDto} from "../../../models/guestview/upsale/UpsaleCategoryAndProductDto";
import {ApiService} from "../../../core/http/api.service";
declare var google: any;
declare var MarkerClusterer: any;
import * as fs from 'fs';
import {getFileSystem} from "@angular/compiler-cli/src/ngtsc/file_system";
import {BrandedPath} from "@angular/compiler-cli/src/ngtsc/file_system/src/types";
import * as Util from "util";

@Component({
  selector: 'app-guest-landing-page',
  templateUrl: './guest-landing-page.component.html',
  styleUrls: ['./guest-landing-page.component.scss']
})
export class GuestLandingPageComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit, AfterContentChecked  {

  public landingPageFragment = '';
  private onDestroy = new Subject();

  @ViewChild('gMap', null) gmapElement: any;
  @ViewChild('container', null) gcontainerElement: any;
  @Output() scrollevent = new EventEmitter<boolean>();
  public map: any;
  public markers = [];
  urlLang: string;
  screenWidth: number;
  hasUpsales: boolean;
  mainPropertyPhoto: Photo = null;
  property: PropertyForGuest;
  booking: BookingForGuest;
  corporate: Corporate;
  bookletReviews: BookletReviews;
  platformAffiliateServices: PlatformAffiliateServices[];
  upsaleCategoryAndProductDtos: UpsaleCategoryAndProductDto[] = [];

  bookingId = '';
  sizeBefore = 'before';
  sizeAfter = 'after';

  lat: number;
  long: number;

  constructor(public guestService: GuestService,
              public languageService: LanguageManagementService,
              public internGuestService: GuestServiceIntern,
              public imageService: ImageService,
              private apiService: ApiService,
              public router: Router,
              public route: ActivatedRoute,
              public propertyService: InternalPropertyService,
              public translateService: TranslateService,
              public utilService: UtilsService,
              public snackbarService: SharedSnackbarService,
              public intercomService: IntercomService,
              private loaderService: LoaderService,
              @Inject(DOCUMENT) private document: Document) {
    this.getScreenWidth();
  }

  ngOnInit() {

    this.loaderService.dismissLoader();
    // this.intercomService.openMessenger();

    this.snackbarService.dismiss();
    this.route.queryParamMap.subscribe(params => {
        if (params[`params`].lang) {
          this.urlLang = params[`params`].lang ;

    /*      if (UtilsService.languageArray.includes(this.urlLang)) {
            this.languageService.setLanguageInUrl(this.urlLang);
            this.translateService.use(this.urlLang);
          } else {
            this.languageService.setLanguageInUrl("en");
            this.translateService.use("en");
          }*/

        }
    });

    this.route.fragment.subscribe( fragment => {
      if (fragment) {
        console.log('fragment1', fragment);
        this.landingPageFragment = fragment;
        const element = document.querySelector("#" + fragment);
        if (element) {
          console.log('element found');
          element.scrollIntoView(true);
          // window.scroll({ top: -100 })
        }
      }
    });

    /*this.router.events.subscribe(s => {
      if (s instanceof NavigationEnd) {
        const tree = this.router.parseUrl(this.router.url);
        if (tree.fragment) {
          console.log('fragment', tree.fragment);
          const element = document.querySelector("#" + tree.fragment);
          if (element) {
            console.log('element found');
            element.scrollIntoView(true); }
        }
      }
    });*/

    this.route.params.subscribe( param => {
      if (param.bookingId) {
        this.bookingId = param.bookingId;
      }
    });

    this.route.data.subscribe((res) => {
      this.loaderService.dismissLoader();
      this.getBookingDetails(res, this.urlLang);
    });
  }

  ngAfterContentChecked() {

  }

  ngAfterViewInit() {
    if (this.router.url.indexOf('/guides') > 0) {
      this.landingPageFragment = "guides";
      console.log("LastRouterGuide", this.router.url.substring(this.router.url.lastIndexOf("/") + 1));
      if (this.router.url.substring(this.router.url.lastIndexOf("/") + 1) != 'guide') {
        this.internGuestService.setCurrentGuideId( this.router.url.substring(this.router.url.lastIndexOf("/") + 1));
      }
    } else if (this.router.url.indexOf('/recommendations') > 0) {
      this.landingPageFragment = "recommendations";
    } else if (this.router.url.indexOf('/details') > 0) {
      this.landingPageFragment = "details";
    } else if (this.router.url.endsWith('/usefulnumber')) {
      this.landingPageFragment = "usefulnumber";
    } else if (this.router.url.endsWith('/services')) {
      this.landingPageFragment = "services";
    } else if (this.router.url.endsWith('/hygienes')) {
      this.landingPageFragment = "hygienes";
    } else if (this.router.url.endsWith('/messaging')) {
      this.landingPageFragment = "messaging";
    }
    if (this.landingPageFragment && this.landingPageFragment !== '') {
      const element = document.querySelector("#" + this.landingPageFragment);
      if (element) {
        console.log('element found');
        element.scrollIntoView(true);
        // window.scroll({ top: -100 })
      }
    }
  }
  getBookingDetails(res, lang: string) {
    if (res && res.propertyAndBooking) {
      console.log('result of GuestPropertyBooking', res);

      this.property = res.propertyAndBooking.property;
      this.guestService.sendProperty(this.property);
      this.mainPropertyPhoto = this.propertyService.getMainPhotoUrl();
      this.booking = res.propertyAndBooking.booking;
      this.bookletReviews = res.propertyAndBooking.bookletReviews;
      this.guestService.sendBooking(this.booking);
      this.corporate = res.propertyAndBooking.corporate;
      this.guestService.sendCorporate(this.corporate);
      this.hasUpsales = res.propertyAndBooking.hasUpsales;

      this.guestService.sendupsaleCategoryAndProductDtos(res.propertyAndBooking.upsaleCategoryAndProductDtos);

      // CUSTOMISATION DES COULEURS
      this.utilService.manageCorporateColors(this.corporate);

      let bookletLanguage = this.urlLang;
      if (bookletLanguage == null) {
        this.urlLang = navigator.language;
        if (this.booking && this.booking.guests != null && this.booking.guests.length > 0
          && this.booking.guests[0].languages != null && this.booking.guests[0].languages.length > 0) {
          bookletLanguage = this.booking.guests[0].languages[0];
        }
      }
      bookletLanguage = UtilsService.isLanguageSupported(bookletLanguage);
      this.languageService.setLanguageInUrl(bookletLanguage);
      this.translateService.use(bookletLanguage);


      /*if (this.urlLang == null) {
        this.urlLang = navigator.language;
        if (this.booking && this.booking.guests && this.booking.guests.length > 0) {
          if (this.booking.guests[0].languages && this.booking.guests[0].languages.length > 0) {
            let guestLang = this.booking.guests[0].languages[0];
            this.urlLang = guestLang;
            console.log('guest Language :', guestLang);
            if (guestLang.length > 2) {
              if (guestLang === 'English') {
                guestLang = 'en';
              } else if (guestLang === 'Français') {
                guestLang = 'fr';
              } else if (guestLang === 'us') {
                guestLang = 'en';
              } else if (guestLang === 'br') {
                guestLang = 'pt';
              } else if (guestLang === 'ca') {
                guestLang = 'en';
              }
              else {
                guestLang = 'en';
              }
            }

            if (UtilsService.isLanguageSupported(guestLang)) {
              this.languageService.setLanguageInUrl(guestLang);
              this.translateService.use(guestLang);
            } else {
              this.languageService.setLanguageInUrl("en");
              this.translateService.use("en");
            }
          }
        }
      }*/

      this.platformAffiliateServices = res.propertyAndBooking.platformAffiliateServices;
      this.platformAffiliateServices.reverse();
      console.log('platformAffiliateServices', this.platformAffiliateServices);


      if (this.property.messageBirdWidgetId != null && this.property.messageBirdWidgetId != '') {
        let script = document.createElement('script');
        script.text = " var MessageBirdChatWidgetSettings = { \n" +
          "    widgetId: '" + this.property.messageBirdWidgetId +  "', \n" +
          "    initializeOnLoad: true, \n" +
          "  };\n" +
          "\n" +
          "  !function(){\"use strict\";if(Boolean(document.getElementById(\"live-chat-widget-script\")))console.error(\"MessageBirdChatWidget: Snippet loaded twice on page\");else{var e,t;window.MessageBirdChatWidget={},window.MessageBirdChatWidget.queue=[];for(var i=[\"init\",\"setConfig\",\"toggleChat\",\"identify\",\"hide\",\"on\",\"shutdown\"],n=function(){var e=i[d];window.MessageBirdChatWidget[e]=function(){for(var t=arguments.length,i=new Array(t),n=0;n<t;n++)i[n]=arguments[n];window.MessageBirdChatWidget.queue.push([[e,i]])}},d=0;d<i.length;d++)n();var a=(null===(e=window)||void 0===e||null===(t=e.MessageBirdChatWidgetSettings)||void 0===t?void 0:t.widgetId)||\"\",o=function(){var e,t=document.createElement(\"script\");t.type=\"text/javascript\",t.src=\"https://livechat.messagebird.com/bootstrap.js?widgetId=\".concat(a),t.async=!0,t.id=\"live-chat-widget-script\";var i=document.getElementsByTagName(\"script\")[0];null==i||null===(e=i.parentNode)||void 0===e||e.insertBefore(t,i)};\"complete\"===document.readyState?o():window.attachEvent?window.attachEvent(\"onload\",o):window.addEventListener(\"load\",o,!1)}}();\n";
        document.body.appendChild(script);
      } else {
        // Remove Intercom from LA no contact with YAAGO for Guest ...
        // this.intercomService.init();
      }

      /*if (lang) {
        if (lang === 'fr') {
          this.translateService.use('fr');
        } else {
          this.translateService.use('en');
        }
      } else {
        if (this.booking.guests[0].languages && this.booking.guests[0].languages.length > 0) {
          if (this.booking.guests[0].languages[0] === 'fr') {
            this.translateService.use('fr');
            this.translateService.setDefaultLang('fr');
            this.languageService.setLanguageInUrl('fr');
          } else {
            this.translateService.use('en');
            this.translateService.setDefaultLang('en');
            this.languageService.setLanguageInUrl(this.booking.guests[0].languages[0]);
          }
        } else {
          this.translateService.use('fr');
          this.translateService.setDefaultLang('fr');
          this.languageService.setLanguageInUrl('fr');
        }
      }*/
    } else {
      this.router.navigate(['/misc/lost']);
      this.intercomService.init();
    }
  }


  loadScript() {
    let chatScript = document.createElement("script");
    chatScript.type = "text/javascript";
    chatScript.async = true;

    chatScript.src = "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js";
    document.body.appendChild(chatScript);

  }

  scrolled(e) {
    this.scrollevent.emit(true);
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  ngOnChanges(changes: SimpleChanges) {
   this.ngOnInit();
   console.log(changes);
  }

  isDesktopMode(): boolean {
    return this.utilService.isDesktop(this.screenWidth);
  }

  @HostListener('window:resize', ['$event'])
  getScreenWidth(event?) {
    this.screenWidth = window.innerWidth;
  }

/*
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {

    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    const max = document.documentElement.scrollHeight;

    console.log('pos',pos);
    console.log('max',max);

  }*/

}


