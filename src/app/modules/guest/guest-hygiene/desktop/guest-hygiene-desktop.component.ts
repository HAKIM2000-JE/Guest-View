import {Component, Input, OnInit} from '@angular/core';
import {GuestHygieneComponent} from '../guest-hygiene.component';
import {GuestService} from '../../../../core/services/guest.service';
import {UtilsService} from '../../../../core/services/utils.service';
import {InternalPropertyService} from '../../../../core/services/internal.property.service';
import {TranslateService} from '@ngx-translate/core';
import {IntercomService} from '../../../../core/services/IntercomService';
import {LanguageManagementService} from "../../../../core/services/language.service";

@Component({
  selector: 'app-guest-hygiene-desktop',
  templateUrl: './guest-hygiene-desktop.component.html',
  styleUrls: ['./guest-hygiene-desktop.component.scss']
})
export class GuestHygieneDesktopComponent extends GuestHygieneComponent {

  @Input() property;

  constructor(public guestService: GuestService,
              public utilService: UtilsService,
              public translateService: TranslateService,
              public internPropertyServices: InternalPropertyService,
              public intercomService: IntercomService,
              public languageService: LanguageManagementService
  ) {
    super(guestService, utilService, translateService, internPropertyServices, intercomService, languageService);
  }
}
