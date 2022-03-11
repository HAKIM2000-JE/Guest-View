import {Component, Input, OnInit} from '@angular/core';
import {GuestUsefulnumberComponent} from '../guest-usefulnumber.component';
import {PropertyForGuest} from '../../../../models/guestview/PropertyForGuest';
import {GuestService} from '../../../../core/services/guest.service';
import {InternalPropertyService} from '../../../../core/services/internal.property.service';
import {ActivatedRoute, Router} from '@angular/router';
import {GuestServiceIntern} from '../../guest.service';
import {UtilsService} from '../../../../core/services/utils.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-desktop-guest-usefulnumber',
  templateUrl: './desktop-guest-usefulnumber.component.html',
  styleUrls: ['../guest-usefulnumber.component.scss', './desktop-guest-usefulnumber.component.scss']
})
export class DesktopGuestUsefulnumberComponent extends GuestUsefulnumberComponent {
  @Input()
  property: PropertyForGuest;

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
