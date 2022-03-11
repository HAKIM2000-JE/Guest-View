import {Component, HostListener, Inject, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {DOCUMENT, ViewportScroller} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {UtilsService} from '../../../core/services/utils.service';
import {BookingForGuest} from '../../../models/guestview/BookingForGuest';
import {takeUntil, windowWhen} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {PropertyForGuest} from '../../../models/guestview/PropertyForGuest';
import {TranslateService} from "@ngx-translate/core";
import {LanguageManagementService} from "../../../core/services/language.service";
import {ApiService} from '../../../core/http/api.service';
import {Corporate} from "../../../models/guestview/Corporate";
import {LoaderService} from "../../../core/services/LoaderService";
import {Icons} from "../../../models/icons";
import * as Util from "util";



@Component({
  selector: 'app-guest-menu-desktop',
  templateUrl: './guest-menu-desktop.component.html',
  styleUrls: ['./guest-menu-desktop.component.scss']
})
export class GuestMenuDesktopComponent implements OnInit, OnChanges, OnDestroy {

  Icons: typeof Icons = Icons;
  private onDestroy = new Subject();
  languageChooserOpened = false;
  currentLanguage;
  screenWidth: number;
  @Input() fragment: string;
  @Input('target') targetsElement;
  @Input() property: PropertyForGuest;
  @Input() theme;
  @Input() noreview = false;
  @Input() booking: BookingForGuest;
  @Input() corporate: Corporate;
  asClicked = false;
  currentActiveMenu = "details";
  bookingId: string;
  displayAlerts = false;
  private _vps: ViewportScroller;
  hasUnreadMessages= false;

  constructor(@Inject(DOCUMENT) document,
              private utilsService: UtilsService,
              private route: ActivatedRoute,
              private translate: TranslateService,
              private languageSrv: LanguageManagementService,
              private router: Router,
              private apiService: ApiService,
              private loaderService: LoaderService
  ) {
  }

  getLanguages() {
    return UtilsService.languageArray;
  }

  ngOnInit() {
    this.currentLanguage = this.languageSrv.getLanguageInUrl();
    this.screenWidth = window.innerWidth;
    this.route.paramMap.pipe(takeUntil(this.onDestroy)).subscribe(ParamMap => {
      if (!this.booking) {
        this.bookingId = ParamMap.get('bookingId');
        if (this.bookingId) {
          this.apiService.getMessages(this.bookingId).subscribe(msgs => {
            if (msgs != null) {
              console.log('-->MSGS', msgs);
              this.hasUnreadMessages = msgs.filter(msg => msg.side === 'OUT' && msg.status !== 'READ').length > 0;
            }
          });
        }
      } else {
        if (this.booking.id) {
          this.apiService.getMessages(this.booking.id).subscribe(msgs => {
            if (msgs != null) {
              console.log('-->MSGS', msgs);
              this.hasUnreadMessages = msgs.filter(msg => msg.side === 'OUT' && msg.status !== 'READ').length > 0;
            }
          });
        }
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.booking && changes.booking.currentValue) {
      this.bookingId = this.booking.id;
    }
    if (changes.fragment) {
      console.log('change on fragments', changes.fragment.currentValue);
      this.currentActiveMenu = changes.fragment.currentValue;
    }
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  goToFragment(fragment: string) {
    //this.router.navigate([this.router.url, { fragment: fragment }]);
    //console.log("this.route", this.route);
    //console.log("this.router", this.router.url);
    /*    const element = document.querySelector("#" + fragment);
        if (element) {
          console.log('element found');
          element.scrollIntoView(true);
        }*/
  }

  scrollToElement($element, manuel): void {
    // TODO: Find a way to scroll with an offset of the size of the top menu.
    if ($element) {
      console.log('SCROLL INELEMENT');
      $element.nativeElement.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'end'});
      /*setTimeout(() => {
        console.log('SCROLL INELEMENT2');
        // workaround for top menu hiding the titles
        // document.querySelector('body').scrollTo(0, -200);
        document.body.scrollTo({
          top: document.body.scrollTop + 100, // could be negative value
          left: 0,
          behavior: 'smooth'
        });
      }, 5000);*/
    } else {
      let element = null;
      document.location.href = '/#/guest/' + this.bookingId;
      const elements: any = document.getElementsByTagName(manuel);
      setTimeout(() => {
        element = elements.item(0);
        element.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
      }, 20);
    }

  }

  isDesktopForMenu(): boolean {
    return this.utilsService.isDesktopForMenu(this.screenWidth);
  }

  @HostListener('window:resize', ['$event'])
  getScreenWidth(event?) {
    this.screenWidth = window.innerWidth;
  }

  /*
    @HostListener('document:scroll')
    onScrollHost(e: Event): void {
      console.log(this.getYPosition(e));
      console.log('scrolled');
    }

    getYPosition(e: Event): number {
      return (e.target as Element).scrollTop;
    }
  */

  changeLanguage(language: string) {
    let link = window.location.href;
    if (link.endsWith('/')) {
      link = link.substr(0, link.lastIndexOf('/'));
    }
    if (link.includes('?lang=')) {
      link = link.substr(0, link.lastIndexOf('?lang='));
    }
    console.log('LINK', link);
    window.location.href = link + '?lang=' + language;
    window.location.reload();
    // window.open(link + '?lang=' + language);
  }

  getLanguage(languageCode: string) {
    return UtilsService.getLanguageFlag(languageCode);
  }

  getNonTranslatedLanguageName(languageCode: string) {
    return UtilsService.getNonTranslatedLanguageName(languageCode);
  }
  loader() {
    // this.loaderService.showFullLoader('');
  }
}
