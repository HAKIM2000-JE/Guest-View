import { Component, OnInit } from '@angular/core';
import {GuestUsefulnumberComponent} from "../guest-usefulnumber/guest-usefulnumber.component";
import {GuestService} from "../../../core/services/guest.service";
import {InternalPropertyService} from "../../../core/services/internal.property.service";
import {ActivatedRoute, Router} from "@angular/router";
import {GuestServiceIntern} from "../guest.service";
import {UtilsService} from "../../../core/services/utils.service";
import {TranslateService} from '@ngx-translate/core';
import {GuestMenuMobileComponent} from "../guest-menu-mobile/guest-menu-mobile.component";

@Component({
  selector: 'app-guest-usefulnumber-full-list-desktop',
  templateUrl: './guest-usefulnumber-full-list-desktop.component.html',
  styleUrls: ['../guest-usefulnumber/guest-usefulnumber.component.scss',
    '../guest-usefulnumber/desktop-guest-usefulnumber/desktop-guest-usefulnumber.component.scss',
    './guest-usefulnumber-full-list-desktop.component.scss']
})
export class GuestUsefulnumberFullListDesktopComponent extends GuestUsefulnumberComponent {

  constructor(public guestService: GuestService,
              public  propertyService: InternalPropertyService,
              public route: ActivatedRoute,
              public router: Router,
              public guestServiceIntern: GuestServiceIntern,
              public translateService: TranslateService,
              public utilService: UtilsService) {
    super(guestService, propertyService, route, router, guestServiceIntern, translateService, utilService);
  }



}
