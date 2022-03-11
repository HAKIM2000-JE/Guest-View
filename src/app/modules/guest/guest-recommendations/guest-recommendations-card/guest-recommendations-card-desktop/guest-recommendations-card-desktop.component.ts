import { Component, OnInit } from '@angular/core';
import {GuestRecommendationsCardComponent} from '../guest-recommendations-card.component';
import {UtilsService} from '../../../../../core/services/utils.service';
import {GuestService} from '../../../../../core/services/guest.service';
import {LanguageManagementService} from "../../../../../core/services/language.service";
import { CollectDataServiceService } from 'src/app/core/services/collect-data-service.service';


@Component({
  selector: 'app-guest-recommendations-card-desktop',
  templateUrl: './guest-recommendations-card-desktop.component.html',
  styleUrls: ['./guest-recommendations-card-desktop.component.scss']
})
export class GuestRecommendationsCardDesktopComponent extends GuestRecommendationsCardComponent {

  constructor(
    public utils: UtilsService,
    public guestService: GuestService,
    public langSrv: LanguageManagementService ,
    public CollectData :CollectDataServiceService
  ) { super(utils, guestService, langSrv ,CollectData); }




}
