import {Component, NgZone, OnInit, Renderer2} from '@angular/core';
import {UtilsService} from '../../../../../core/services/utils.service';
import {GuestRecommendationsMapComponent} from '../guest-recommendations-map.component';
import {Router} from '@angular/router';
import {GuestService} from '../../../../../core/services/guest.service';
import {TranslateService} from '@ngx-translate/core';
import {LanguageManagementService} from "../../../../../core/services/language.service";
import {GoogleAnalyticsService} from "ngx-google-analytics";
import { CollectDataServiceService } from 'src/app/core/services/collect-data-service.service';

@Component({
  selector: 'app-guest-recommendations-map-mobile',
  templateUrl: './guest-recommendations-map-mobile.component.html',
  styleUrls: ['./guest-recommendations-map-mobile.component.scss']
})
export class GuestRecommendationsMapMobileComponent extends GuestRecommendationsMapComponent implements OnInit {

  filterType: 'categories' | 'types' = 'categories';
  constructor(
    public utilsService: UtilsService,
    public zone: NgZone,
    public renderer: Renderer2,
    public router: Router,
    public guestSerivce: GuestService,
    public translateService: TranslateService,
    public languageService: LanguageManagementService,
    public gaSrv: GoogleAnalyticsService ,
    public CollectData :CollectDataServiceService
  ) { super(utilsService, zone, renderer, router, guestSerivce, translateService, languageService, gaSrv ,CollectData); }

  ngOnInit() {
    super.ngOnInit();
    super.initialize();

    this.getTags();
  }
}
