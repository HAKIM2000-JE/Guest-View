import {Component, OnInit} from '@angular/core';
import {Corporate} from "../../../models/guestview/Corporate";
import {InternalPropertyService} from "../../../core/services/internal.property.service";
import {CheckPassword} from "../../../models/guestview/CheckPassword";
import {ApiService} from "../../../core/http/api.service";
import {SecurityService} from "../../../core/services/SecurityService";
import {ActivatedRoute, Router} from "@angular/router";
import {takeUntil} from "rxjs/operators";
import {GuestService} from "../../../core/services/guest.service";
import {TranslateService} from "@ngx-translate/core";
import {AbstractWindow} from "../../../core/abstract/AbstractWindow";
import {IntercomService} from "../../../core/services/IntercomService";
import {UtilsService} from "../../../core/services/utils.service";
import {LoaderService} from "../../../core/services/LoaderService";

@Component({
  selector: 'app-ask-for-password',
  templateUrl: './ask-for-password.component.html',
  styleUrls: ['./ask-for-password.component.scss']
})
export class AskForPasswordComponent extends AbstractWindow implements OnInit {

  localCorporate: Corporate = null;
  localPropertyId: string = null;
  password: string = '';
  bookingId: string;
  errorMsg: string = '';

  constructor(private propertyService: InternalPropertyService,
              private  apiService: ApiService,
              private securityService: SecurityService,
              private translateService: TranslateService,
              private loaderService: LoaderService,
              private router: Router,
              public route: ActivatedRoute,
              private guestService: GuestService,
              public intercomService: IntercomService,
              public utilsService: UtilsService,
              private activatedRoute: ActivatedRoute
  ) {
    super(intercomService, utilsService);
  }

  ngOnInit() {
    this.securityService.removeSecurtityPassword();
    this.route.paramMap.subscribe( ParamMap => {
      this.bookingId = ParamMap.get('bookingId');
      console.log('BookingId', this.bookingId);
      this.guestService.getPropertyAndBookingForGuest(this.bookingId, this.translateService.currentLang)
        .pipe(takeUntil(this.onDestroy))
        .subscribe(res => {
          this.localCorporate = res.corporate;
          this.localPropertyId = res.property.id;
          // CUSTOMISATION DES COULEURS
          this.utilsService.manageCorporateColors(this.localCorporate);
        });
    });
  }

  setPassword() {
    this.loaderService.showFullLoader('');
    this.errorMsg = '';
    const checkPassword: CheckPassword = new CheckPassword();
    checkPassword.code = this.password;
    checkPassword.corporateId = this.localCorporate.id;
    checkPassword.propertyId = this.localPropertyId;
    this.apiService.getCheckPassword(checkPassword).subscribe( res => {
      this.loaderService.dismissLoader();
      // console.log('return from password', res);
      this.securityService.setSecurityPassword();
      if (res != null) {
        return this.router.navigate(['/guest/' + res.id]);
      } else {
        return this.router.navigate(['/guest/' + this.localPropertyId]);
      }
    }, err => {
      this.loaderService.dismissLoader();
      this.securityService.removeSecurtityPassword();
      this.errorMsg = this.translateService.instant('password.wrong-password');
      console.log("error from checkPassword");
    });
  }

}
