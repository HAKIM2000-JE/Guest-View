import {Component, NgZone, OnInit} from '@angular/core';
import {GuestService} from '../../../../../core/services/guest.service';
import {GuestRecommendationsViewComponent} from '../guest-recommendations-view.component';
import {UtilsService} from '../../../../../core/services/utils.service';
import {TranslateService} from '@ngx-translate/core';
import {LanguageManagementService} from '../../../../../core/services/language.service';
import { CollectDataServiceService } from 'src/app/core/services/collect-data-service.service';

@Component({
  selector: 'app-guest-recommendations-view-mobile',
  templateUrl: './guest-recommendations-view-mobile.component.html',
  styleUrls: ['./guest-recommendations-view-mobile.component.scss']
})
export class GuestRecommendationsViewMobileComponent extends GuestRecommendationsViewComponent {

  constructor(
    public utilsService: UtilsService,
    public guestService: GuestService,
    public translateService: TranslateService,
    public zone: NgZone,
    public languageService: LanguageManagementService ,
    public CollectData :CollectDataServiceService
  ) { super(utilsService, guestService, translateService, zone, languageService ,CollectData); }

}
