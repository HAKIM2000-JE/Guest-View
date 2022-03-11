import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {InternalPropertyService} from "../../../core/services/internal.property.service";
import {GuestService} from "../../../core/services/guest.service";
import {PropertyForGuest} from '../../../models/guestview/PropertyForGuest';
import {CategoryGuide, Guide} from "../../../models/Guide";
import {GuestServiceIntern} from "../guest.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TranslateService} from '@ngx-translate/core';
import {LanguageManagementService} from "../../../core/services/language.service";

@Component({
  selector: 'app-guest-guides-list',
  templateUrl: './guest-guides-list.component.html',
  styleUrls: ['./guest-guides-list.component.scss']
})
export class GuestGuidesListComponent implements OnInit {
  property: PropertyForGuest;
  guides: any;
  bookingId: string;
  constructor(
    private propertyService: InternalPropertyService,
    private guideServiceIntern: GuestServiceIntern,
    private guestService: GuestService,
    private router: Router,
    private translateService: TranslateService,
    private route: ActivatedRoute,
    private languageService: LanguageManagementService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe( ParamMap => {
      this.bookingId = ParamMap.get('bookingId');
    });

    this.guideServiceIntern.getGuidesList().subscribe(data => {
      if (data) {
        this.guides = data;
        let listOfGuideGroup = this.guides.reduce((r, a) => {
          r[a.category] = [...r[a.category] || [], a];
          return r;
        }, {});
        this.guides = Object.entries(listOfGuideGroup);
      } else {
        this.getGuideListFromApi();
      }
    });


  }
 getGuideListFromApi() {
   this.guestService.getPropertyAndBookingForGuest(this.bookingId , this.languageService.getLanguageInUrl()).subscribe(data => {
     this.guides = data.property.guides;
     const listOfGuideGroup = this.guides.reduce((r, a) => {
       r[a.category] = [...r[a.category] || [], a];
       return r;
     }, {});
     this.guides = Object.entries(listOfGuideGroup);
   });
 }
  getImageByCategory(category: CategoryGuide): string {
    let image;
    switch (category) {
    case CategoryGuide.APPLIANCES:
      image = '../../../../assets/images/list-guides/Appliance/Appliances.png';
      break;
    case CategoryGuide.CHECKIN:
      image = '../../../../assets/images/list-guides/Checkin/checkin.jpg';
      break;
    case CategoryGuide.CHECKOUT:
      image = '../../../../assets/images/list-guides/Check-out/checkout.jpg';
      break;
    case CategoryGuide.ORIENTATION:
      image = '../../../../assets/images/list-guides/Direction/img@3x.jpg';
      break;
    case CategoryGuide.RULES:
      image = '../../../../assets/images/list-guides/Rules/img@3x.jpg';
      break;
    case CategoryGuide.WIFI:
      image = '../../../../assets/images/list-guides/Wifi/wifi.jpg';
      break;
    case CategoryGuide.PARKING:
      image = '../../../../assets/images/list-guides/Parking/parking.jpg';
      break;
    case CategoryGuide.TRASH:
      image = '../../../../assets/images/list-guides/Trash/trash.jpg';
      break;
    case CategoryGuide.HEATING:
      image = '../../../../assets/images/list-guides/Heating/heater.jpg';
      break;
    case CategoryGuide.OTHER:
      image = '../../../../assets/images/list-guides/Other/questions.png';
      break;
    default: {
        image = '../../../../assets/images/list-guides/Appliance/Appliances.png';
      }
    }
    return image;
  }

  goToDetailGuide(selected, guide) {
    console.log('guide', guide);
    console.log('selected', selected);
    this.guideServiceIntern.setGuideDetail(guide);
    this.guideServiceIntern.setActiveGuideIndex(selected);
    this.router.navigate(['/guide-detail', this.bookingId]);
  }

}
