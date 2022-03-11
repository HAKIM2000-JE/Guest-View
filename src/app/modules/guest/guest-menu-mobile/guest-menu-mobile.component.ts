import {Component, EventEmitter, HostListener, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {PropertyForGuest} from '../../../models/guestview/PropertyForGuest';
import {InternalPropertyService} from '../../../core/services/internal.property.service';
import {UtilsService} from '../../../core/services/utils.service';
import {BookingForGuest} from '../../../models/guestview/BookingForGuest';
import {takeUntil} from 'rxjs/operators';
import {GuestService} from '../../../core/services/guest.service';
import {Observable, Subject} from 'rxjs';
import {PropertyAndBookingForGuestDto} from '../../../models/guestview/PropertyAndBookingForGuestDto';
import {LanguageManagementService} from "../../../core/services/language.service";
import {ApiService} from '../../../core/http/api.service';
import {Corporate} from "../../../models/guestview/Corporate";

@Component({
  selector: 'app-guest-menu-mobile',
  templateUrl: './guest-menu-mobile.component.html',
  styleUrls: ['./guest-menu-mobile.component.scss']
})
export class GuestMenuMobileComponent implements OnInit, OnDestroy, OnChanges {

  private onDestroy = new Subject();
  languageChooserOpened = false;
  currentLanguage;
  screenWidth: number;
  property: PropertyForGuest;
  urlLang: string;
  bookingId;
  @Input() noreview = false;
  @Input() booking: BookingForGuest;
  @Input() corporate: Corporate;
  @Output() bookingChange = new EventEmitter<BookingForGuest>();
  @ViewChild('drawer', {static: false}) drawer;
  targetsElement = [null];
  $closeWords: Observable<PropertyAndBookingForGuestDto>;
  tmpHostWord = false;
  hasUnreadMessages= false;

  constructor(private route: ActivatedRoute,
              private guestService: GuestService,
              private languageSrv: LanguageManagementService,
              public translate: TranslateService, public guestServiceIntern: InternalPropertyService, public utilService: UtilsService,
              private apiService: ApiService) {
  }

  getLanguages() {
    return UtilsService.languageArray;
  }

  ngOnInit() {
    this.currentLanguage = this.languageSrv.getLanguageInUrl();
    this.screenWidth = window.innerWidth;
    this.route.paramMap.subscribe(ParamMap => {
      if (!this.booking) {
        this.bookingId = ParamMap.get('bookingId');
        /*if (this.bookingId) {
          this.apiService.getMessages(this.bookingId).subscribe(msgs => {
            if (msgs != null) {
              console.log('-->MSGS', msgs);
              this.hasUnreadMessages = msgs.filter(msg => msg.side === 'OUT' && msg.status !== 'READ').length > 0;
            }
          });
        }*/
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
      this.urlLang = this.translate.currentLang;
    });
    this.guestServiceIntern.getCurrentProperty().pipe(takeUntil(this.onDestroy)).subscribe(property => {
      if (property) {
        this.property = property;
      }
    });
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.booking && changes.booking.currentValue) {
      this.tmpHostWord = this.booking.hostWordsDisplayed;
    }
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
        console.log('element', element);
        element.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
      }, 20);
    }

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

  closeHostWord() {
    if (!this.$closeWords) {
      this.$closeWords = this.guestService.closeDisplayWords(this.bookingId).pipe(takeUntil(this.onDestroy));
    }
    this.$closeWords.subscribe(ret => {
      this.booking = ret.booking;
      this.bookingChange.emit(this.booking);
    }, error => {
      // If an error occured hide the dialog but it will be reshown on next reload.
      this.booking.hostWordsDisplayed = true;
      this.bookingChange.emit(this.booking);
    });
  }

  openHostWord() {
    this.booking.hostWordsDisplayed = !this.booking.hostWordsDisplayed;
    this.bookingChange.emit(this.booking);
  }

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
  getNonTranslatedLanguageName( languageCode: string) {
    switch (languageCode) {
      case 'fr':
        return 'Français';
      case 'en':
        return 'English';
      case 'de':
        return 'Deutsch';
      case 'es':
        return 'Español';
      case 'it':
        return 'Italiano';
      case 'nl':
        return 'Nederlands';
      case 'pt':
        return 'português';
      case 'da':
        return 'Dansk';
      case 'no':
        return 'Norsk';
      case 'ru':
        return 'русский';
      case 'pl':
        return 'Polskie';
      case 'sv':
        return 'Svenska';
      case 'tr':
        return 'Türk';
      case 'zh':
        return '中国人';
    }
  }
}
