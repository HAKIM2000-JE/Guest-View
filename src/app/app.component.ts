import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { IconService } from './core/services/icon.service';
import { LanguageManagementService } from './core/services/language.service';
import {LoaderService} from "./core/services/LoaderService";
import {SecurityService} from "./core/services/SecurityService";
import {UtilsService} from "./core/services/utils.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  screenWidth: number;
  constructor( private translate: TranslateService,
               private iconService: IconService,
               private router: Router,
               private securityService: SecurityService,
               private languageService: LanguageManagementService,
               private gaSrv: GoogleAnalyticsService,
               private loaderService: LoaderService) {

    this.securityService.removeSecurtityPassword();

    let browserLang = translate.getBrowserLang();
    browserLang = UtilsService.isLanguageSupported(browserLang);
    this.languageService.setLanguageInUrl(browserLang);
    this.translate.use(browserLang);

    /*if (UtilsService.languageArray.includes(browserLang)) {
      this.languageService.setLanguageInUrl(browserLang);
      this.translate.use(browserLang);
    } else {
      this.languageService.setLanguageInUrl('fr');
      this.translate.use('fr');
    }*/

    this.iconService.registerIcons();
    this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.gaSrv.pageView(event.urlAfterRedirects);
        }
      }
    );
  }

  ngOnInit(): void {
    this.loaderService.dismissLoader();
  }

  onActivate(e) {
    if (document.getElementById('scrollable-container')) {
      document.getElementById('scrollable-container').scrollTo(0, 0);
    }
    // this.titleService.setTitle(this.translate.instant('guest-top-page.title'));
  }

}
