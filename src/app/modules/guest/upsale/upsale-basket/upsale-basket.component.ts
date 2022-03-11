import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {IntercomService} from "../../../../core/services/IntercomService";
import {SharedSnackbarService} from "../../../../shared/components/shared-snackbar/services/shared-snackbar.service";
import {TranslateService} from "@ngx-translate/core";
import {ApiService} from "../../../../core/http/api.service";
import {UtilsService} from "../../../../core/services/utils.service";
import {LanguageManagementService} from "../../../../core/services/language.service";
import {GuestService} from "../../../../core/services/guest.service";
import {AbstractWindow} from "../../../../core/abstract/AbstractWindow";
import {PropertyForGuest} from "../../../../models/guestview/PropertyForGuest";
import {takeUntil} from "rxjs/operators";
import {GuestOrder} from "../../../../models/guestview/upsale/GuestOrder";
import {Amount} from "../../../../models/guestview/Amount";

@Component({
  selector: 'app-upsale-basket',
  templateUrl: './upsale-basket.component.html',
  styleUrls: ['./upsale-basket.component.scss']
})
export class UpsaleBasketComponent extends AbstractWindow implements OnInit {

  bookingId: string;
  property: PropertyForGuest;
  currentGuestOrder: GuestOrder = new GuestOrder();

  constructor(private router: Router,
              private route: ActivatedRoute,
              public intercomService: IntercomService,
              private snackbar: SharedSnackbarService,
              private translate: TranslateService,
              private apiService: ApiService,
              public utilService: UtilsService,
              private languageService: LanguageManagementService,
              private guestService: GuestService) {
    super(intercomService, utilService);
  }

  ngOnInit() {
    this.route.paramMap.subscribe( ParamMap => {
      this.bookingId = ParamMap.get('bookingId');
      this.apiService.getUpsales(this.bookingId,this.translate.currentLang).subscribe( upsales => {

      });
      this.guestService.getPropertyAndBookingForGuest( this.bookingId , this.languageService.getLanguageInUrl()).pipe(takeUntil(this.onDestroy)).subscribe( res => {
        this.property = res.property;
      });
    });

    this.currentGuestOrder = JSON.parse(localStorage.getItem("basket"));
  }

  openSelector() {
    this.router.navigate(['/guest/' + this.bookingId  + '/upsaleselector']).then();
  }
  resetBasket() {
    this.currentGuestOrder = new GuestOrder();
    this.currentGuestOrder.orderTotalAmount = new Amount();
    this.currentGuestOrder.orderTotalAmount.amount = 0;
    this.currentGuestOrder.orderTotalAmount.currency = "EUR";
    localStorage.setItem("basket", JSON.stringify(this.currentGuestOrder));
  }
  confirmBasket() {
    console.log("call saveGuestOrder");
    this.apiService.saveGuestOrder(this.bookingId, this.currentGuestOrder).subscribe( guestOrder => {
      console.log("return saveGuestOrder", guestOrder);
      if (guestOrder != null) {
        this.currentGuestOrder = guestOrder;
        localStorage.setItem("basket", JSON.stringify(this.currentGuestOrder));
        this.apiService.getCheckoutUrl(guestOrder.id).subscribe( returnUrl => {
          console.log("returnUrl", returnUrl);
          window.open(returnUrl.url);
        });
      }
    });
  }
}
