import {Component, HostListener, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Property} from '../../../models/Property';
import {CategoryGuide, CategoryGuides, DocType, Guide} from '../../../models/Guide';
import {PropertyForGuest} from '../../../models/guestview/PropertyForGuest';
import {BookingForGuest} from '../../../models/guestview/BookingForGuest';
import { GuestServiceIntern} from "../guest.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UtilsService} from "../../../core/services/utils.service";
import {GuestService} from "../../../core/services/guest.service";
import {Subject} from "rxjs";
import { isArray } from "util";
import {Location} from "@angular/common";
import {LanguageManagementService} from "../../../core/services/language.service";
import {MenuItem} from "../../../shared/components/tabs-menu/tabs-menu.component";
import {ButtonType} from "../../../shared/components/button/button.component";
import {GuideService} from '../../../core/services/GuideService';

@Component({
  selector: 'app-guest-property-guides',
  templateUrl: './guest-property-guides.component.html',
  styleUrls: ['./guest-property-guides.component.scss']
})
export class GuestPropertyGuidesComponent implements OnInit, OnChanges , OnDestroy {
  onDestroy = new Subject();
  @Input() property: PropertyForGuest;
  @Input() booking: BookingForGuest;
  displayGuides: Array<Guide> & Array<Guide[]> = [];
  currentGuide: Guide;
  guides: any;
  bookingId: string;
  differenceNumber: number;
  screenWidth: number;
  selectedGroup:any;
  @ViewChild('mytemplate', null) mytmpl: any;

  categoryGuides: CategoryGuides[] = [];
  currentSelectedCategory: string;
  currentGuidesList: Guide[] = [];
  categoryTabs: MenuItem[] = [];

  ButtonType = ButtonType;
  showGuideDetails = false;


  constructor( public guideServiceIntern: GuestServiceIntern,
               public router: Router,
               public route: ActivatedRoute,
               public utilService: UtilsService,
               public guestService: GuestService,
               public languageService: LanguageManagementService) {
    this.getScreenWidth();
  }

  ngOnInit() {
    this.guideServiceIntern.getCurrentGuideId().subscribe( guideId => {
      console.log("--- This is a guide to display : ", guideId);
      if (this.property != null && this.property.guides != null) {
        this.property.guides.forEach(g => {
          if (g.guideId === guideId) {
            this.openGuideDetails(g);
          }
        });
      }
    });
  }

  isSwiklyConfigured() {
    return this.booking && this.booking.swiklyInfo && this.booking.swiklyInfo.swiklyAcceptUrl;
  }
  isIgloohomeConfigured(): boolean {
    return this.property.iglooHomeDisplayWelcomeBooklet && this.booking && !!(this.booking.iglooHomeAccess ? this.booking.iglooHomeAccess.code : this.booking.iglooHomeLockCode);
  }

  isTheKeysConfigured(): boolean {
    return this.property.smartLockDisplayWelcomeBooklet && this.booking && this.booking.theKeysAccesses && this.booking.theKeysAccesses.length > 0;
  }

  needToShowGuide(guide: Guide) {
    if (guide.partnerName != null && guide.partnerName !== '' && guide.partnerType != null && guide.partnerType !== '') {
      if (guide.partnerName === 'swikly') {
        return this.isSwiklyConfigured() && !this.booking.swiklyInfo.swiklyDepositAcceptedDate;
      } else if (guide.partnerName === 'the-keys') {
        return this.isTheKeysConfigured();
      } else if (guide.partnerName === 'igloohome') {
        return this.isIgloohomeConfigured();
      } else {
        return true;
      }
    } else {
      return true;
    }
  }

  initCategories() {
    console.log('GUIIIIIIDES', this.property);
    if (!this.property.guides) {
      return;
    }
    const grouped = this.utilService.groupByKey2(this.property.guides, 'category', 'newCategoryDisplay');
    // const grouped = this.utilService.groupByKey(this.property.guides, 'category');
    console.log('KEY-GUIDES', grouped);
    this.categoryGuides = [];
    Object.keys(grouped).forEach(categoryKey => {
      console.log('KEY-GUIDES', categoryKey);
      const catGuides = new CategoryGuides();
      catGuides.category = categoryKey; catGuides.guides = grouped[categoryKey];
      if (grouped[categoryKey].length>0) {
        if (grouped[categoryKey][0].newCategoryDisplay !=null && grouped[categoryKey][0].newCategoryDisplay !=='') {
          catGuides.custom = true;
        }
      }
      this.categoryGuides.push(catGuides);
    });


    this.categoryTabs = [];
    if (this.categoryGuides && this.categoryGuides.length > 0) {
      if (!this.currentSelectedCategory) {
          this.currentSelectedCategory = this.categoryGuides[0].category;
          this.currentGuidesList = this.categoryGuides[0].guides;
      }
      this.categoryGuides.forEach(item => {
        if (item.custom) {
          this.categoryTabs.push(new MenuItem(item.category, item.category, this.currentSelectedCategory === item.category));
        } else {
          this.categoryTabs.push(new MenuItem('guides-list.' + item.category, item.category, this.currentSelectedCategory === item.category));
        }
      });
    }

  }
  ngOnChanges(changes: SimpleChanges): void {

    if (this.property && this.property.guides) {

      this.initCategories();
      this.guides = this.property.guides;

      /*this.displayGuides = [];
      if (this.property.guides.find( g => g.category === 'orientation')) {
        this.displayGuides.push(this.property.guides.find(g => g.category === 'orientation'));
      }
      if (this.property.guides.find( g => g.category === 'parking')) {
        const parking = this.property.guides.filter(g => g.category === 'parking');
        this.displayGuides.push(parking);
      }
      if (this.property.guides.find( g => g.category === 'check-in')) {
        this.displayGuides.push(this.property.guides.find(g => g.category === 'check-in'));
      }
      if (this.property.guides.find( g => g.category === 'wifi')) {
        this.displayGuides.push(this.property.guides.find(g => g.category === 'wifi'));
      }
      if (this.property.guides.find( g => g.category === 'rules')) {
        this.displayGuides.push(this.property.guides.find(g => g.category === 'rules'));
      }
      if (this.property.guides.find( g => g.category === 'other')) {
        const other = this.property.guides.filter(g => g.category === 'other');
        this.displayGuides.push(other);
      }
      if (this.property.guides.find( g => g.category === 'appliances')) {
        const appliances = this.property.guides.filter(g => g.category === 'appliances');
        this.displayGuides.push(appliances);
      }
      if (this.property.guides.find( g => g.category === 'heating')) {
        this.displayGuides.push(this.property.guides.find(g => g.category === 'heating'));
      }
      if (this.property.guides.find( g => g.category === 'trash')) {
        this.displayGuides.push(this.property.guides.find(g => g.category === 'trash'));
      }
      if (this.property.guides.find( g => g.category === 'check-out')) {
        this.displayGuides.push(this.property.guides.find(g => g.category === 'check-out'));
      }*/
      // const others = this.property.guides.filter( g => g.category !== 'check-in' && g.category !== 'parking' && g.category !== 'orientation' && g.category !== 'wifi');
      // if (others) {
      //   others.forEach( pg => {
      //     // if (this.displayGuides.length < 3) {
      //       this.displayGuides.push(pg);
      //     // }
      //   });
      // }
      /*this.currentGuide = !Array.isArray(this.displayGuides[0]) ? this.displayGuides[0] : this.displayGuides[0][0];
      if (this.property.guides.length > 3) {
        this.differenceNumber = this.property.guides.length - 3;
      }*/


    }

    this.route.paramMap.subscribe( ParamMap => {
      this.bookingId = ParamMap.get('bookingId');
      console.log('this.bookingId' , this.bookingId);
    });
  }
  onTabMenuSelected(event) {
    this.currentSelectedCategory = event;
    this.currentGuidesList = this.property.guides.filter(item => (item.category === event || item.newCategoryDisplay === event));
  }

  getGuideCover(guide: Guide) {
    if (!guide || !guide.documents || guide.documents.length === 0) {
      return this.getPictureFromCategory(this.currentSelectedCategory);
    }
    const firstPhoto = guide.documents.find(item => item.type === DocType.IMAGE);
    if (!firstPhoto) {
      return this.getPictureFromCategory(guide.category);
    }

    return firstPhoto.url;
  }

  openGuideDetails(guide: Guide) {
    console.log("-- I do opne the guide");
    this.currentGuide = guide;
    this.showGuideDetails = true;
  }
  closeGuide() {
    this.showGuideDetails = false;
  }

  setCurrentGuide(g: Guide) {
    this.currentGuide = g;
  }
  isSelected(g: Guide) {
    return g === this.currentGuide;
  }

  getPictureFromCategory(category: string) {
    let image;
    switch (category) {
      case CategoryGuide.APPLIANCES:
        image = '../../../../assets/images/list-guides/Appliance/Appliances.png';
        break;
      case CategoryGuide.CHECKIN:
        image = '../../../../assets/images/list-guides/Checkin/checkin.png';
        break;
      case CategoryGuide.CHECKOUT:
        image = '../../../../assets/images/list-guides/Check-out/checkout.png';
        break;
      case CategoryGuide.ORIENTATION:
        image = '../../../../assets/images/list-guides/Direction/dir.png';
        break;
      case CategoryGuide.RULES:
        image = '../../../../assets/images/list-guides/Rules/img@3x.png';
        break;
      case CategoryGuide.SERVICES:
        image = '../../../../assets/images/list-guides/service.png';
        break;
      case CategoryGuide.WIFI:
        image = '../../../../assets/images/list-guides/Wifi/wifi.png';
        break;
      case CategoryGuide.PARKING:
        image = '../../../../assets/images/list-guides/Parking/parking.png';
        break;
      case CategoryGuide.TRASH:
        image = '../../../../assets/images/list-guides/Trash/trash.png';
        break;
      case CategoryGuide.HEATING:
        image = '../../../../assets/images/list-guides/Heating/heater.png';
        break;
      case CategoryGuide.OTHER:
        image = '../../../../assets/images/list-guides/Other/questions.png';
        break;
      default: {
        image = '../../../../assets/images/list-guides/Other/questions.png';
      }
    }
    return image;
  }

  goToListGuide() {
    console.log('this.bookingId 2' , this.bookingId);
    if (this.bookingId) {
      console.log('set guide list = ', this.property.guides);
      this.guideServiceIntern.setGuidesList(this.property.guides);
      this.router.navigate(['list-guides', this.bookingId]);
    }
  }
  goToDetailGuide(guide, lang) {
    console.log('guide clicked', guide);
    this.router.navigate(['/guest/' + this.bookingId +'/guide-full-detail'], {queryParams: {lang}, relativeTo: this.route}).then();
    this.guideServiceIntern.setGuideOneDetail(guide);
  }
  /*
  goToDetailGuideFromHome(guide) {
   // this.guideServiceIntern.setGuideDetail(guide);
  //  this.guideServiceIntern.setActiveGuideIndex(selectedIndex);

    this.guides = this.property.guides;
    const listOfGuideGroup = this.guides.reduce((r, a) => {
      r[a.category] = [...r[a.category] || [], a];
      return r;
    }, {});
    this.guides = Object.entries(listOfGuideGroup);
    console.log('this guides home', this.guides);
    console.log('this selected guide', guide);

    this.guides.forEach(element => {
      if (element[0] === guide.category) {
        this.selectedGroup = element[1];
      }
    });
    console.log('this.selectedGroup', this.selectedGroup);
    if (this.selectedGroup &&  this.bookingId) {
      this.guideServiceIntern.setGuideDetail(this.selectedGroup);
      this.guideServiceIntern.setActiveGuideIndex(0);
      this.router.navigate(['../guide-detail' , this.bookingId]);
    }
  }*/
  isDesktopMode(): boolean {
    return this.utilService.isDesktop(this.screenWidth);
  }

  @HostListener('window:resize', ['$event'])
  getScreenWidth(event?) {
    this.screenWidth = window.innerWidth;
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }
  back() {
    this.router.navigate(['/guest', this.bookingId], {queryParams: {lang: this.languageService.getLanguageInUrl()}, relativeTo: this.route}).then();
    // this.location.back();
    // window.history.back();
  }
}

