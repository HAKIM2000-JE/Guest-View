import { Component, OnInit } from '@angular/core';
import {UtilsService} from '../../../../../core/services/utils.service';
import {GuestService} from '../../../../../core/services/guest.service';
import {GuestRecommendationsCardComponent} from '../guest-recommendations-card.component';
import {LanguageManagementService} from '../../../../../core/services/language.service';
import { CollectDataServiceService } from 'src/app/core/services/collect-data-service.service';

@Component({
  selector: 'app-guest-recommendations-card-mobile',
  templateUrl: './guest-recommendations-card-mobile.component.html',
  styleUrls: ['./guest-recommendations-card-mobile.component.scss']
})
export class GuestRecommendationsCardMobileComponent extends GuestRecommendationsCardComponent{

  constructor(
    public utils: UtilsService,
    public guestService: GuestService,
    public langSrv: LanguageManagementService ,
    public CollectData :CollectDataServiceService
  ) { super(utils, guestService, langSrv , CollectData); }

}
