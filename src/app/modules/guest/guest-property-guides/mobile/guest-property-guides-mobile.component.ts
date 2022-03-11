import { Component, OnInit } from '@angular/core';
import { GuestPropertyGuidesComponent} from "../guest-property-guides.component";
import {GuestServiceIntern} from "../../guest.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UtilsService} from "../../../../core/services/utils.service";
import {GuestService} from "../../../../core/services/guest.service";
import {LanguageManagementService} from "../../../../core/services/language.service";
import {CategoryGuides, Guide} from "../../../../models/Guide";

@Component({
  selector: 'app-guest-property-guides-mobile',
  templateUrl: './guest-property-guides-mobile.component.html',
  styleUrls: ['./guest-property-guides-mobile.component.scss']
})
export class GuestPropertyGuidesMobileComponent extends GuestPropertyGuidesComponent {
  lang: string;
  panelOpenState = false;
  selectedIndex: number;
  fullDescription = false;
  mobileCurrentOpenCategory;
  mobileDetailsOpened;
  constructor( public guideServiceIntern: GuestServiceIntern,
               public router: Router,
               public route: ActivatedRoute,
               public utilService: UtilsService,
               public guestService: GuestService,
               public languageService: LanguageManagementService) {
    super(guideServiceIntern, router, route, utilService, guestService, languageService);
  }

  readmore() {
    this.fullDescription = !this.fullDescription;
  }
  scrollToElement($element): void {
    // TODO: Find a way to scroll with an offset of the size of the top menu.
    if ($element) {

      document.getElementById($element).scrollIntoView();

      //console.log('SCROLL IN-ELEMENT');
      //$element.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'end'});
    }
  }

  showMobileGuideDetails(guide: Guide) {
    this.currentGuide = guide;
    this.mobileDetailsOpened = true;
    this.showGuideDetails = true;
  }

  openMobileGuideList(cat: CategoryGuides, i) {
    this.mobileCurrentOpenCategory = this.mobileCurrentOpenCategory === i ? null : i;
    if (this.mobileCurrentOpenCategory === i) {
      this.currentGuidesList = cat.guides;
    }
    this.currentSelectedCategory = cat.category;
  }
}
